import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingCartScreen, AddressScreen } from '../screens';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: 'Shopping Cart', headerShown: false }}
        name="ShoppingCart"
        component={ShoppingCartScreen}
      />
      <Stack.Screen
        options={{ title: 'Address Details' }}
        name="Address"
        component={AddressScreen}
      />
    </Stack.Navigator>
  );
};

export default Router;
