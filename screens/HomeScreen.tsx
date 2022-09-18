import {
  View,
  SafeAreaView,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from '@rneui/base';
import { useEffect, useLayoutEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import { NavigationProps } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/auth';
import { CategoryList, Card } from '../components';
import {
  getProducts,
  getCategories,
  searchProducts,
  setSearchTerm,
  fetchMoreProducts,
  setPage,
  setOrder,
} from '../features/products/products';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const { products, selectedCategory, searchTerm, order, page, loading } =
    useAppSelector((state) => state.products);

  useEffect(() => {
    if (!user) {
      navigation.replace('Login');
    }
  }, [user]);

  useEffect(() => {
    dispatch(searchProducts());
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (page !== 1) dispatch(fetchMoreProducts());
  }, [page]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, []);

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
              title={user && user.username && user.username[0]}
              containerStyle={{ backgroundColor: '#2c6bed' }}
            >
              <Avatar.Accessory size={14} />
            </Avatar>
          </TouchableOpacity>
        </View>
      ),
      // headerRight: () => (
      //   <View
      //     style={{
      //       flexDirection: 'row',
      //       justifyContent: 'center',
      //       width: 40,
      //     }}
      //   >
      //     <TouchableOpacity activeOpacity={0.5}>
      //       <Entypo name="menu" size={28} color="black" />
      //     </TouchableOpacity>
      //   </View>
      // ),
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-row justify-between mt-5 px-5">
        <View>
          <Text className="text-[25px] font-extrabold">Welcome to</Text>
          <Text className="text-[38px] font-extrabold text-blue-500">
            L&C Shop
          </Text>
        </View>
        {/* <TouchableOpacity
          activeOpacity={0.5}
          className="mr-3 flex-1 justify-center items-end"
        >
          <FontAwesome name="shopping-cart" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
      <View className="mt-4 flex-row items-center px-5">
        <View
          style={{ borderRadius: 10 }}
          className="h-[50px] flex-row flex-1 pl-[20px] items-center bg-gray-100"
        >
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChangeText={(text) => dispatch(setSearchTerm(text))}
            className="ml-2 font-bold  text-gray-600 text-[18px] flex-1"
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => dispatch(setOrder(order === 'desc' ? 'asc' : 'desc'))}
          style={{ borderRadius: 4 }}
          className="ml-2 h-[45px] w-[45px] bg-blue-500 justify-center items-center"
        >
          <MaterialCommunityIcons
            name={order === 'desc' ? 'sort-variant' : 'sort-reverse-variant'}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <CategoryList />

      {products.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          className="px-5"
          style={{ flexGrow: 1 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          numColumns={2}
          keyExtractor={(item) => item.id}
          data={products}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (!loading) {
              dispatch(setPage(page + 1));
            }
          }}
          ListFooterComponent={<View>{loading && <ActivityIndicator />}</View>}
          renderItem={({ item }) => <Card product={item} />}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="font-bold text-[20px] text-gray-500">
            No products found
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
