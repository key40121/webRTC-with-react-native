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

type CaptureScreenProps = StackScreenProps<RootStackParamList, 'Join'>;

const CaptureScreen: React.FC<CaptureScreenProps> = ({ navigation }) => {

  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCapturing = async () => {
    try {
      const stream = await mediaDevices.getDisplayMedia();
      setStream(stream);
      console.log(stream);
    } catch (error) {
      console.error("Capture screen error:", error);
    }

    // const mediaRecorder = new MediaRecorder(stream); // This is not implemented in react-native-webrtc
  }

  const stopCapturing = () => {
    console.log("stop capturing");
    if (stream) {
      stream.release();
      setStream(null);
    }
  }

  const playCapturing = () => {
    console.log("Play capturing");

  }

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
            title="Start capture"
            onPress={startCapturing} />
          <Button
            title="Stop capture"
            onPress={stopCapturing} />
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

export default CaptureScreen;
