import React, { useCallback, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../layout/Header';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { formatCurrency } from '../../utils/helper';
import styles from './bids';
import { fetchmyBids } from '../../store/slices/myBidSlice';
import Loader from '../../components/Loader';
import Colors from '../../constants/color';
import { Bid } from '../../utils/type';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createChat } from '../../service/apiService';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AllBids = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { user } = useAppSelector(state => state.authReducer);
  const { myBids, loading, error } = useAppSelector(
    state => state.myBidReducer,
  );
  console.log('myBids', myBids);

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        dispatch(fetchmyBids(user.id));
      }
    }, [dispatch, user.id]),
  );

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchmyBids(user.id));
    }
  }, [user.id]);

  const handleHirePress = async (item: any) => {
    console.log(item);
    const payload = {
      bidId: item.id,
      taskId: item.taskId,
      taskerId: item.userId,
      posterId: item.clientId,
    };
    console.log(payload);
    try {
      const response = await createChat({
        bidId: item.id,
        taskId: item.taskId,
        taskerId: item.userId,
        posterId: item.clientId,
      });
      console.log('chatId', response);
      const chatId = response.id;
      console.log('chatId', chatId);
      navigation.navigate('Chat', {
        userId: item.userId,
        userName: 'Poster Name',
        chatId: chatId,
      });
    } catch (error) {
      console.log(error);
      console.error('Error creating chat:', error);
    }
  };

  const renderItem = ({ item }: { item: Bid }) => (
    <View style={styles.card}>
      <View style={styles.userRow}>

        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${item.user.name}&background=random`,
          }}
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

      <Text style={styles.comment}>
        Status:{item.status || 'No transcript provided'}
      </Text>

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
          onPress={() => handleHirePress(item)}
        >
          <Text style={styles.footerBtnText}>Hire now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.footerButton}
          onPress={() => navigation.navigate('Chat', {
            userId: item.userId,
            userName: item.user.name,
            chatId: item.id,
          })}
        >
          <Text style={styles.footerBtnText}>Chat with trade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <Header title="My Bids" />
        <View style={{ flex: 1, padding: 10, backgroundColor: Colors.BACKGROUND }}>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AllBids;
