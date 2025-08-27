import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/color';
import LocationIcon from '../../Icons/LocationIcon';
import LogoutIcon from '../../Icons/Logout';
import JobIcon from '../../Icons/JobIcon';
import { Location } from '../../utils/type';
import { useNavigation } from '@react-navigation/native';
import { createChat } from '../../service/apiService';

interface JobCardProps {
  title: string;
  description: string;
  budget: number | string;
  location: Location;
  paymentVerified: boolean;
  postedTime: string;
  onViewBids: () => void;
  viewButtonText: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  description,
  budget,
  location,
  paymentVerified,
  postedTime,
  onViewBids,
  viewButtonText,
}) => {
  const navigation = useNavigation<any>();

  const handleHirePress = async () => {
    try {
      const response = await createChat({
        bidId: 'ebde2f62-d9cb-48c4-a7fc-6e4e22d9720e',
        taskId: '65b2adf1-0154-45b3-aa57-0885f13b5399',
        taskerId: 'cme70o6ux0001if6dlry049fd',
        posterId: 'cme70ok1a0002if6dad2xw2vd',
      });

      const chatId = response.data.id;

      navigation.navigate('Chat', {
        userId: 'cme70ok1a0002if6dad2xw2vd',
        userName: 'Poster Name',
        chatId: chatId,
      });
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
  return (
    <View style={styles.card}>
      {/* <View style={styles.headerRow}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.BUTTON_BACKGROUND,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={handleHirePress}
        >
          <Text
            style={{ color: Colors.WHITE, fontSize: 12, fontWeight: 'bold' }}
          >
            Hire{' '}
          </Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.headerRow}>
        <Text style={styles.title}>{title} </Text>
        <Text style={styles.postedTime}>{postedTime}</Text>
        {/* <JobIcon size={24} color="#27548a" /> */}
      </View>

      <View style={styles.row}>
        {paymentVerified && (
          <View style={styles.row}>
            {/* <Icon name="check-decagram" size={16} color="green" /> */}
            <Text style={styles.verifiedText}> Payment Verified</Text>
          </View>
        )}
        <View style={[styles.row, { marginLeft: 10 }]}>
          <LocationIcon color="gray" size={15} />

          <Text style={styles.locationText}>
            {location.street}, {location.city}
          </Text>
        </View>
      </View>

      <Text style={styles.budget}>
        <Text style={{ fontWeight: 'bold' }}>Budget : {budget} </Text>
      </Text>

      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity style={styles.button} onPress={onViewBids}>
        <Text style={styles.buttonText}>{viewButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.CARD_BACKGROUND,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 8,
    shadowColor: '#27548a',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.13,
    shadowRadius: 18,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#e3e8ee',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'capitalize',
  },
  postedTime: {
    color: '#1a73e8',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  verifiedText: {
    color: 'green',
    fontSize: 13,
  },
  locationText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 3,
    flexShrink: 1,
  },
  budget: {
    marginTop: 6,
    fontSize: 14,
    color: '#000',
  },
  description: {
    marginTop: 6,
    fontSize: 13,
    color: '#777',
  },
  button: {
    marginTop: 12,
    backgroundColor: Colors.BUTTON_BACKGROUND,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
