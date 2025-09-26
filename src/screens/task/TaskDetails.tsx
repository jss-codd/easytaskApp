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
import { getAllTaskById, saveTasks, unsaveTasks } from '../../service/apiService';
import { ImageUrl } from '../../service/axiosInterceptor';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { fetchBrowseTasks } from '../../store/slices/taskSlice';
import { Toast } from '../../components/CommonToast';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';

const TaskDetails = () => {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { task } = route.params as { task: any };
  const { user } = useAppSelector((state: any) => state.authReducer);
  const { t } = useTranslation();

  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  const fetchTaskDetails = async () => {
    try {
      const response = await getAllTaskById(task?.id);
      setOwnerDetails(response.ownerStats);
      setTaskDetails(response);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [task?.id]);

  const handleSave = async (id: string) => {

    if (isSaved) {
      const response = await unsaveTasks(id);
      Toast.show({
        type: 'success',
        text1: 'Task unsaved successfully',
      });
      setIsSaved(false);
      dispatch(fetchBrowseTasks({ search: '', userId: user?.id }));
    } else {
      await saveTasks(id);
      Toast.show({
        type: 'success',
        text1: 'Task saved successfully',
      });
      setIsSaved(true);
      dispatch(fetchBrowseTasks({ search:'', userId: user?.id }));
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title={t('task.taskDetails')} showBack={true} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: Colors.WHITE }}
        >
          <View style={styles.card}>
            <Text style={styles.postedTime}>
              {`Posted ${timeAgo(task?.createdAt || taskDetails?.createdAt)}`}
            </Text>

            <View style={styles.headerRow}>
              <Text style={styles.title}>{task?.title}</Text>
              <View style={styles.iconContainer}>
                <Text style={styles.appliedBadgeText}>{taskDetails?.data?.alreadyApplied ? 'Already applied' : ''}</Text>
              </View>
            </View>

            <View style={styles.locationRow}>
              <LocationIcon size={15} color={Colors.DARK_GREY} />
              <Text style={styles.textMuted}>
                {task?.location?.city} {task?.location?.state}
              </Text>
            </View>

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
            <View style={styles.activitySection}>
              <Text style={styles.activityTitle}>Bids on this Task</Text>
              <View style={styles.activityRow}>
                <Text style={styles.activityLabel}>Bids</Text>
                <Text style={styles.activityValue}>{getBidRange(Number(task._count.bids))}</Text>
              </View>
            </View>
            <View style={styles.divider} />
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

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={taskDetails?.data?.alreadyApplied ? styles.appliedButton : styles.button}
                onPress={() => {
                  navigation.navigate('ApplyTask', {
                    task: task,
                    ownerId: task?.ownerId,
                    // bid: null,
                  });
                }}
              >
                <Text style={styles.buttonText}>{taskDetails?.data?.alreadyApplied ? 'Applied' : 'Apply now'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  handleSave(task?.id);
                }}
              >
                <Text style={styles.saveButtonText}>Save job</Text>
                {task.isBookmarked ? (
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
