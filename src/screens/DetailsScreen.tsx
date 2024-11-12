import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext } from '../contexts/AppContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type DetailsScreenProps = StackScreenProps<RootStackParamList, 'Details'>;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation }) => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("AppContext is undefined. Make sure AppProvider is added.");
  }

  const { state, setState } = appContext;

  return (
    <View>
      <Text>State in Details: {state}</Text>
      <Button title="Update State" onPress={() => setState("Updated State from Details")} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default DetailsScreen;
