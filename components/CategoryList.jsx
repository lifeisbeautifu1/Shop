import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';

const CategoryList = () => {
  const categories = [
    'All',
    'Shirts',
    'Sweaters',
    'Pants',
    'Coats',
    'Coats',
    'Coats',
  ];
  const [selectedIndex, setSelectedIndex] = useState(1);
  return (
    <View>
      <ScrollView horizontal className="my-6 flex-row px-6">
        {categories.map((category, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={index}
            className={`mr-6 ${
              index === selectedIndex && 'border-b pb-1  border-blue-500'
            }`}
            onPress={() => setSelectedIndex(index)}
          >
            <Text
              key={index}
              className={`text-gray-500 font-bold text-[16px] ${
                selectedIndex === index && 'text-blue-500'
              }`}
            >
              {category.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
