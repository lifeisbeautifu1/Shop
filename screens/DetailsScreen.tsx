import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Alert,
} from 'react-native';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAppDispatch } from '../app/hooks';
import { addProduct } from '../features/cart/cart';
// import { HomeNavigationProps, DetailsScreenRouteProp } from '../interfaces';

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // @ts-ignore
  const product = route.params.product;
  const width = Dimensions.get('window').width;

  const dispatch = useAppDispatch();

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  const addToCart = async () => {
    Alert.alert('Success', `${product.title} successfully added to cart.`);
    dispatch(addProduct(product));
    // @ts-ignore
    navigation.navigate('Home');
  };

  //product horizontal scroll product card
  const renderProduct = ({ item, index }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        position: 'relative',
      }}
    >
      <StatusBar backgroundColor="#f0f0f3" barStyle="dark-content" />
      <ScrollView style={{ marginBottom: 40 }}>
        <View
          style={{
            width: '100%',
            backgroundColor: '#f0f0f3',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            paddingTop: 64,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 50,
              left: 0,
              zIndex: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity onPress={() => {}}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: '#777',
                  padding: 12,
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.images ? product.images : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {product.images
              ? product.images.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: '#000',
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: '#0043f9',
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#000',
              }}
            >
              Shopping
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: '#000',
                maxWidth: '84%',
              }}
            >
              {product.title}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: '#0043f9',
                backgroundColor: '#0043f9' + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
              fontWeight: '400',
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: '85%',
              maxHeight: 44,
              marginBottom: 18,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 14,
              borderBottomColor: '#f0f0f3',
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  backgroundColor: '#f0f0f3',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: '#0043f9',
                  }}
                />
              </View>
              <Text> Rustaveli Ave 57,{'\n'}17-001, Batume</Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 22,
                color: '#777',
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: '#000',
                marginBottom: 4,
              }}
            >
              $ {product.price}.00
            </Text>
            <Text>
              Tax Rate 2%~ ${product.price / 50} ($
              {product.price + product.price / 50})
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity
          onPress={addToCart}
          style={{
            width: '86%',
            height: '90%',
            backgroundColor: '#0043f9',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: '#fff',
              textTransform: 'uppercase',
            }}
          >
            Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DetailsScreen;
