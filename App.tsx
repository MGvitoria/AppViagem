import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; 

// Importações dos componentes
import { Login } from './screen/Login';
import { Register } from './screen/Register';
import { Home } from './screen/Home';
import { Viagem } from './screen/Viagem'; 
import { FormularioViagem } from './screen/FormularioViagem';
import { Atividade } from './screen/Atividade'; 
import { FormularioAtividade } from './screen/FormularioAtividade';
import { commonStyles, colors } from './Style/Styles'; // Importação corrigida

// Definição de Tipos para a Pilha de Autenticação
export type AuthStackParamList = {
  Login: undefined;
  Registro: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

// Definição de Tipos para a Pilha Principal do Aplicativo
export type AppStackParamList = {
  Home: undefined; // Rota principal padronizada como 'Home'
  ListaViagens: undefined;
  FormularioViagem: { idViagem?: string }; 
  ListaAtividades: { idViagem: string, nomeViagem: string }; 
  FormularioAtividade: { idViagem: string, idAtividade?: string }; 
};
const AppStack = createNativeStackNavigator<AppStackParamList>();

function NavegadorAutenticacao() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <AuthStack.Screen name="Registro" component={Register} options={{ title: 'Novo Usuário' }} />
    </AuthStack.Navigator>
  );
}

function NavegadorApp() {
  return (
    <AppStack.Navigator initialRouteName="Home" screenOptions={{ // Mudança para 'Home'
      headerStyle: {
        backgroundColor: colors.primary, // Usando a nova cor primária
      },
      headerTintColor: colors.cardBackground, // Texto do header branco
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <AppStack.Screen name="Home" component={Home} options={{ title: 'Início', headerShown: false }} /> 
      <AppStack.Screen name="ListaViagens" component={Viagem} options={{ title: 'Minhas Viagens' }} />
      <AppStack.Screen name="FormularioViagem" component={FormularioViagem} />
      <AppStack.Screen name="ListaAtividades" component={Atividade} />
      <AppStack.Screen name="FormularioAtividade" component={FormularioAtividade} />
    </AppStack.Navigator>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCarregando(false);
    });
    return unsubscribe;
  }, []);

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {usuario ? <NavegadorApp /> : <NavegadorAutenticacao />}
      {/* Usando a nova cor primária na Status Bar (Android) */}
      <StatusBar style="light" backgroundColor={colors.primary} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  containerCarregando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});