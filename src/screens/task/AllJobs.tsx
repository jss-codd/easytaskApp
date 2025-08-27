import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../constants/color';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { logout } from '../../store/slices/authSlice';
import { Screen } from '../../utils/type';
import JobCard from './ JobCard';
import { fetchTasks } from '../../store/slices/taskSlice';
import { formatCurrency, timeAgo } from '../../utils/helper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../components/Loader';
import Header from '../layout/Header';
import styles from './job';

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const { tasks, loading, error } = useAppSelector(state => state.taskReducer);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTasks({ status: 'all', search: '' }));
    }, [dispatch]),
  );

  useEffect(() => {
    dispatch(fetchTasks({ status: 'all', search: '' }));
  }, [dispatch]);

  const renderItem = ({ item }: any) => (
    <JobCard
      title={item?.title}
      description={item?.description?.replace(/<[^>]+>/g, '')}
      budget={formatCurrency(item?.estimateBudget)}
      postedTime={timeAgo(item?.createdAt)}
      paymentVerified={true}
      location={{
        street: item?.location?.street || '',
        city: item?.location?.city || '',
        state: item?.location?.state || '',
        country: item?.location?.country || '',
      }}
      onViewBids={() => navigation.navigate(Screen.BidDetails, { task: item })}
      viewButtonText="View Bids"
    />
  );

  return (
    // <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: Colors.CARD_BACKGROUND }}>
        <Header title="My Tasks" />

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              dispatch(logout());
            }}
          >
            <Text>
              Logout
              {/* <LogoutIcon size={20} color={Colors.GREY} />{' '} */}
            </Text>
          </TouchableOpacity>

          <View style={styles.searchContainer}>
            <TextInput
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
            <Loader fullScreen={true} color={Colors.MAIN_COLOR} />
          ) : tasks?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text>No Tasks Found</Text>
            </View>
          )
           : error !== null ? (
            <View style={styles.emptyContainer}>
              <Text>{error}</Text>
            </View>
          ) 
          : (
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
    // </SafeAreaProvider>
  );
};

export default AllJobs;
