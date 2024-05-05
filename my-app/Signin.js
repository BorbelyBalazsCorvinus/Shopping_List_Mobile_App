import { StatusBar } from 'expo-status-bar';
import React, { createContext, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from 'react-native';
import supabase from './lib/supabase-client';
import { useNavigation } from '@react-navigation/native';

const SessionContext = createContext(null);

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Hiba', error.message);
    }
  };

  return (
    <SessionContext.Provider value={null}>
      <View style={styles.container}>
        <Text style={styles.title}>Írd be az adataidat!</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Jelszó"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Bejelentkezés</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('./assets/shopping_list.png')} style={styles.image}/>
        <StatusBar style="auto" />
      </View>
    </SessionContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5b6e8a',
    alignItems: 'center',
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  image:{
    width: 270,
    height: 330,
    marginLeft: 50,
    marginTop:'auto',
    marginBottom:'auto'
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: '#0a70ff',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
