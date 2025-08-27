import React, { use, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '../layout/Header';
import { getTaskById } from '../../service/apiService';
import { formatCurrency, formatDate2, timeAgo } from '../../utils/helper';
import styles from './bidDetails';
import {
  Chip,
  InfoRow,
  Rating,
  Section,
} from '../../components/CustomComponents';
import LocationIcon from '../../Icons/LocationIcon';
import Colors from '../../constants/color';

const BidDetails = () => {
  const route = useRoute();
  const { task } = route.params as { task: any };

  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTaskDetails = async () => {
    try {
      setLoading(true);
      const taskDetails = await getTaskById(task.id);
      console.log('taskDetails', taskDetails);
      setTaskDetails(taskDetails);
    } catch (error) {
      console.error('Error fetching task details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [task.id]);

  return (
    <>
      <Header title="Bids on My Task" showBack={true} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
      >
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color={Colors.MAIN_COLOR} />
          </View>
        ) : taskDetails || taskDetails === null ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={styles.textMuted}>No Bid details available.</Text>
          </View>
        ) : (
          <>
            <View style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{taskDetails?.task?.title}</Text>
                <View style={styles.verifiedRow}>
                  <Text style={styles.verifiedIcon}>✔</Text>
                  <Text style={styles.verifiedText}>Payment Verified</Text>
                </View>
              </View>

              {/* Address */}
              <Text style={styles.textMuted}>
                <LocationIcon size={10} /> {taskDetails?.task?.location?.city}{' '}
                {taskDetails?.task?.location?.state}{' '}
                {taskDetails?.task?.location?.country}
              </Text>

              {/* Budget */}
              <InfoRow
                label="Budget"
                value={formatCurrency(taskDetails?.task?.estimateBudget)}
              />
              <InfoRow
                label="Estimated Date"
                value={formatDate2(taskDetails?.task?.deadline)}
              />

              <Section
                title="Task Description"
                value={taskDetails?.task?.description?.replace(/<[^>]+>/g, '')}
              />

              <View style={styles.divider} />
              <Section title="Tasker's List" value={''} />
              <View style={{ flex: 1, padding: 10 }}>
                {taskDetails &&
                  taskDetails?.tasker &&
                  taskDetails?.tasker.map((tasker: any) => (
                    <View key={tasker.id} style={styles.taskerCard}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.textBold}>
                          TaskerId: {tasker?.name || 'N/A'}
                        </Text>
                        <Rating stars={tasker?.profile?.aggrRating} />
                      </View>
                      <Text style={styles.textMuted}>
                        Applied on: {formatDate2(tasker?.createdAt)}
                      </Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <InfoRow
                          label="Offered Price"
                          value={formatCurrency(tasker?.offeredPrice)}
                        />
                        <InfoRow
                          label="Expected Completion Time"
                          value={`${tasker?.offeredEstimatedTime} hours`}
                        />
                      </View>
                    </View>
                  ))}
              </View>
            </View>
            {/* Preferred Qualifications */}
            {/* <Text style={styles.textBold}>Preferred Qualifications</Text>
            <Chip text="Entry level experience preferred" />
            <Chip text="Remote work allowed" />
            <Chip text="English communication skills" /> */}

            {/* <View style={styles.divider} /> */}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default BidDetails;
