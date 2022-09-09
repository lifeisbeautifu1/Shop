import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLayoutEffect } from 'react';

const HomeScreen = ({ navigator }) => {
  useLayoutEffect(() => {});
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View>
        <Text style={styles.text}>Coming soon™</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
});

export default HomeScreen;
