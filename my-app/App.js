import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Főoldal from './program';
import Login from './Signin';
import Register from './Register';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="register"
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#0a70ff' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Főoldal}
          options={{
            title: 'Bevásárlólista',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Login}
          options={{
            title: 'Bejelentkezés',
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{
            title: 'Regisztráció',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
