import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export interface IProduct {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  brand: string;
  count_in_stock: number;
  price: number;
  rating: number;
  image: string;
  images: string[];
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  image_url: string;
  is_admin: boolean;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ShoppingCart: undefined;
  Details: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Details: { product: IProduct };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export type HomeNavigationProps = NativeStackNavigationProp<HomeStackParamList>;

export type Props = NativeStackScreenProps<HomeStackParamList, 'Details'>;

export type DetailsScreenNavigationProp = Props['navigation'];

export type DetailsScreenRouteProp = Props['route'];
