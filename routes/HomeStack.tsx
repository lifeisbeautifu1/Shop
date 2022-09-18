import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen, DetailsScreen } from '../screens';
import { HomeStackParamList } from '../interfaces';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const Router = () => {
  return (
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
        name="Home"
      >
        {() => <HomeScreen />}
      </Stack.Screen>
      <Stack.Screen
        options={{ title: 'Details' }}
        name="Details"
        component={DetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default Router;
