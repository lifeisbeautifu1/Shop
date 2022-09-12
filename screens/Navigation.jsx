import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen, RegistrationScreen, HomeScreen, DetailsScreen } from '.';
import { Loader } from '../components';
import { init } from '../features/auth/auth';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function Navigation() {
  const { initialRouteName } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={globalScreenOptions}
        >
          <Stack.Screen
            options={{ title: 'Login' }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ title: 'Register' }}
            name="Register"
            component={RegistrationScreen}
          />
          <Stack.Screen
            options={{ title: 'Home' }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{ title: 'Details' }}
            name="Details"
            component={DetailsScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
