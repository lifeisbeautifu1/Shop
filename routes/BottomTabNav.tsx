import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import { ShoppingCartScreen } from '../screens';
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
          title: 'Cart',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="shopping-cart" size={24} color={color} />
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
        component={ShoppingCartScreen}
      />
      <Tab.Screen
        options={{
          title: 'Menu',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-menu" size={30} color={color} />
          ),
        }}
        name="More"
        component={ShoppingCartScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
