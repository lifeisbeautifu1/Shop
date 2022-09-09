import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './app/store';
import axios from 'axios';

import { LoginScreen, RegisterScreen, HomeScreen } from './screens';

axios.defaults.baseURL = 'https://project-landc.herokuapp.com/api';
axios.defaults.withCredentials = true;

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: '#2c6bed' },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            options={{ title: 'Login' }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ title: 'Register' }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{ title: 'Home' }}
            name="Home"
            component={HomeScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
