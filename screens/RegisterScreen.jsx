import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { register, resetErrors } from '../features/auth/auth';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { errors } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    });
  }, [navigation]);

  const handleSubmit = () => {
    dispatch(register({ username, email, password, confirmPassword }));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Create L&C Account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Full Name"
          type="text"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoFocus
        />
        {errors && errors.username && (
          <Text style={styles.error}>{errors.username}</Text>
        )}
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        {errors && errors.email && (
          <Text style={styles.error}>{errors.email}</Text>
        )}
        <Input
          placeholder="Password"
          type="password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        {errors && errors.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}
        <Input
          placeholder="Password again"
          type="password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={(text) => setConfirmPassword(text)}
          onSubmitEditing={handleSubmit}
        />
        {errors && errors.confirmPassword && (
          <Text style={styles.error}>{errors.confirmPassword}</Text>
        )}
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Register"
        onPress={handleSubmit}
      />
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
  },
  button: {
    width: 300,
    marginTop: 10,
  },
  error: {
    color: 'red',
    fontWeight: '500',
    marginVertical: 5,
    marginLeft: 10,
  },
});

export default RegisterScreen;
