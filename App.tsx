import { StyleSheet, Text, View } from 'react-native';

import Login from './screens/Login';
import Register from './screens/Register';
import Menu from './screens/Menu';


import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect( () => {
    getUser();
  })

  async function getUser() {
    let storageEmail = await SecureStore.getItemAsync('email');
    let storageSenha = await SecureStore.getItemAsync('senha');  
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login'  component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name='Menu'   component={Menu} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
