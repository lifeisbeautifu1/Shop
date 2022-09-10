import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import React from 'react';

const width = Dimensions.get('screen').width / 2 - 30;

const Card = ({ product, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { product })}
      activeOpacity={0.5}
      className="bg-gray-100 h-[225px] p-4 mb-5 rounded-[10px] mx-1"
      style={{ width }}
    >
      <View className="h-[100px] items-center">
        <Image
          className="h-[150px] w-[100px]"
          style={{ resizeMode: 'contain' }}
          source={{ uri: product.image }}
        />
      </View>
      <Text className="mt-10 font-bold text-[17px]">{product.name}</Text>
      <View className="mt-2 flex-row justify-between">
        <Text className="font-bold text-[19px]">${product.price}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          className="h-[25px] w-[25px] rounded bg-blue-500 items-center justify-center  "
        >
          <Text className="font-bold text-[18px] text-white">+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Card;