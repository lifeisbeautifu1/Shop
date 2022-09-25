import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { Ionicons, Feather, AntDesign } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigation } from '@react-navigation/native';

import { NavigationProps } from '../interfaces';
import { setSearchTerm } from '../features/products/products';

const Header = () => {
  const navigation = useNavigation<NavigationProps>();

  const dispatch = useAppDispatch();

  const { searchTerm } = useAppSelector((state) => state.products);

  return (
    <View>
      <View
        style={{
          height: 100,
          paddingTop: 50,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          //   borderWidth: 1,
          //   borderBottomColor: '#e2e8f0',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 20,
          }}
        >
          <Ionicons name="menu-outline" size={28} color="gray" />
          <Text style={{ fontSize: 12 }}>Меню</Text>
        </TouchableOpacity>
        <Pressable onPress={() => navigation.replace('Home')}>
          <Image
            style={{
              resizeMode: 'contain',
              height: 50,
              width: 100,
            }}
            source={{ uri: 'https://imgur.com/JTcZrZH.png' }}
          />
        </Pressable>
        <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 'auto' }}>
          <Feather name="user" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View className="w-full h-[1px] bg-gray-200 my-2"></View>
      <View
        style={{
          height: 40,
          paddingHorizontal: 20,
          paddingBottom: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{ borderRadius: 10 }}
          className="flex-row w-4/5 h-full pl-2 items-center bg-gray-100/90"
        >
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            placeholder="Искать"
            value={searchTerm}
            onChangeText={(text) => dispatch(setSearchTerm(text))}
            className="ml-2 font-semibold  text-gray-600 text-[16px] flex-1"
          />
        </View>
        <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 'auto' }}>
          <Ionicons name="filter-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
