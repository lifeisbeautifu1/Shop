import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IProduct } from '../interfaces';

const width = Dimensions.get('screen').width / 2 - 30;

interface CardProps {
  product: IProduct;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate('Details', { product })}
      activeOpacity={0.5}
      className="bg-gray-100 h-[225px] p-4 mb-5  mx-1"
      style={{ width, borderRadius: 10 }}
    >
      <View className="h-[100px] items-center">
        <Image
          className="h-[150px] w-[100px]"
          style={{ resizeMode: 'contain' }}
          source={{ uri: product.image }}
        />
      </View>
      <Text className="mt-12 font-bold text-[17px]">{product.title}</Text>
      <View className="mt-1 flex-row justify-between">
        <Text className="font-bold text-[19px]">${product.price}</Text>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ borderRadius: 4 }}
          className="h-[25px] w-[25px] bg-blue-500 items-center justify-center  "
        >
          <Text className="font-bold text-[18px] text-white">+</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
