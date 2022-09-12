// import { View, StyleSheet, KeyboardAvoidingView, Text } from 'react-native';
// import { Button, Input, Image } from '@rneui/base';
// import { StatusBar } from 'expo-status-bar';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// import { init, login, resetErrors } from '../features/auth/auth';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const { user, errors } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(init());
//   }, []);

//   useEffect(() => {
//     if (user) {
//       navigation.replace('Home');
//     }
//   }, [user]);

//   const signIn = () => {
//     dispatch(login({ email, password }));
//   };

//   return (
//     <KeyboardAvoidingView behavior="padding" style={styles.container}>
//       <StatusBar style="light" />
//       <Image
//         source={{
//           uri: 'https://imgur.com/Z2a8bsF.png',
//         }}
//         style={{ width: 150, height: 150, borderRadius: 9999 }}
//       />
//       <View style={styles.inputContainer}>
//         <Input
//           placeholder="Email"
//           value={email}
//           onChangeText={(text) => setEmail(text)}
//           autoFocus
//           type="email"
//         />
//         {errors && errors.email && (
//           <Text style={styles.error}>{errors.email}</Text>
//         )}
//         <Input
//           placeholder="Password"
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//           secureTextEntry
//           type="password"
//         />
//         {errors && errors.password && (
//           <Text style={styles.error}>{errors.password}</Text>
//         )}
//       </View>

//       <Button containerStyle={styles.button} onPress={signIn} title="Login" />
//       <Button
//         onPress={() => navigation.navigate('Register')}
//         containerStyle={styles.button}
//         type="outline"
//         title="Register"
//       />
//       <View style={{ height: 100 }} />
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: 'white',
//   },
//   inputContainer: {
//     width: 300,
//     marginTop: 20,
//   },
//   button: {
//     width: 300,
//     marginTop: 10,
//   },
//   error: {
//     color: 'red',
//     fontWeight: '500',
//     marginBottom: 10,
//     marginLeft: 10,
//   },
// });

// export default LoginScreen;

import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { login, resetError } from '../features/auth/auth';
import { Button, Input, Loader } from '../components';

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { errors, loading, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    user && navigation.navigate('Home');
  }, [user]);

  const handleLogin = () => {
    Keyboard.dismiss();
    dispatch(login(inputs));
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  return (
    <SafeAreaView
      behavior="height"
      style={{ backgroundColor: '#fff', flex: 1 }}
    >
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
