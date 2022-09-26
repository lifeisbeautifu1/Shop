import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TextInput,
  Dimensions,
  Button,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Avatar } from '@rneui/base';
import { useEffect, useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/auth';
import { CategoryList, Card, HomeScreenCard } from '../components';
import {
  getProducts,
  getCategories,
  searchProducts,
  setSearchTerm,
  fetchMoreProducts,
  setPage,
  setOrder,
} from '../features/products/products';

// const width = Dimensions.get('screen').width;

const HomeScreen = () => {
  // const navigation = useNavigation();

  // const dispatch = useAppDispatch();

  const { products, selectedCategory, searchTerm, order, page, loading } =
    useAppSelector((state) => state.products);

  // useEffect(() => {
  //   dispatch(searchProducts());
  // }, [selectedCategory, searchTerm]);

  // useEffect(() => {
  //   if (page !== 1) dispatch(fetchMoreProducts());
  // }, [page]);

  // useEffect(() => {
  //   dispatch(getProducts());
  //   dispatch(getCategories());
  // }, []);

  return (
    <ScrollView className="bg-white" style={{ flex: 1 }}>
      <View className="relative mt-2">
        <View className="absolute w-full h-full z-[10] bg-black/30"></View>
        <Image
          style={{ resizeMode: 'cover', width: '100%', height: 500 }}
          source={{
            uri: 'https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_newnow_0109.jpg?imwidth=1440&imdensity=2',
          }}
        />
        <Text
          style={{
            textTransform: 'uppercase',
            position: 'absolute',
            zIndex: 20,
            fontWeight: '600',
            letterSpacing: 1,
            fontSize: 24,
            top: '42%',
            left: '15%',
            color: 'white',
            fontFamily: 'Raleway-Bold',
          }}
        >
          The Office Etiquette
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          className="bg-white p-3 px-5 z-[20] absolute bottom-10 left-[35%]"
        >
          <Text style={{ fontFamily: 'Raleway-Regular' }}>Узнать больше</Text>
        </TouchableOpacity>
      </View>

      <HomeScreenCard
        title="Coat Time"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_coattime_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Key Trends"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_keytrends_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />

      <HomeScreenCard
        title="Базовые вещи"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_basicos_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Платья и комбинезоны"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_vestidos_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Брюки"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_pantalones_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <HomeScreenCard
        title="Сумки"
        image="https://staticpages.mngbcn.com/homes/images/fw22/she/septiembre/she_landing_bolsos_1909.jpg?imwidth=479&imdensity=2&impolicy=set_13"
      />
      <View
        className="px-4 flex-row flex-wrap gap-4 justify-evenly"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Обслуживание клиентов
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Контактная информация
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Регистрация
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Магазины
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Партнеры
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Работайте в Mango
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Mango Outlet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Site map
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Особые дни
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Raleway-Medium' }}
            className="font-medium text-xs"
          >
            Устойчивое развитие
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center items-center py-4">
        <TouchableOpacity className="mr-4">
          <FontAwesome name="vk" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity className="mr-4">
          <FontAwesome name="facebook" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="twitter" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="instagram" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="pinterest-p" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="spotify" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="youtube-play" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-4">
          <FontAwesome name="foursquare" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="mt-8 mb-8 items-center">
        <Text
          style={{ fontFamily: 'Raleway-Regular' }}
          className="text-gray-400 text-xs"
        >
          &copy; {new Date().getFullYear()} MANGO Все права защищены
        </Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
