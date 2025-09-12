import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import Colors from '../../constants/color';

import { formatCurrency, getBidRange, timeAgo } from '../../utils/helper';
import { formatDate2 } from '../../utils/helper';
import LocationIcon from '../../Icons/LocationIcon';
import { SaveIcon, UnsaveIcon } from '../../Icons/SaveIcon';
import {
  Chip,
  InfoRow,
  Rating,
  Section,
} from '../../components/CustomComponents';
import styles from './bidDetails';
import Header from '../layout/Header';
import metrics from '../../constants/metrics';
import { getAllTaskById } from '../../service/apiService';
import { ImageUrl } from '../../service/axiosInterceptor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const TaskDetails = () => {
  const route = useRoute();
  const { task } = route.params as { task: any };
  const navigation = useNavigation<any>();

  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);
  console.log('taskDetails', taskDetails);

  const fetchTaskDetails = async () => {
    try {
      const response = await getAllTaskById(task?.id);
      console.log('response', response);
      setOwnerDetails(response.ownerStats);
      setTaskDetails(response);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [task?.id]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Task Details" showBack={true} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: Colors.WHITE }}
        >
          <View style={styles.card}>
            {/* Posted Time */}
            <Text style={styles.postedTime}>
              {`Posted ${timeAgo(task?.createdAt || taskDetails?.createdAt)}`}
            </Text>

            {/* Job Title */}
            <Text style={styles.title}>{task?.title}</Text>

            {/* Location */}
            <View style={styles.locationRow}>
              <LocationIcon size={15} color={Colors.DARK_GREY} />
              <Text style={styles.textMuted}>
                {task?.location?.city} {task?.location?.state}
              </Text>
            </View>

            {/* Description */}
            <View style={styles.divider} />
            <Section
              title="Description"
              value={task?.description?.replace(/<[^>]+>/g, '')}
            />

           
            <View style={styles.divider} />
            <InfoRow
              label="Budget"
              value={formatCurrency(task?.estimateBudget)}
            />
            <InfoRow
              label="Deadline"
              value={formatDate2(task?.deadline)}
            />

            {/* Attachments */}
            {/* {task?.media && task.media.length > 0 && (
              <>
                <View style={styles.divider} />
                <Section
                  title="Attachments"
                  value={`${task?.media?.length} files`}
                />
                <View>
                  {task.media.map((item: any, index: any) => (

                    <Image
                      key={index}
                      source={{ uri: `${ImageUrl}${item}` }}
                      style={{ width: 100, height: 100, marginBottom: 10, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              </>
            )} */}
             <View style={styles.divider} />
              <Section
                title="Attachments"
                value={`${task?.media?.length} files`}
              />
              {task?.media && task.media.length > 0 && (
                <View>
                  {task.media.map((item: any, index: any) => (

                    <Image
                      key={index}
                      source={{ uri: `${ImageUrl}${item}` }}
                      style={{ width: 100, height: 100, marginBottom: 10, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ))}
                </View>
              )}

            {/* Job Categories */}
            <View style={styles.divider} />
            <Text style={styles.textBold}>Job Category</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: metrics.marginTop(5),
              }}
            >
              {task?.selectedCategories?.map((category: any) => (
                <React.Fragment key={category.id}>
                  <Chip text={category.name} />
                  {category?.subCategories?.map((sub: any) => (
                    <Chip key={sub.id} text={sub.name} />
                  ))}
                </React.Fragment>
              ))}
            </View>
            <View style={styles.divider} />
            {/* Activity Section */}
            <View style={styles.activitySection}>
              <Text style={styles.activityTitle}>Bids on this Task</Text>
              <View style={styles.activityRow}>
                <Text style={styles.activityLabel}>Bids</Text>
                <Text style={styles.activityValue}>{getBidRange(Number(task._count.bids))}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            {/* Client Details */}
            <View style={styles.clientSection}>
              <Text style={styles.clientTitle}>About the client</Text>

              <View style={styles.clientInfo}>
                <View style={styles.verifiedRow}>
                  <Text style={styles.verifiedIcon}>✔</Text>
                  <Text style={styles.verifiedText}>Payment verified</Text>
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <Rating stars={task?.owner?.profile?.aggrRating || 0} />

                </View>

                <Text style={styles.clientLocation}>
                  <LocationIcon size={15} color={Colors.DARK_GREY} />{' '}
                  {task?.location?.city} {task?.location?.state}
                </Text>
              </View>

              <View style={styles.clientStats}>
                <View style={styles.clientStatRow}>
                  <Text style={styles.clientStatLabel}>Total Jobs Posted</Text>
                  <Text style={styles.clientStatValue}>{ownerDetails?.totalJobsPosted}</Text>
                </View>

                <View style={styles.clientStatRow}>
                  <Text style={styles.clientStatLabel}>Total Spent</Text>
                  <Text style={styles.clientStatValue}>{formatCurrency(ownerDetails?.totalSpent)}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <Section title="All Posted Jobs" value={''} />
              <View style={{ flex: 1, padding: 10 }}>
                {taskDetails?.ownerStats && taskDetails?.ownerStats?.jobs?.length > 0 ? (
                  taskDetails?.ownerStats?.jobs.map((job: any) => (
                    <View key={job.id} style={styles.taskerCard}>
                      <View
                        style={{
                          flexDirection: 'row',
                          // justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.textBold}>
                          {job?.title || 'N/A'}
                        </Text>
                        {/* <Rating stars={job?.profile?.aggrRating} /> */}
                      </View>


                      {/* <View
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
                    </View> */}
                    </View>
                  ))
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: Colors.DARK_GREY,
                      marginTop: 20,
                      fontSize: metrics.fontSize(14),
                    }}
                  >
                    No bids applied yet
                  </Text>
                )}
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigation.navigate('ApplyTask', {
                    task: task,
                    ownerId: task?.ownerId,
                  });
                }}
              >
                <Text style={styles.buttonText}>Apply now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  setIsSaved(!isSaved);
                  console.log('save task');
                }}
              >
                <Text style={styles.saveButtonText}>Save job</Text>
                {isSaved ? (
                  <SaveIcon size={20} color={Colors.MAIN_COLOR} />
                ) : (
                  <UnsaveIcon size={20} color={Colors.MAIN_COLOR} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default TaskDetails;
