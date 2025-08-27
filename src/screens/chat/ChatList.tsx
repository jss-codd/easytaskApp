// src/screens/ChatListScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Header from '../layout/Header';

// type ChatListNavProp = NativeStackNavigationProp<RootStackParamList, "ChatList">;

type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
};

const dummyChats: Chat[] = [
  {
    id: '1',
    name: 'Tasker',
    lastMessage: 'New task',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    id: '2',
    name: 'Support',
    lastMessage: 'Hello, how can I help?',
    avatar: 'https://i.pravatar.cc/100?img=10',
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Header title="Chats" />
      <FlatList
        data={dummyChats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate('Chat', {
                userId: item.id,
                userName: item.name,
              })
            }
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  chatInfo: { flex: 1 },
  chatName: { fontSize: 16, fontWeight: '600' },
  lastMessage: { fontSize: 14, color: '#555' },
});
