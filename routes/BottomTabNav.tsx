import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { AddressScreen, ShoppingCartScreen } from '../screens';
import HomeStack from './HomeStack';
import ShoppingCartStack from './ShoppingCartStack';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
        name="HomeStack"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          title: 'Offers',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tags" size={24} color={color} />
          ),
        }}
        name="More"
        component={AddressScreen}
      />
      <Tab.Screen
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cart" size={24} color={color} />
          ),
        }}
        name="ShoppingCartStack"
        component={ShoppingCartStack}
      />
      <Tab.Screen
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={24} color={color} />
          ),
        }}
        name="Profile"
        component={AddressScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
