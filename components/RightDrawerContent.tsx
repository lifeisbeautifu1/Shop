import { View, Text, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import {
  Feather,
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/auth/auth';

const LeftDrawerContent = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    // @ts-ignore
    navigation.navigate('Home');
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView style={{ marginTop: 20 }}>
        <View className="gap-4 pt-8 pl-8  ">
          <TouchableOpacity
            className="flex-row items-center"
            // @ts-ignore
            onPress={() => navigation.navigate('Profile')}
          >
            <Feather name="user" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Профиль
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <SimpleLineIcons name="bag" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Мои покупки
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center">
            <FontAwesome name="heart-o" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Избранное
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLogout}
            className="flex-row items-center"
          >
            <MaterialIcons name="logout" size={16} color="gray" />
            <Text
              className="ml-2 text-gray-700 text-[16px]"
              style={{ fontFamily: 'Raleway-Regular' }}
            >
              Выход
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default LeftDrawerContent;
