import React, { useCallback, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import { getTaskerBids } from '../../service/apiService';
import { useAppSelector } from '../../store/store';
import Header from '../layout/Header';
import Loader from '../../components/Loader';
import Colors from '../../constants/color';
import styles from './bids';
import { formatCurrency } from '../../utils/helper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import LocationIcon from '../../Icons/LocationIcon';
import metrics from '../../constants/metrics';

const MyBids = () => {
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});

  const { user } = useAppSelector((state: any) => state.authReducer);
  const navigation = useNavigation<any>();

  const toggleDescription = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id], // toggle only the clicked item
    }));
  };

  const shouldShowButton = (description: string) => description.length > 100;

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

  useFocusEffect(
    useCallback(() => {
      fetchMyBids();
    }, []),
  );

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${item.client.encryptedName}&background=random`,
          }}
          style={styles.avatar}
        />
        <View style={{ flex: 1, gap: metrics.gap(5) }}>
          <Text style={styles.userName}>{item.client.encryptedName}</Text>
          <Text style={styles.userEmail}>
            <LocationIcon size={15} color={Colors.DARK_GREY} style={{ marginTop: metrics.marginTop(5) }} />
            {item.task.location.city},{item.task.location.state}
          </Text>
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

      {/* Task Title */}

      {/* Transcript / Comment */}
      {/* <Text style={styles.sectionTitle}>Transcript</Text> */}
      <Text style={styles.taskDate}>
        Applied on: {new Date(item.task.createdAt).toDateString()}
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
          onPress={() =>
            navigation.navigate('ApplyTask', {
              bid: item,
              isEditing: true,
            })
          }
        >
          <Text style={styles.footerBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, }}>
        <Header title="My Bids" showBack={true} />
        <View style={styles.filterRow}>
          <View style={styles.searchContainer}>
            <SearchInput
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder="Search..."
              autoFocus={false}
            />
          </View>
        </View>
        <View style={styles.container}>
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MyBids;
