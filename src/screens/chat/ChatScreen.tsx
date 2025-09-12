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
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { ChatStackParamList } from '../../navigation/AppNavigator';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../../store/store';
import Header from '../layout/Header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Message } from '../../utils/type';
import { styles } from './chat';
import Loader from '../../components/Loader';
import { SocketUrl } from '../../service/axiosInterceptor';

type ChatRouteProp = RouteProp<ChatStackParamList, 'Chat'>;
type Props = { route: ChatRouteProp };

const ChatScreen = ({ route }: Props) => {
  const { userId, chatId, recieverId, userName } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList<Message>>(null);
  const socket = useRef<Socket | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (chatId) {
        fetchMessages();
      }
    }, [chatId]),
  );

  useEffect(() => {
    setSelectedChat(chatId);
    return () => setSelectedChat(null);
  }, [chatId]);

  useEffect(() => {
    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await getChatMessages(chatId);
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

  socket.current = io(SocketUrl, {
    query: {
      userId: userId,
    },
    auth: {
      ngrokSkipBrowserWarning: 'true',
    },
    transports: ['websocket'],
  });
  socket.current.connect();
  socket.current.emit('joinChat', userId);
  socket.current.on('activeUsers', userIds => {
    // console.log('Active Users:', userIds);
  });

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
          const alreadyExists = prev.some(msg => msg.id !== newMessage.id);
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

    const tempId = Date.now().toString() + Math.random().toString();

    const cleanMessage: Message = {
      id: tempId,
      chatId,
      text: text.trim(),
      receiverId: recieverId,
      senderId: userId,
      // role: user.role === 'Tasker' ? 'isTaskerRead' : 'isPosterRead',
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => {
      const alreadyExists = prev.some(msg => { console.log('msg', msg); return msg.id === cleanMessage.id });
      if (alreadyExists) return prev;
      return [...prev, cleanMessage];
    });

    setText('');
    const { id: _, ...payload } = cleanMessage;
    socket.current?.emit('sendMessage', payload);
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
    <SafeAreaProvider>
      <SafeAreaView style={styles.chatWindow}>
        {loading && <Loader fullScreen={true} />}
        <Header title={userName || 'Chat'} showBack={true} />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.createdAt || item.senderId}
            contentContainerStyle={styles.chatContainer}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          <View style={styles.inputContainer}>

            <TextInput
              style={styles.input}
              value={text}
              onChangeText={setText}
              placeholder="Type a message..."
            />
            {/* 
<TouchableOpacity onPress={()=>{}} style={styles.mediaButton}>
    <Text style={{ fontSize: 20 }}>📷</Text>
  </TouchableOpacity> */}

            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendText}>➤</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};


export default ChatScreen;
