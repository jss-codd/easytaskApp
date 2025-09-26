import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getChatMessages } from '../../service/apiService';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ChatStackParamList } from '../../navigation/AppNavigator';
import { io, Socket } from 'socket.io-client';
import Header from '../layout/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Message } from '../../utils/type';
import { styles } from './chat';
import Loader from '../../components/Loader';
import { SocketUrl } from '../../service/axiosInterceptor';
import metrics from '../../constants/metrics';

type ChatRouteProp = RouteProp<ChatStackParamList, 'Chat'>;
type Props = { route: ChatRouteProp };

const ChatScreen = ({ route }: Props) => {
  const { userId, chatId, recieverId, userName } = route.params;
  const navigation = useNavigation<any>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList<Message>>(null);
  const socket = useRef<Socket | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (chatId) {
        fetchMessages(chatId);
      }
    }, [chatId]),
  );

  useEffect(() => {
    setSelectedChat(chatId);
    return () => setSelectedChat(null);
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    socket.current = io(SocketUrl, {
      query: { userId },
      auth: { ngrokSkipBrowserWarning: 'true' },
      transports: ['websocket'],
    });

    socket.current.connect();
    socket.current.emit('joinChat', userId);

    return () => {
      socket.current?.disconnect();
    };
  }, [userId]);

  const fetchMessages = async (id: string) => {
    try {
      setLoading(true);
      const response = await getChatMessages(id);
      if (response && Array.isArray(response)) {
        const sorted = response.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        setMessages(sorted);
      }
    } catch (err) {
      console.log('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = (id: string, role: string) => {
    try {
      socket.current?.emit('markAsRead', id, role);
    } catch (error) {
      console.error('markAsRead error:', error);
    }
  };

  const subscribeToMessages = () => {
    socket.current?.off('newMessage');
    socket.current?.on('newMessage', (newMessage: Message) => {

      const isForCurrentChat = newMessage.chatId === selectedChat;
      if (isForCurrentChat) {
        setMessages(prev => {
          const alreadyExists = prev.some(msg => msg.id === newMessage.id);
          if (alreadyExists) return prev;

          return [...prev, newMessage];
        });

        if (newMessage.receiverId === userId) {
          markAsRead(selectedChat!, 'isTaskerRead');
        }
      }
    });
  };

  const unsubscribeFromMessages = () => {
    socket.current?.off('newMessage');
  };

  const subscribeToConversationUpdated = () => {
    socket.current?.off('conversationUpdated');
    socket.current?.on('conversationUpdated', () => {
      // console.log('Conversation Updated');
    });
  };

  const unsubscribeFromConversationUpdated = () => {
    socket.current?.off('conversationUpdated');
  };

  useEffect(() => {
    subscribeToMessages();
    subscribeToConversationUpdated();

    return () => {
      unsubscribeFromMessages();
      unsubscribeFromConversationUpdated();
    };
  }, [selectedChat]);

  const sendMessage = () => {
    if (!text.trim()) return;
    // const tempId = Date.now().toString() + Math.random().toString();

    const cleanMessage: Message = {
      // id: tempId,
      chatId,
      text: text.trim(),
      receiverId: recieverId,
      senderId: userId,
      // role: user.role === 'Tasker' ? 'isTaskerRead' : 'isPosterRead',
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => {
      const firstMessage = prev.length === 0 ? true : false;
     
      if (firstMessage) {
        return prev;
      }
      const alreadyExists = prev.some(msg => { return msg.id !== cleanMessage.id });
      if (alreadyExists || firstMessage) return prev;
      return [...prev, cleanMessage];
    });
    
    setText('');
    socket.current?.emit('sendMessage', cleanMessage);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.senderId === userId;
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>
          {new Date(item.createdAt || '').toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.chatWindow} edges={['top', 'bottom']} >
      {loading && <Loader fullScreen={true} />}
      <Header title={userName || 'Chat'} showBack={navigation.canGoBack()} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 64}
      >
     
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.createdAt || item.senderId}
          contentContainerStyle={{
            flexGrow: 1,
            padding: metrics.padding(10),
          }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: false })
          }
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
          initialScrollIndex={messages.length > 0 ? messages.length - 1 : 0}
          getItemLayout={(data, index) => ({
            length: 70,
            offset: 70 * index,
            index,
          })}
          keyboardShouldPersistTaps="handled"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
