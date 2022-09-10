import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useLayoutEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Rating, ImageCarousel } from '../components';

const DetailsScreen = ({ route, navigation }) => {
  const product = route.params.product;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#fff' },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
      headerBackTitle: 'Back',
      title: product.name,
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            width: 40,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);
  const images = [
    'https://imgur.com/uR9bAlO.png',
    'https://imgur.com/j3W195r.png',
    'https://i.imgur.com/11hxAch.png',
    'https://imgur.com/GgZO9Tj.png',
  ];
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* <View className="flex-[0.45] mt-5 justify-center items-center">
        <Image
          style={{
            resizeMode: 'contain',
            flex: 1,
            height: '100%',
            width: '100%',
          }}
          source={{ uri: product.image }}
        />
      </View> */}
      <ImageCarousel images={images} />
      <View
        style={{ borderRadius: 20 }}
        className="flex-[0.55] bg-gray-100  mx-2 mt-5 pt-[30px]"
      >
        <View className="flex-row ml-5 items-end">
          <View className="w-[25px] h-[2px] bg-black mb-1 mr-2"></View>
          <Text className="text-[18px] font-bold">Best Choice</Text>
        </View>
        <View className="mt-5 ml-5 flex-row justify-between items-center">
          <Text className="text-[22px] font-bold">{product.name}</Text>
          <View
            style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
            className="w-[80px] h-[40px] bg-blue-500  justify-center items-center"
          >
            <Text className="font-bold text-white">${product.price}</Text>
          </View>
        </View>
        <View className="px-5 mt-[10px]">
          <Text className="font-bold text-[20px]">Description</Text>
          <Text className="mt-4 text-[16px] text-gray-500 leading-[22px]">
            {product.description}
          </Text>
          <Rating rating={product.rating} />

          <View className="flex-row justify-between mt-2">
            <View className="items-center flex-row">
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ borderRadius: 4 }}
                className="w-[60px] h-[40px] justify-center items-center  border border-gray-500"
              >
                <Text className="font-medium text-[28px]">-</Text>
              </TouchableOpacity>
              <Text className="mx-4 font-bold text-[20px]">1</Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ borderRadius: 4 }}
                className="w-[60px] h-[40px] justify-center items-center border border-gray-500"
              >
                <Text className="font-medium text-[28px]">+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ borderRadius: 30 }}
              className="w-[150px] h-[50px]  bg-blue-500 items-center justify-center"
            >
              <Text className="font-bold text-[18px] text-white">Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailsScreen;
