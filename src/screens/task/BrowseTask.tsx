import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native'
import { useAppSelector } from '../../store/store';
import { NavigationProp } from '@react-navigation/native';
import { useAppDispatch } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { timeAgo } from '../../utils/helper';
import { fetchTasks } from '../../store/slices/taskSlice';
import JobCard from './ JobCard';
import { formatCurrency } from '../../utils/helper';
import { Screen } from '../../utils/type';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/color';
import { TouchableOpacity } from 'react-native';

import Loader from '../../components/Loader';
import { FlatList } from 'react-native';
import { logout } from '../../store/slices/authSlice';
import { TextInput } from 'react-native';
import styles from './job';
import Header from '../layout/Header';

const BrowseTask = () => {
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
        onViewBids={() => navigation.navigate('TaskDetails', { task: item })}
        viewButtonText="View Task Details"
      />
    );
  
    return (
      // <SafeAreaProvider>
        <SafeAreaView style={{ backgroundColor: Colors.CARD_BACKGROUND }}>
          <Header title="My Tasks" />
  
          <View style={styles.filterRow}>
           
  
            <View style={styles.searchContainer}>
              <TextInput
                value={searchTerm}
                onChangeText={setSearchTerm}
                placeholder="Search..."
                autoFocus={false}
              />
            </View>
  
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('PostTask');
              }}
              style={styles.newRequestBtn}
            >
              <Text style={styles.newRequestText}>Post Task</Text>
            </TouchableOpacity> */}
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

export default BrowseTask