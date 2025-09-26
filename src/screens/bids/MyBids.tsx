import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import { acceptContract, getTaskerBids, rejectContract } from '../../service/apiService';
import { useAppSelector } from '../../store/store';
import Header from '../layout/Header';
import Loader from '../../components/Loader';
import Colors from '../../constants/color';
import styles from './bids';
import { formatCurrency, getContractActions } from '../../utils/helper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import LocationIcon from '../../Icons/LocationIcon';
import metrics from '../../constants/metrics';
import { CustomModal } from '../../components/CustomModal';
import { Toast } from '../../components/CommonToast';
import { AxiosErrorMessage } from '../../utils/type';
import { useTranslation } from 'react-i18next';


const MyBids = () => {
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [reason, setReason] = useState('');
  const [contractSummary, setContractSummary] = useState<any>(null);

  const { user } = useAppSelector((state: any) => state.authReducer);
  const navigation = useNavigation<any>()
  const { t } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      fetchMyBids();
    }, []),
  );

  useEffect(() => {
    fetchMyBids();
  }, []);

  const toggleDescription = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAcceptContract = async () => {
    try {
      const response = await acceptContract(contractSummary.id);
      if (response.success ) {
        Toast.show({
          type: 'success',
          text1: 'Contract accepted successfully',
        });
        setShowAccept(false);
        fetchMyBids();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error accepting contract',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
  }

  const handleRejectContract = async () => {
    try {
      const response = await rejectContract(contractSummary.id, reason);
     if (response.success ) {
      Toast.show({
        type: 'success',
        text1: 'Contract rejected successfully',
      });
      setShowReject(false);
      setReason('');
      fetchMyBids();
     }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error rejecting contract',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
   
  }

  const shouldShowButton = (description: string) => description.length > 100;

  const fetchMyBids = async () => {
    try {
      setLoading(true);
      const response = await getTaskerBids(user?.id);
      setBids(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  const renderItem = ({ item }: { item: any }) => (

    <View style={styles.card}>
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${item.client.encryptedName}&background=ffffff`,
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, gap: metrics.gap(5) }}>
          <Text style={styles.userName}>{item.client.encryptedName}</Text>
          <View style={[styles.row, { flex: 1 }]}>
            <LocationIcon color="gray" size={15} />
            <Text style={styles.locationText}>
              {item.task.location.city},{item.task.location.state}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.appliedBadge}>
            <Text style={styles.appliedBadgeText}>Applied</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />
      <View style={styles.userRow}>
        {/* {item.user.profile.avatar ? ( */}
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>Task: {item.task.title}</Text>
          <Text
            style={styles.userEmail}
            numberOfLines={expandedItems[item.id] ? undefined : 3}
          >
            {item.task.description?.replace(/<[^>]+>/g, '')}
          </Text>
          {shouldShowButton(item.task.description) && (
            <TouchableOpacity onPress={() => toggleDescription(item.id)}>
              <Text style={styles.showMore}>
                {expandedItems[item.id] ? 'Show Less' : 'Show More'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <Text style={styles.taskDate}>
        Applied on: {new Date(item.task.createdAt).toDateString()}
      </Text>
      <View style={styles.footerRow}>
        <Text style={styles.footerText}>
          Quoted Price: {formatCurrency(item.offeredPrice)}
        </Text>
        <Text style={styles.footerText}>
          Final Price: {formatCurrency(item.contractDetails.finalPrice)}
        </Text>
      </View>
        <Text style={styles.footerText}>
          Expected Completion: {item.offeredEstimatedTime}h
        </Text>
      <View style={styles.footerRow}>
        {getContractActions(item.contractStatus).map((btn: any, idx: any) => (
          <TouchableOpacity
            key={idx}
            style={styles.footerButton}
            onPress={() => {
              if (btn.action === "edit") {
                navigation.navigate("ApplyTask", { bid: item, isEditing: true });
              }
              if (btn.action === "accept") {
                setShowAccept(true);
                setContractSummary(item.contractDetails);
              }
              if (btn.action === "reject") {
                setShowReject(true);
                setContractSummary(item.contractDetails);
                setReason('');
              }
              if (btn.action === "ongoing") {
                console.log("Ongoing contract:", item.id);
              }
            }}
          >
            <Text style={styles.footerBtnText}>{btn.label}</Text>
          </TouchableOpacity>
        ))}

      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <Header title={t('bid.myBids')} showBack={true} />
        <View style={styles.filterRow}>
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
            <Loader fullScreen={true} color={Colors.MAIN_COLOR} />
          ) : bids?.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text>{t('bid.noBidsFound')}</Text>
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
      </SafeAreaView>
      <CustomModal
        visible={showAccept}
        onClose={() => setShowAccept(false)}
        type="accept"
        title="Contract Summary"
        contractDetails={contractSummary}
        onAccept={() => handleAcceptContract()}
      />
      <CustomModal
        visible={showReject}
        onClose={() => setShowReject(false)}
        type="reject"
        title="Reject Contract"
        placeholder="Explain why you are rejecting this contract..."
        value={reason}
        onChangeText={setReason}
        onReject={() => handleRejectContract()}
      />


    </SafeAreaProvider>
  );
};

export default MyBids;
