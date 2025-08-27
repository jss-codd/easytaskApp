import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import io from 'socket.io-client';
import { ChatStackParamList } from '../../navigation/AppNavigator';
import { RouteProp } from '@react-navigation/native';

type Message = {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
};

const socket = io('http://localhost:3001'); 

type ChatRouteProp = RouteProp<ChatStackParamList, 'Chat'>;

type Props = { route: ChatRouteProp };

export default function ChatScreen({ route }: Props) {
  const { userId, userName, chatId } = route.params;

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const flatListRef = useRef<FlatList<Message>>(null);

  useEffect(() => {
    // Join the specific chat room
    socket.emit('joinChat', { chatId, userId });

    // Listen for incoming messages
    socket.on('receiveMessage', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.emit('leaveChat', { chatId, userId });
      socket.off('receiveMessage');
    };
  }, [chatId, userId]);

  const sendMessage = () => {
    if (text.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        userId,
        createdAt: new Date(),
      };

      // Emit message to server with chatId
      socket.emit('sendMessage', { ...newMessage, chatId });
      setMessages(prev => [...prev, newMessage]);
      setText('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.userId === userId;
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timeText}>
          {new Date(item.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.chatWindow}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          onLayout={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Input */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  chatWindow: { flex: 1, backgroundColor: '#F9F9E8' },
  chatContainer: { padding: 10 },
  messageContainer: {
    maxWidth: '75%',
    marginVertical: 4,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: { fontSize: 16 },
  timeText: {
    fontSize: 10,
    color: '#555',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
