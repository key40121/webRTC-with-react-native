import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import { AppContext } from '../contexts/AppContext';
import type { StackScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

import { mediaDevices, RTCView } from 'react-native-webrtc';

type JoinScreenProps = StackScreenProps<RootStackParamList, 'Join'>;

const JoinScreen: React.FC<JoinScreenProps> = ({ navigation }) => {

  const [stream, setStream] = useState<MediaStream | null>(null);

  const start = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({ video: true }) // This is a camera feed. If emurator, need a web camera from PC
      setStream(stream);
      console.log(stream);
    } catch (error) {
      console.error("Screen share error:", error);
    }
  };

  const stop = () => {
    console.log('stop');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        {
          stream &&
          <RTCView
            streamURL={stream.toURL()}
            style={styles.stream} />
        }
        <View
          style={styles.footer}>
          <Button
            title="Start"
            onPress={start} />
          <Button
            title="Stop"
            onPress={stop} />
        </View>
      </SafeAreaView>
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

export default JoinScreen;
