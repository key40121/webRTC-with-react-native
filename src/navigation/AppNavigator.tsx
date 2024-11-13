import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import JoinScreen from '../screens/JoinScreen';
import CaptureScreen from '../screens/CaptureScreen';
import SocketConnectScreen from '../screens/socketConnectScreen';

// Stack Navigator の型定義
export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Join: undefined;
  Capture: undefined;
  Socket: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />
        <Stack.Screen name="Capture" component={CaptureScreen} />
        <Stack.Screen name="Socket" component={SocketConnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
