import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../../utils/AuthContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignInUI = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
    contentContainerStyle={styles.scrollViewContent}
    extraScrollHeight={20}
    enableOnAndroid={true}
    keyboardShouldPersistTaps="handled"
    >   
        <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button title="Sign In" onPress={handleSignIn} />
        <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('SignUp')}
        />
        </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default SignInUI;