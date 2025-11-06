import { StyleSheet, Text, View } from 'react-native';

import Login from './screens/Login';
import Register from './screens/Register';
import Menu from './screens/Menu';
import HospedagemList from './screens/HospedagemList'; //
import Sobre from './screens/Sobre'; //
import ViagemList from './screens/ViagensList'; //
import ViagemForm from './screens/ViagemForm'; //

import { NavigationContainer } from '@react-navigation/native'; // useNavigation removido
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import * as SecureStore from 'expo-secure-store'; // Lógica SecureStore removida
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  // Lógica SecureStore/getUser removida por ser incompleta e desnecessária para o fluxo inicial de navegação.
  /*
  useEffect( () => {
    getUser();
  })

  async function getUser() {
    let storageEmail = await SecureStore.getItemAsync('email');
    let storageSenha = await SecureStore.getItemAsync('senha');  
  }
  */

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Login'  component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }}/>
        <Stack.Screen name='Menu'   component={Menu} options={{ headerShown: false }}/>
        {/* Adicionado as telas que estavam faltando na navegação: */}
        <Stack.Screen name='ViagemList' component={ViagemList} options={{ title: 'Minhas Viagens' }} />
        <Stack.Screen name='ViagemForm' component={ViagemForm} options={{ title: 'Detalhes da Viagem' }} />
        <Stack.Screen name='HospedagemList' component={HospedagemList} options={{ title: 'Hospedagens' }} />
        <Stack.Screen name='Sobre' component={Sobre} options={{ title: 'Sobre' }}/>
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