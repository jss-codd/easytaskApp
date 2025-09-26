import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import Header from '../layout/Header';
import { getChats } from '../../service/apiService';
import { UserRole } from '../../utils/enums';
import Colors from '../../constants/color';
import metrics from '../../constants/metrics';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { formatChatTime } from '../../utils/helper';
import Loader from '../../components/Loader';
import { useAppSelector } from '../../store/store';
import { useTranslation } from 'react-i18next';

const ChatListScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { user } = useAppSelector(state => state.authReducer);
  const { t } = useTranslation();

  const [chats, setChats] = useState<any[]>();
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getAllChats();
    }, []),
  );

  const getAllChats = async () => {
    try {
      setLoading(true);
      const response = await getChats();
      setChats(response);
      return response;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);

  const renderItem = ({ item }: { item: any }) => {
    const userName = user?.role === UserRole.Tasker ? item.poster.name : item.tasker.name;
    const lastMessage = item.lastMessage?.text || 'No messages yet';
    const messageTime = formatChatTime(item.lastMessage?.createdAt);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() =>
          navigation.navigate('Chat', {
            userId: user?.id,
            recieverId: user?.role === UserRole.Tasker ? item.posterId : item.taskerId,
            chatId: item.id,
            userName: userName,
          })
        }
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=25D366&color=ffffff`,
          }}
          style={styles.avatar}
        />
        <View style={styles.chatInfoContainer}>
          <View style={styles.chatInfo}>
            <Text style={styles.chatName} numberOfLines={1}>
              {item.task.title}
            </Text>
            <Text style={styles.lastMessageTime}>{messageTime}</Text>
          </View>
          <Text style={styles.lastMessage} numberOfLines={2}>
            {lastMessage}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header title={t('navigation.message')} />
        {loading && <Loader fullScreen={true} />}

        <FlatList
          data={chats}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={getAllChats}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: metrics.padding(16),
    paddingVertical: metrics.padding(12),
    backgroundColor: Colors.BACKGROUND,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.LIGHT_GREY,
    minHeight: metrics.height(52),
  },
  avatar: {
    width: metrics.width(50),
    height: metrics.width(50),
    borderRadius: metrics.width(50) / 2,
    marginRight: metrics.marginRight(12),
    backgroundColor: Colors.LIGHT_GREY,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chatInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: metrics.padding(2),
  },
  chatInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.margin(4),
  },
  chatName: {
    fontSize: metrics.fontSize(15),
    fontWeight: '500',
    color: Colors.BLACK,
    flex: 1,
    marginRight: metrics.margin(8),
    textTransform: 'capitalize',
  },
  lastMessage: {
    fontSize: metrics.fontSize(12),
    color: Colors.DARK_GREY,
    lineHeight: metrics.fontSize(20),
    flex: 1,
    marginRight: metrics.margin(8),
  },
  lastMessageTime: {
    fontSize: metrics.fontSize(12),
    color: Colors.DARK_GREY,
    fontWeight: '400',
    marginTop: metrics.margin(2),
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.LIGHT_GREY,
    marginLeft: metrics.margin(78), // Align with text content
  },
});

export default ChatListScreen;
