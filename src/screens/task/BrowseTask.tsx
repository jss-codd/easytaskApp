import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Pressable,
  View,
  StatusBar,
} from 'react-native';
import { Text } from 'react-native';
import { useAppSelector } from '../../store/store';
import { NavigationProp } from '@react-navigation/native';
import { useAppDispatch } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { timeAgo } from '../../utils/helper';
import { fetchBrowseTasks, fetchTasks } from '../../store/slices/taskSlice';
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

const BrowseTask = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('newest');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const { loading, error, browseTasks } = useAppSelector(
    state => state.taskReducer,
  );
  const { user } = useAppSelector((state: any) => state.authReducer);
  // console.log(browseTasks)

  const handleSave = async (id: string) => {

    if (isSaved) {
      const response = await unsaveTasks(id);
      console.log('response', response);
      Toast.show({
        type: 'success',
        text1: 'Task unsaved successfully',
      });
      setIsSaved(false);
      dispatch(fetchBrowseTasks({ search: debouncedSearchTerm, userId: user?.id }));
    } else {
      await saveTasks(id);
      Toast.show({
        type: 'success',
        text1: 'Task saved successfully',
      });
      setIsSaved(true);
      dispatch(fetchBrowseTasks({ search: debouncedSearchTerm, userId: user?.id }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchBrowseTasks({ search: debouncedSearchTerm, userId: user?.id }));
    }, [debouncedSearchTerm, user?.id]),
  );

  useEffect(() => {
    dispatch(fetchBrowseTasks({ search: debouncedSearchTerm, userId: user?.id }));
  }, [debouncedSearchTerm, user?.id]);

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
        <Header title="Browse Tasks" />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setFilterModalVisible(true)}
          >
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

export default BrowseTask;
