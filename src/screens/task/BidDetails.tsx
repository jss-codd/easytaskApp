import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../layout/Header';
import { archiveTask, getTaskById } from '../../service/apiService';
import { formatCurrency, formatDate2, getBidRange, timeAgo } from '../../utils/helper';
import styles from './bidDetails';
import {
  Chip,
  InfoRow,
  Rating,
  Section,
} from '../../components/CustomComponents';
import LocationIcon from '../../Icons/LocationIcon';
import Colors from '../../constants/color';
import metrics from '../../constants/metrics';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import EditIcon from '../../Icons/EditIcon';
import ArchiveIcon from '../../Icons/ArchiveIcon';
import { ImageUrl } from '../../service/axiosInterceptor';
import { Toast } from '../../components/CommonToast';
import { AxiosErrorMessage } from '../../utils/type';
import { useTranslation } from 'react-i18next';

const BidDetails = () => {
  const { t } = useTranslation();

  const route = useRoute();
  const { task } = route.params as { task: any };
  const navigation = useNavigation<any>();
  const isEditing = !!task;

  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const [taskDetails, setTaskDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTaskDetails = async (id: string) => {
    try {
      setLoading(true);
      const taskDetails = await getTaskById(task.id);
      setTaskDetails(taskDetails);
      setOwnerDetails(taskDetails.ownerStats);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails(task.id);
  }, [task.id,taskDetails?.archived]);

  const handleArchiveTask = async (id: string,isArchived: boolean) => {
    const payload = { archived: !isArchived };
    try {
      const response = await archiveTask(id, payload);
      Toast.show({
        type: 'success',
        text1: 'Task ' + (isArchived ? 'unarchived' : 'archived') + ' successfully',
      });
      fetchTaskDetails(id);
      // navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error archiving task',
        text2: (error as AxiosErrorMessage).response?.data?.message as string,
      });
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
          minHeight: '100%',
        }}
      >
        <StatusBar backgroundColor={Colors.MAIN_COLOR} barStyle="dark-content" />
        <Header title={t('bid.allBids')} showBack={true} />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}

        >
          {loading ? (
            <View
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
              <ActivityIndicator size="large" color={Colors.MAIN_COLOR} />
            </View>
          ) : (
            <View style={styles.card}>
              <Text style={styles.postedTime}>
                {`Posted ${timeAgo(task?.createdAt)}`}
              </Text>
              <View style={styles.headerRow}>
                <Text style={styles.title}>{task?.title}</Text>
                <View style={styles.iconContainer}>


                  <EditIcon size={25} color={task?._count?.bids > 0 ? Colors.DARK_GREY : Colors.LINK_COLOR} disabled={task?._count?.bids > 0} onPress={() => { navigation.navigate('PostTask', { bid: task, isEditing: isEditing }) }} />
                  <ArchiveIcon size={25} color={taskDetails?.task?.archived ? Colors.DARK_GREY : Colors.SUCCESS_GREEN} disabled={task?._count?.bids > 0} onPress={() => { handleArchiveTask(task.id,taskDetails?.task?.archived) }} />
                </View>
              </View>
              <Rating stars={task?.owner?.profile.rating || 0} />
              <View style={styles.verifiedRow}>
                <Text style={styles.verifiedIcon}>✔</Text>
                <Text style={styles.verifiedText}>Payment verified</Text>
              </View>

              <View style={styles.locationRow}>
                <LocationIcon size={15} color={Colors.DARK_GREY} />
                <Text style={styles.textMuted}>
                  {task?.location?.city} {task?.location?.state}
                </Text>
              </View>

              <View style={styles.divider} />
              <Section
                title="Discription"
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
                  <Text style={styles.activityValue}>{getBidRange(Number(task?._count?.bids))}</Text>
                </View>
              </View>

              <View style={styles.divider} />
              <Section title="Tasker's List" value={''} />
              <View style={{ flex: 1, padding: 10 }}>
                {taskDetails && taskDetails?.tasker?.length > 0 ? (
                  taskDetails.tasker.map((tasker: any) => (
                    <View key={tasker.id} style={styles.taskerCard}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={styles.textBold}>
                          {tasker?.name || 'N/A'}
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
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default BidDetails;
