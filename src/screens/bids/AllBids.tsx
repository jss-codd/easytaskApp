import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Header from '../layout/Header';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { formatCurrency, getContractButton, } from '../../utils/helper';
import styles from './bids';
import { fetchmyBids } from '../../store/slices/myBidSlice';
import Loader from '../../components/Loader';
import Colors from '../../constants/color';
import { AxiosErrorMessage, Bid } from '../../utils/type';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { closeJob, createChat, createDispute, releasePayment, withdrawContract, writeReview } from '../../service/apiService';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ContractStatus, PaymentStatus, UserRole } from '../../utils/enums';
import { Toast } from '../../components/CommonToast';
import ConfirmationModal from '../../components/ConfirmationModal';
import { useTranslation } from 'react-i18next';
import metrics from '../../constants/metrics';
import { CustomModal } from '../../components/CustomModal';
import { Rating } from '../../components/CustomComponents';
import { Rate } from '../../components/Rate';

const AllBids = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [payReleased, setPayReleased] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    message: "",
    onConfirm: () => { },
  });
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [item, setItem] = useState<any>(null);
  const { user } = useAppSelector(state => state.authReducer);
  const { myBids, loading, error } = useAppSelector(
    state => state.myBidReducer,
  );

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

  const handleCreateChat = async (item: any) => {
    const payload = {
      bidId: item.id,
      taskId: item.taskId,
      taskerId: item.userId,
      posterId: item.clientId,
    };
    try {
      const response = await createChat(payload);
      const chatId = response.id;
      navigation.navigate('Chat', {
        userId: item.userId,
        userName: 'Poster Name',
        chatId: chatId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateContract = async (item: any) => {
    navigation.navigate('CreateContract', {
      bid: item,
    });
  };

  const handleWithdraw = async (item: any) => {
    setShowConfirm(true);
    setConfirmConfig({
      message: 'Are you sure you want to withdraw this contract?',
      onConfirm: () => handleWithdrawApi(item.contractDetails.id),
    });
  };

  const handleCloseJob = async (item: any) => {
    setShowConfirm(true);
    setConfirmConfig({
      message: 'Are you sure you want to close this contract?',
      onConfirm: () => handleCloseJobApi(item.taskId),
    });
  }

  const handleCloseJobApi = async (item: any) => {
    try {
      const response = await closeJob(item);
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Contract closed successfully',
        });
        setShowConfirm(false);
        dispatch(fetchmyBids(user.id));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
  };

  const handleWithdrawApi = async (item: any) => {
    try {
      const response = await withdrawContract(item);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Contract withdrawn successfully',
        });
        setShowConfirm(false);
        dispatch(fetchmyBids(user.id));
      }
    } catch (error) {

      Toast.show({
        type: 'error',
        text1: 'Error withdrawing contract',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
  };

  const handleReleasePayment = async (item: any) => {
    try {
      const response = await releasePayment(item.taskId);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Payment released successfully',
        });
        setPayReleased(true);
        dispatch(fetchmyBids(user.id));
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error releasing payment',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
  };

  const handleCreateDispute = async (item: any) => {
    setShowConfirm(true);
    setConfirmConfig({
      message: 'Are you sure you want to create a dispute?',
      onConfirm: () => handleCreateDisputeApi(item),
    });
  };

  const handleCreateDisputeApi = async (item: any) => {
    const payload = {
      contractId: item.contractDetails.id,
      reason: 'Work is not proper completed by tasker',
      details: 'Work is not proper completed by tasker',
    };
    try {
      const response = await createDispute(payload);
      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Dispute created successfully',
        });
        setShowConfirm(false);
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Error creating dispute',
          text2: (response.error as AxiosErrorMessage).response?.data?.message as string,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error creating dispute',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
  };

  const handleReview = async (item: any) => {
    console.log('Review', item);
    setShowReview(true);
    setItem(item);
  };

  const handleReviewApi = async (item: any) => {
    console.log('Review', review, rating, item?.userId, item?.taskId, user.role);
    try {
      const response = await writeReview({
        userId: item?.userId,
        taskId: item.taskId,
        reviewTo: user.role === UserRole.Poster ? UserRole.Tasker : UserRole.Poster,
        review: review,
        rating: rating,
      });
      if (response) {
        Toast.show({
          type: 'success',
          text1: 'Review created successfully',
        });
        setShowReview(false);
        setItem(null);
        setReview('');
        setRating(0);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error creating review',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
      setShowReview(false);
      setItem(null);
      setReview('');
      setRating(0);
    }
  };

  const renderItem = ({ item }: { item: Bid }) => {
    const { label, backgroundColor, disabled, onPress } = getContractButton(
      item.contractStatus as ContractStatus | null,
      item,
      handleCreateContract,
      handleWithdraw,
      handleCloseJob,
      handleReleasePayment,
      handleReview
    );
    return (
      <View style={styles.card}>
        <View style={styles.userRow}>
          <Image
            source={{
              uri: `https://ui-avatars.com/api/?name=${item.user.name}&background=ffffff`,
            }}
            style={styles.avatar}
          />

          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{item.user.name}</Text>
            <Text style={styles.userEmail}>{item.user.email}</Text>
          </View>
        </View>

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
            Final Price: {item.contractDetails && item.contractDetails.finalPrice ? formatCurrency(item.contractDetails.finalPrice) : 'N/A'}
          </Text>
        </View>
        <Text style={styles.footerText}>
          Expected Completion: {item.offeredEstimatedTime}h
        </Text>
        <View style={styles.footerRow}>

          <TouchableOpacity
            style={[styles.footerButton, disabled ? { backgroundColor: Colors.LIGHT_GREY } : { backgroundColor: backgroundColor }]}
            onPress={onPress}
            disabled={disabled || payReleased}
          >
            <Text style={styles.footerBtnText}>{label}</Text>
          </TouchableOpacity>
          {item.contractStatus === ContractStatus.COMPLETED && item.task.paymentStatus !== PaymentStatus.PAID && (
            <TouchableOpacity
              style={[styles.footerButton, disabled ? { backgroundColor: Colors.LIGHT_GREY } : { backgroundColor: backgroundColor }]}
              onPress={() => handleCreateDispute(item)}
            // disabled={disabled}
            >
              <Text style={styles.footerBtnText}>Dispute</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() => handleCreateChat(item)}
          >
            <Text style={styles.footerBtnText}>Chat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={t('bid.allBids')} />
        <View style={{ flex: 1, padding: metrics.padding(10), backgroundColor: Colors.BACKGROUND }}>
          {loading ? (
            <Loader fullScreen={true} color={Colors.MAIN_COLOR} />
          ) : myBids?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text>{t('bid.noBidsFound')}</Text>
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
              contentContainerStyle={{ padding: metrics.padding(10) }}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </SafeAreaView>
      <ConfirmationModal
        visible={showConfirm}
        message={confirmConfig.message}
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmConfig.onConfirm}
      />
      <CustomModal
        children={
          <Rate
            initialRating={rating}
            onRatingChange={setRating}
          // onClose={() => setShowReview(false)}
          />
        }
        visible={showReview}
        onClose={() => setShowReview(false)}
        type="custom"
        title="Write Review"
        placeholder="Write your review here..."
        value={review}
        onChangeText={setReview}
        onAccept={() => handleReviewApi(item)}
      />
    </SafeAreaProvider>
  );
};

export default AllBids;
