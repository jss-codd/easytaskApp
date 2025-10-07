import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native';
import { useAppSelector } from '../../store/store';
import { NavigationProp } from '@react-navigation/native';
import { useAppDispatch } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { timeAgo } from '../../utils/helper';
import { fetchBrowseTasks } from '../../store/slices/taskSlice';
import JobCard from './ JobCard';
import { formatCurrency } from '../../utils/helper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/color';
import { FlatList } from 'react-native';
import styles from './job';
import Header from '../layout/Header';
import TabButton from '../../components/TabButton';
import SearchInput from '../../components/SearchInput';
import { saveTasks, unsaveTasks } from '../../service/apiService';
import MenuIcon from '../../Icons/MenuIcon';
import { Toast } from '../../components/CommonToast';
import { useFilterDrawer } from '../../hooks/useFilterDrawer';
import FilterDrawer from '../../components/FilterDrawer';
import { useTranslation } from 'react-i18next';

const BrowseTask = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>({});

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
    // Apply filters to the browse task fetch
    dispatch(fetchBrowseTasks({
      search: debouncedSearchTerm,
      categories: filters.categories ? filters.categories.join(',') : '',
      fixedPrice: filters.fixedPrice || '',
      sortByTime: filters.sortByTime || ''
    }));
  }, [dispatch, debouncedSearchTerm]);

  const handleResetFilters = useCallback(() => {

    setAppliedFilters({});
    dispatch(fetchBrowseTasks({ search: debouncedSearchTerm }));
  }, [dispatch, debouncedSearchTerm]);

  const {
    isVisible,
    openDrawer,
    closeDrawer,
    handleApply,
    handleReset,
    activeFilterCount,
  } = useFilterDrawer({
    sections: filterSections,
    onApply: handleApplyFilters,
    onReset: handleResetFilters,
  });

  const { loading, error, browseTasks } = useAppSelector(
    state => state.taskReducer,
  );
  const { user } = useAppSelector((state: any) => state.authReducer);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchBrowseTasks({ search: debouncedSearchTerm, userId: user?.id }));
    }, [debouncedSearchTerm, user?.id, isSaved]),
  );

  useEffect(() => {
    dispatch(fetchBrowseTasks({ search: debouncedSearchTerm, userId: user?.id }));
  }, [debouncedSearchTerm, user?.id, isSaved]);

  const handleSave = async (id: string) => {
    if (isSaved) {
      const response = await unsaveTasks(id);
      Toast.show({
        type: 'success',
        text1: 'Task unsaved successfully',
      });
      setIsSaved(false);
    } else {
      await saveTasks(id);
      Toast.show({
        type: 'success',
        text1: 'Task saved successfully',
      });
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
      bidCount={item?._count?.bids}
      location={{
        city: item?.location?.city || '',
        state: item?.location?.state || '',
      }}
      owner={item?.owner}
      onViewBids={() => navigation.navigate('TaskDetails', { task: item })}
      onSave={() => handleSave(item?.id)}
      viewButtonText="View Task Details"
      selectedCategories={item?.selectedCategories}
      isSaved={item?.isBookmarked}
      role={user?.role}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={Colors.MAIN_COLOR} barStyle="dark-content" />
        <Header title={t('navigation.browseTasks')} />
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={openDrawer}
          >
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
        <TabButton
          options={['My Feed', 'All']}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
        <View style={styles.container}>
          {loading ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <ActivityIndicator size="large" color={Colors.MAIN_COLOR} />
            </View>
          ) : browseTasks?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text>No Tasks Found</Text>
            </View>
          ) : error !== null ? (
            <View style={styles.emptyContainer}>
              <Text>{error}</Text>
            </View>
          ) : (
            <FlatList
              data={browseTasks}
              keyExtractor={(item: any) => item?.id?.toString() || ''}
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

export default BrowseTask;
