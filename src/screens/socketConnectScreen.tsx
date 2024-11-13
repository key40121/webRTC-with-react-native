import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { AppContext } from '../contexts/AppContext';
import type { StackScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import io from 'socket.io-client';

type SocketConnectScreenProps = StackScreenProps<RootStackParamList, 'Join'>;

const SocketConnectScreen: React.FC<SocketConnectScreenProps> = ({ navigation }) => {

  const userName = "Taichi-" + Math.floor(Math.random() * 100000)
  const password = "x";
  const SOCKET_SERVER_URL = 'http://10.0.2.2:3000'; // only for android emulator.

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // connect the server
  useEffect(() => {
    console.log("connecting the server")
    const newSocket = io.connect(SOCKET_SERVER_URL, {
      auth: {
        userName, password
      }
    })

    setSocket(newSocket);

    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    })

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      console.log("send message :" + message);
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <>
      <View style={{ padding: 20 }}>
        <Text>Received message</Text>
        {messages.map((msg, index) => (
          <Text key={index}>{msg}</Text>
        ))}
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="input message"
        />
        <Button title="send" onPress={sendMessage} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#FFFFFF',  // 白色に変更
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex: 1
  },
  footer: {
    backgroundColor: '#f0f0f0',  // 明るい背景色に変更
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
});

export default SocketConnectScreen;
