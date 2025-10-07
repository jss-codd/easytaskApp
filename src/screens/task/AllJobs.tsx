import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import Colors from '../../constants/color';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { Screen } from '../../utils/type';
import JobCard from './ JobCard';
import { fetchTasks } from '../../store/slices/taskSlice';
import { formatCurrency, timeAgo } from '../../utils/helper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../layout/Header';
import styles from './job';
import { UserRole } from '../../utils/enums';
import SearchInput from '../../components/SearchInput';
import { saveTasks, unsaveTasks } from '../../service/apiService';
import MenuIcon from '../../Icons/MenuIcon';
import { useFilterDrawer } from '../../hooks/useFilterDrawer';
import FilterDrawer from '../../components/FilterDrawer';
import { useTranslation } from 'react-i18next';

const AllJobs = () => {
  const { t } = useTranslation();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();

  const filterSections = [
    {
      id: 'priceRange',
      title: t('filters.sortByPrice'),
      type: 'single' as const,
      options: [
        { id: '1', label: t('filters.lessThan100'), value: 'lt-100' },
        { id: '2', label: t('filters.hundredTo500'), value: '100-500' },
        { id: '3', label: t('filters.fiveHundredTo1k'), value: '500-1000' },
        { id: '4', label: t('filters.oneKTo5k'), value: '1000-5000' },
      ],
    },
    {
      id: 'sortByTime ',
      title: t('filters.sortByTime'),
      type: 'single' as const,
      options: [
        { id: '1', label: t('filters.newest'), value: 'newest-first' },
        { id: '2', label: t('filters.1dayAgo'), value: '1day' },
        { id: '3', label: t('filters.2daysAgo'), value: '2days' },
        // { id: '4', label: t('filters.oneKTo5k'), value: '1000-5000' },
      ],
    },
  ];

  const handleApplyFilters = useCallback((filters: Record<string, any>) => {
    setAppliedFilters(filters);

    dispatch(fetchTasks({
      search: debouncedSearchTerm,
      categories: filters.categories ? filters.categories.join(',') : '',
      fixedPrice: filters.fixedPrice || '',
      sortByTime: filters.sortByTime || ''
    }));
  }, [dispatch, debouncedSearchTerm]);

  const handleResetFilters = useCallback(() => {
    setAppliedFilters({});
    dispatch(fetchTasks({ search: debouncedSearchTerm, sortByTime: '' }));
  }, [dispatch, debouncedSearchTerm]);

  const {
    isVisible,
    openDrawer,
    closeDrawer,
    handleApply,
    handleReset,
  } = useFilterDrawer({
    sections: filterSections,
    onApply: handleApplyFilters,
    onReset: handleResetFilters,
  });
  const { tasks, loading, error } = useAppSelector(state => state.taskReducer);
  const { user } = useAppSelector((state: any) => state.authReducer);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTasks({ search: debouncedSearchTerm, sortByTime: '' }));
    }, [dispatch, debouncedSearchTerm]),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchTasks({ search: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);


  const handleSave = async (id: string) => {
    if (isSaved) {
      const response = await unsaveTasks(id);
      dispatch(fetchTasks({ search: debouncedSearchTerm }));
      setIsSaved(false);
    } else {
      await saveTasks(id);
      setIsSaved(true);
    }
  };

  const renderItem = ({ item }: any) => (
    <JobCard
      title={item?.title}
      description={item?.description?.replace(/<[^>]+>/g, '')}
      budget={formatCurrency(item?.estimateBudget)}
      postedTime={timeAgo(item?.createdAt)}
      paymentVerified={true}
      isSaved={item?.isBookmarked}
      role={user?.role}
      location={{
        street: item?.location?.street || '',
        city: item?.location?.city || '',
        state: item?.location?.state || '',
        country: item?.location?.country || '',
      }}
      onSave={() => handleSave(item?.id)}
      bidCount={item?._count?.bids}
      owner={item?.owner}
      onViewBids={() => navigation.navigate(Screen.BidDetails, { task: item })}
      viewButtonText={t('task.viewBids')}
      selectedCategories={item?.selectedCategories}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <StatusBar backgroundColor={Colors.MAIN_COLOR} barStyle="dark-content" />
        <Header
          title={user?.role === UserRole.Tasker ? t('navigation.browseTasks') : t('navigation.myTasks')}
        />
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={openDrawer}>
            <MenuIcon size={22} color={Colors.GREY} />
          </TouchableOpacity>
          <FilterDrawer
            visible={isVisible}
            onClose={closeDrawer}
            onApply={handleApply}
            onReset={handleReset}
            sections={filterSections}
            title={t('filters.title')}
            showReset={false}
            showApply={false}
          />
          <View style={styles.searchContainer}>
            <SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder={t('filters.search')}
              autoFocus={false}
            />
          </View>
        </View>

        <View style={styles.container}>
          {loading ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <ActivityIndicator size="large" color={Colors.MAIN_COLOR} />
            </View>
          ) : tasks?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text>{t('task.noTasksFound')}</Text>
            </View>
          ) : error !== null ? (
            <View style={styles.emptyContainer}>
              <Text>{error}</Text>
            </View>
          ) : (
            <FlatList
              data={tasks}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AllJobs;
