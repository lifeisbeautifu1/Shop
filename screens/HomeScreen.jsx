import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from '@rneui/base';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { logout } from '../features/auth/auth';
import { CategoryList, Card } from '../components';
import products from '../products.json';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user]);

  const signOutUser = () => {
    dispatch(logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerShadowVisible: true, // applied here

      headerLeft: () => (
        <View>
          <TouchableOpacity onPress={signOutUser}>
            <Avatar
              rounded
              source={{
                uri: 'https://st4.depositphotos.com/9998432/23259/v/600/depositphotos_232591962-stock-illustration-person-gray-photo-placeholder-man.jpg',
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 40,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Entypo name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between mt-5 px-5">
        <View>
          <Text className="text-[25px] font-extrabold">Welcome to</Text>
          <Text className="text-[38px] font-extrabold text-blue-500">
            L&C Shop
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          className="mr-3 flex-1 justify-center items-end"
        >
          <FontAwesome name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mt-4 flex-row px-5">
        <View className="h-[50px] flex-row flex-1 pl-[20px] items-center bg-gray-100 rounded-lg">
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            autoFocus
            placeholder="Search"
            className="ml-2 font-bold shadow-inner text-gray-600 text-[18px] flex-1"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          className="ml-2 h-[50px] w-[50px] bg-blue-500 rounded-[10px] justify-center items-center"
        >
          <MaterialIcons name="sort" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <CategoryList />
      <FlatList
        className="px-5"
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        data={products.products}
        renderItem={({ item }) => (
          <Card navigation={navigation} product={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
