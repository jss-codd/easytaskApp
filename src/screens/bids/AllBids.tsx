import React, { useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../layout/Header';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { formatCurrency } from '../../utils/helper';
import styles from './bids';
import { fetchmyBids } from '../../store/slices/myBidSlice';
import Loader from '../../components/Loader';
import Colors from '../../constants/color';
import { Bid } from '../../utils/type';

const AllBids = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.authReducer);
  const { myBids, loading, error } = useAppSelector(
    state => state.myBidReducer,
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchmyBids(user.id));
    }
  }, [user.id]);

  const renderItem = ({ item }: { item: Bid }) => (
    <View style={styles.card}>
      <View style={styles.userRow}>
        {/* {item.user.profile.avatar ? ( */}
          <Image
            source={{ uri: `https://ui-avatars.com/api/?name=${item.user.name}&background=random` }}
            style={styles.avatar}
          />
    
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userEmail}>{item.user.email}</Text>
        </View>
      </View>

      {/* Task Title */}
      <Text style={styles.taskTitle}>Task : {item.task.title}</Text>
      <Text style={styles.taskDate}>
        Applied on : {new Date(item.task.createdAt).toDateString()}
      </Text>

      {/* Transcript / Comment */}
      {/* <Text style={styles.sectionTitle}>Transcript</Text> */}
      <Text style={styles.comment}>
        Status:{item.status || 'No transcript provided'}
      </Text>

      {/* Quoted Price & Completion */}
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          Quoted Price: {formatCurrency(item.offeredPrice)}
        </Text>
        <Text style={styles.footerText}>
          Expected Completion: {item.offeredEstimatedTime}h
        </Text>
      </View>
      <View style={styles.footerRow}>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => console.log('View Task Details')}
        >
          <Text style={styles.footerBtnText}>Hire now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => console.log('View Task Details')}
        >
          <Text style={styles.footerBtnText}>Chat with trade </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Header title="My Bids" showBack={true} />
      <View style={{ flex: 1, padding: 10, backgroundColor: '#f9f9f9' }}>
        {loading ? (
          <Loader fullScreen={true} color={Colors.MAIN_COLOR} />
        ) : myBids?.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No Bids Found</Text>
          </View>
        ) : error !== null ? (
          <View style={styles.emptyContainer}>
            <Text>{error}</Text>
          </View>
        ) : (
          <FlatList
            data={myBids}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

export default AllBids;
