import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoginScreen, RegistrationScreen } from '../screens';
import BottomTabNav from '../routes/BottomTabNav';
import { Loader } from '../components';
import { init } from '../features/auth/auth';

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  // headerStyle: { backgroundColor: '#2c6bed' },
  // headerTitleStyle: { color: 'white' },
  // headerTintColor: 'white',
  // headerShown: false,
};

export default function Navigation() {
  const { initialRouteName } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  return (
    <NavigationContainer
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
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
            options={{ title: 'Tabs', headerShown: false }}
            name="HomeTabs"
            component={BottomTabNav}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
