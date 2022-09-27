import {
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setIsFilterOpen, setOrder } from '../features/products/products';
import { TouchableOpacity } from 'react-native-gesture-handler';

const toggleAnimation = {
  duration: 300,
  update: {
    duration: 300,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },
};

const Filter = () => {
  const { width, height } = useWindowDimensions();

  const { isFilterOpen, order } = useAppSelector((state) => state.products);

  const [showModal, setShowModal] = useState(isFilterOpen);

  const [showOrder, setShowOrder] = useState(false);

  const [showSizes, setShowSizes] = useState(false);

  const [showColors, setShowColors] = useState(false);

  const animationController = useRef(new Animated.Value(0)).current;

  const animationControllerForSizes = useRef(new Animated.Value(0)).current;

  const animationControllerForColors = useRef(new Animated.Value(0)).current;

  const scaleValue = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    if (isFilterOpen) {
      // spring
      Animated.timing(scaleValue, {
        duration: 400,
        toValue: 1,
        useNativeDriver: true,
      }).start();
      setShowModal(true);
    } else {
      setTimeout(() => setShowModal(false), 400);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleModal();
  }, [isFilterOpen]);

  const toggleOrder = () => {
    const config = {
      duration: 300,
      toValue: showOrder ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationController, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowColors(false);
    setShowSizes(false);
    setShowOrder(!showOrder);
  };

  const toggleSizes = () => {
    const config = {
      duration: 300,
      toValue: showSizes ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationControllerForSizes, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowOrder(false);
    setShowColors(false);
    setShowSizes(!showSizes);
  };

  const toggleColors = () => {
    const config = {
      duration: 300,
      toValue: showSizes ? 0 : 1,
      useNativeDriver: true,
    };
    Animated.timing(animationControllerForColors, config).start();
    LayoutAnimation.configureNext(toggleAnimation);
    setShowOrder(false);
    setShowSizes(false);
    setShowColors(!showColors);
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const arrowTransformForSizes = animationControllerForSizes.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const arrowTransformForColors = animationControllerForSizes.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const dispatch = useAppDispatch();
  return (
    showModal && (
      <View style={[style.container, { height, width }]}>
        <Animated.View
          style={[
            style.loader,
            { height, width },
            {
              opacity: scaleValue,
            },
            // { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View className=" items-center relative pb-4 border-b border-gray-300">
            <Text
              className="text-[#333] text-[16px]"
              style={{ fontFamily: 'Raleway-Bold' }}
            >
              Отфильтровать и упорядочить
            </Text>
            <View className="absolute top-0 right-4">
              <TouchableOpacity
                onPress={() => dispatch(setIsFilterOpen(false))}
              >
                <EvilIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }} className="justify-between w-full">
            <View>
              <View className="border-b border-gray-300 mt-6 mx-4 overflow-hidden">
                <TouchableOpacity className="mb-4" onPress={toggleOrder}>
                  <View className="flex-row justify-between">
                    <Text
                      className="text-[16px]"
                      style={{ fontFamily: 'Raleway-Regular' }}
                    >
                      Упорядочить по
                    </Text>
                    <Animated.View
                      style={{ transform: [{ rotateZ: arrowTransform }] }}
                    >
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="#333"
                      />
                    </Animated.View>
                  </View>
                  <View>
                    <Text
                      className="text-[16px]"
                      style={{ fontFamily: 'Raleway-Regular' }}
                    >
                      {order === 'asc'
                        ? 'Цена по возрастанию'
                        : 'Цена по убыванию'}
                    </Text>
                  </View>
                </TouchableOpacity>
                {showOrder && (
                  <View>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="relative w-4 h-4 rounded-full border border-[#333]">
                        {order === 'rec' && (
                          <View className="w-3 h-3 absolute top-[1px] left-[1px] rounded-full bg-[#444]"></View>
                        )}
                      </TouchableOpacity>
                      <Text
                        className="text-[16px]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Рекомендуемые
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(setOrder('asc'))}
                      className="mb-4 flex-row gap-4 items-center"
                    >
                      <TouchableOpacity
                        onPress={() => dispatch(setOrder('asc'))}
                        className="w-4 h-4 relative rounded-full border border-[#333] "
                      >
                        {order === 'asc' && (
                          <View className="w-3 h-3 absolute top-[1px] left-[1px] rounded-full bg-[#444]"></View>
                        )}
                      </TouchableOpacity>
                      <Text
                        className="text-[16px]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Цена по возрастанию
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(setOrder('desc'))}
                      className="mb-4 flex-row gap-4 items-center"
                    >
                      <TouchableOpacity
                        onPress={() => dispatch(setOrder('desc'))}
                        style={{ width: 16, height: 16 }}
                        className=" relative rounded-full border border-[#333]  "
                      >
                        {order === 'desc' && (
                          <View className="w-3 h-3 absolute top-[1px] left-[1px] rounded-full bg-[#444]"></View>
                        )}
                      </TouchableOpacity>
                      <Text
                        className="text-[16px]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Цена по убыванию
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View className="border-b border-gray-300 my-6 mx-4 overflow-hidden">
                <TouchableOpacity className="mb-4" onPress={toggleSizes}>
                  <View className="flex-row justify-between">
                    <Text
                      className="text-[16px]"
                      style={{ fontFamily: 'Raleway-Regular' }}
                    >
                      Размер
                    </Text>
                    <Animated.View
                      style={{
                        transform: [{ rotateZ: arrowTransformForSizes }],
                      }}
                    >
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="#333"
                      />
                    </Animated.View>
                  </View>
                </TouchableOpacity>
                {showSizes && (
                  <View>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="relative w-4 h-4  border border-[#333]">
                        <View className="w-3 h-3 absolute top-[1px] left-[1px]  bg-[#444]"></View>
                      </TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Все размеры
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="relative w-4 h-4  border border-[#333]"></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        XS
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="w-4 h-4 relative  border border-[#333] "></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        S
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        M
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        L
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        XL
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        XXL
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View className="border-b border-gray-300 mx-4 overflow-hidden">
                <TouchableOpacity className="mb-4" onPress={toggleColors}>
                  <View className="flex-row justify-between">
                    <Text
                      className="text-[16px]"
                      style={{ fontFamily: 'Raleway-Regular' }}
                    >
                      Цвета
                    </Text>
                    <Animated.View
                      style={{
                        transform: [{ rotateZ: arrowTransformForColors }],
                      }}
                    >
                      <Entypo
                        name="chevron-small-down"
                        size={24}
                        color="#333"
                      />
                    </Animated.View>
                  </View>
                </TouchableOpacity>
                {showColors && (
                  <View>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="relative w-4 h-4  border border-[#333]">
                        <View className="w-3 h-3 absolute top-[1px] left-[1px]  bg-[#444]"></View>
                      </TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Все цвета
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="relative w-4 h-4  border border-[#333]"></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Черные
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity className="w-4 h-4 relative  border border-[#333] "></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Красные
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Белые
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Серые
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Синии
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Бежевые
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Зеленые
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Розовые
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="mb-4 flex-row gap-4 items-center">
                      <TouchableOpacity
                        style={{ width: 16, height: 16 }}
                        className=" relative  border border-[#333]  "
                      ></TouchableOpacity>
                      <Text
                        className="text-[16px] text-[#555]"
                        style={{ fontFamily: 'Raleway-Regular' }}
                      >
                        Фиолетовые
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            <View
              className="justify-evenly"
              style={{ flexDirection: 'row', marginBottom: 40 }}
            >
              <TouchableOpacity className=" py-3 px-5 w-full border border-gray-300 items-center">
                <Text style={{ fontFamily: 'Raleway-Medium' }}>
                  Удалить фильтры
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(setIsFilterOpen(false))}
                className="py-3 px-5 w-full border bg-[#333] items-center"
              >
                <Text
                  style={{ fontFamily: 'Raleway-Medium' }}
                  className="text-white"
                >
                  Применить фильтры
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingTop: 80,
    zIndex: 10,
  },
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    letf: 0,
    zIndex: 1,
  },
});

export default Filter;
