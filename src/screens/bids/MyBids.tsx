import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import { getTaskerBids } from '../../service/apiService';
import { useAppSelector } from '../../store/store';
import Header from '../layout/Header';
import Loader from '../../components/Loader';
import Colors from '../../constants/color';
import styles from './bids';
import { formatCurrency } from '../../utils/helper';

const MyBids = () => {
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state: any) => state.authReducer);
  console.log('bids >>> ', bids);
  const fetchMyBids = async () => {
    try {
      setLoading(true);
      const response = await getTaskerBids(user?.id);
      console.log('response', response.data);
      setBids(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyBids();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.userRow}>
        {/* {item.user.profile.avatar ? ( */}

        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{item.task.title}</Text>
          <Text style={styles.userEmail}>{item.task.description}</Text>
        </View>
        <Text style={styles.taskDate}>
          Applied on : {new Date(item.task.createdAt).toDateString()}
        </Text>
      </View>

      {/* Task Title */}

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
          <Text style={styles.footerBtnText}>Edit</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
        style={styles.footerButton}
        onPress={() => console.log('View Task Details')}
      >
        <Text style={styles.footerBtnText}>Chat with trade </Text>
      </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <>
      <Header title="My Bids" showBack={true} />
      <View style={{ flex: 1, padding: 10, backgroundColor: '#f9f9f9' }}>
        {loading ? (
          <Loader fullScreen={true} color={Colors.MAIN_COLOR} />
        ) : bids?.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text>No Bids Found</Text>
          </View>
        ) : (
          <FlatList
            data={bids}
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

export default MyBids;
