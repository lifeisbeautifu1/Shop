import { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useDispatch, useSelector } from 'react-redux';

import { register, resetError } from '../features/auth/auth';
import { Button, Input, Loader } from '../components';

const RegistrationScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const headerHeight = useHeaderHeight();

  const { errors, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleRegister = () => {
    Keyboard.dismiss();
    dispatch(register(inputs));
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ backgroundColor: '#fff', flex: 1 }}
    >
      <Loader visible={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: '#000', fontSize: 40, fontWeight: 'bold' }}>
          Register
        </Text>
        <Text style={{ color: '#BABBC3', fontSize: 18, marginVertical: 10 }}>
          Enter Your Details to Register
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
            onChangeText={(text) => handleOnchange(text, 'username')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'username' }))
            }
            iconName="account-outline"
            label="Full Name"
            placeholder="Enter your full name"
            error={errors.username}
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
          <Input
            onChangeText={(text) => handleOnchange(text, 'confirmPassword')}
            onFocus={() =>
              dispatch(resetError({ error: null, input: 'confirmPassword' }))
            }
            iconName="lock-outline"
            label="Password again"
            placeholder="Confirm password"
            error={errors.confirmPassword}
            password
          />
          <Button title="Register" onPress={handleRegister} />
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#000',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}
          >
            Already have account ? Login
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationScreen;
