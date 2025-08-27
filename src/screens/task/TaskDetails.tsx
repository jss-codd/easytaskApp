import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native';
import Colors from '../../constants/color';

import { formatCurrency } from '../../utils/helper';
import { formatDate2 } from '../../utils/helper';
import LocationIcon from '../../Icons/LocationIcon';
import { InfoRow, Rating, Section } from '../../components/CustomComponents';
import styles from './bidDetails';
import Header from '../layout/Header';

const TaskDetails = () => {
  const route = useRoute();
  const { task } = route.params as { task: any };
  const navigation = useNavigation<any>();
  console.log('task', task);
  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header title="View Task Details" showBack={true} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={true}
      >
        {/* {loading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color={Colors.MAIN_COLOR} />
          </View>
        ) : taskDetails || taskDetails === null ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text style={styles.textMuted}>No Task details available.</Text>
          </View>
        ) : ( */}
        <>
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{task?.title}</Text>
              <View style={styles.verifiedRow}>
                <Text style={styles.verifiedIcon}>✔</Text>
                <Text style={styles.verifiedText}>Payment Verified</Text>
              </View>
            </View>

            {/* Address */}
            <Text style={styles.textMuted}>
              <LocationIcon size={10} /> {task?.location?.city}{' '}
              {task?.location?.state} {task?.location?.country}
            </Text>

            {/* Budget */}
            <InfoRow
              label="Budget"
              value={formatCurrency(task?.estimateBudget)}
            />
            <InfoRow
              label="Estimated Date"
              value={formatDate2(task?.deadline)}
            />

            <Section
              title="Task Description"
              value={task?.description?.replace(/<[^>]+>/g, '')}
            />

            {/* {media} */}
            {task?.media && task.media.length > 0 && (
              <View>
                {task.media.map((item: any, index: any) => (
                  <Image
                    key={index}
                    source={{ uri: item }}
                    style={{ width: '100%', height: 200, marginBottom: 10 }}
                    resizeMode="cover"
                  />
                ))}
              </View>
            )}
            <TouchableOpacity style={styles.button} onPress={() => {
              navigation.navigate('ApplyTask', { task: task, ownerId: task?.ownerId });
            }}>
              <Text style={styles.buttonText}>Apply Now</Text>
            </TouchableOpacity>
            {/* <View style={styles.divider} /> */}
            {/* <Section title="Tasker's List" value={''} /> */}
            {/* <View style={{ flex: 1, padding: 10 }}>
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
              </View> */}
          </View>
          {/* Preferred Qualifications */}
          {/* <Text style={styles.textBold}>Preferred Qualifications</Text>
            <Chip text="Entry level experience preferred" />
            <Chip text="Remote work allowed" />
            <Chip text="English communication skills" /> */}

          {/* <View style={styles.divider} /> */}
        </>
        {/* )} */}
      </ScrollView>
    </>
  );
};

export default TaskDetails;
