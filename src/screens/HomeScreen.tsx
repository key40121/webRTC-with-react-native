import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import type { StackScreenProps } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("AppContext is undefined. Make sure AppProvider is added.");
  }

  const { state, setState } = appContext;

  return (
    <View>
      <Button title="Start Screen Sharing" onPress={() => console.log("Start")} />
      <Text>Current State: {state}</Text>
      <Text>Hello</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      <Button title="Test video share" onPress={() => navigation.navigate('Join')} />
      <Button title="Test capturing screen" onPress={() => navigation.navigate('Capture')} />
      <Button title="Update State" onPress={() => setState("Updated State from Home")} />
    </View>
  );
};

export default HomeScreen;
