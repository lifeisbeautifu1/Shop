import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  HomeScreen,
  LoginScreen,
  RegistrationScreen,
  ShoppingCartScreen,
  DetailsScreen2,
} from '../screens';
import { RootStackParamList } from '../interfaces';
import { Loader, Header } from '../components';
import { init } from '../features/auth/auth';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { initialRouteName } = useAppSelector((state) => state.auth);

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(init());
  // }, []);

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <Stack.Navigator initialRouteName={initialRouteName}>
          <Stack.Screen
            name="Login"
            options={{
              header: () => <Header />,
            }}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{
              header: () => <Header />,
            }}
            component={RegistrationScreen}
          />
          <Stack.Screen
            options={{
              header: () => <Header />,
            }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              header: () => <Header />,
            }}
            name="Details"
            component={DetailsScreen2}
          />
          <Stack.Screen
            options={{
              header: () => <Header />,
            }}
            name="ShoppingCart"
            component={ShoppingCartScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
