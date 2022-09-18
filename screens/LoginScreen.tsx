import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';


import { NavigationProps } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { login, resetError } from '../features/auth/auth';
import { Button, Input, Loader } from '../components';

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { errors, loading, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    user && navigation.navigate('HomeTabs');
  }, [user]);

  const handleLogin = () => {
    Keyboard.dismiss();
    dispatch(login(inputs));
  };

  const handleOnchange = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#fff', flex: 1 }}>
      <StatusBar style="dark" />
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: '#000', fontSize: 40, fontWeight: 'bold' }}>
          Login
        </Text>
        <Text style={{ color: '#BABBC3', fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Login
        </Text>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={(text) => handleOnchange(text, 'email')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'email' }))
            }
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />

          <Input
            onChangeText={(text) => handleOnchange(text, 'password')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'password' }))
            }
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />

          <Button title="Login" onPress={handleLogin} />
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Don't have an account ? Register
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
