import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
import { Button, Input, Image } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { init, login, resetErrors } from '../features/auth/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, errors } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  useEffect(() => {
    if (user) {
      navigation.replace('Home');
    }
  }, [user]);

  const signIn = () => {
    dispatch(login({ email, password }));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: 'https://imgur.com/Z2a8bsF.png',
        }}
        style={{ width: 150, height: 150, borderRadius: '100%' }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoFocus
          type="email"
        />
        {errors && errors.email && (
          <Text style={styles.error}>{errors.email}</Text>
        )}
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          type="password"
        />
        {errors && errors.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        onPress={() => navigation.navigate('Register')}
        containerStyle={styles.button}
        type="outline"
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  inputContainer: {
    width: 300,
    marginTop: 20,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default LoginScreen;
