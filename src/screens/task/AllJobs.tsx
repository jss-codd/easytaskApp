import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Modal,
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

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('newest');

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const { tasks, loading, error } = useAppSelector(state => state.taskReducer);
  const { user } = useAppSelector((state: any) => state.authReducer);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTasks({ search: debouncedSearchTerm }));
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
      console.log('response', response);
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
      viewButtonText="View Bids"
      selectedCategories={item?.selectedCategories}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <StatusBar backgroundColor={Colors.MAIN_COLOR} barStyle="dark-content" />
        <Header
          title={user?.role === UserRole.Tasker ? 'Browse Tasks' : 'My Tasks'}
        />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setFilterModalVisible(true)}>
            <MenuIcon size={22} color={Colors.GREY} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search..."
              autoFocus={false}
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PostTask');
            }}
            style={styles.newRequestBtn}
          >
            <Text style={styles.newRequestText}>Post Task</Text>
          </TouchableOpacity>
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
              <Text>No Tasks Found</Text>
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
        <Modal
          visible={filterModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setFilterModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sort by Status</Text>
              {[
                { key: 'newest', value: 'newest' },
                { key: 'oldest', value: 'oldest' },
              ].map(option => (
                <TouchableOpacity
                  key={option.key}
                  style={[
                    styles.modalOption,
                    selectedStatus === option.key && styles.modalOptionSelected,
                  ]}
                  onPress={() => setSelectedStatus(option.value)}
                >
                  <Text
                    style={
                      selectedStatus === option.value
                        ? styles.modalOptionTextSelected
                        : styles.modalOptionText
                    }
                  >
                    {option.key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AllJobs;
