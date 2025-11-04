import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { Styles, Colors } from '../Style/Styles'; // Importa estilos e cores

type Props = NativeStackScreenProps<AppStackParamList, 'Inicio'>;

export function Home({ navigation }: Props) {
  const emailUsuario = auth.currentUser?.email || 'Usuário Não Identificado';

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error: any) {
      console.error("Erro ao Sair:", error);
      Alert.alert("Erro", "Não foi possível sair da conta.");
    }
  };

  return (
    <View style={Styles.contentCenter}>
      <View style={Styles.formCard}> 
        <Text style={styles.titulo}>Bem-vindo(a)!</Text>
        <Text style={styles.subtitulo}>{emailUsuario}</Text>
        
        <TouchableOpacity 
          style={styles.botaoPrincipal}
          onPress={() => navigation.navigate('ListaViagens')} 
        >
          <Text style={styles.textoBotaoPrincipal}>Gerenciar Minhas Viagens</Text>
        </TouchableOpacity>

        <View style={styles.containerBotaoSair}>
          <Button title="Sair" onPress={handleLogout} color={Colors.danger} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.text,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 40,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  botaoPrincipal: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    marginTop: 10,
  },
  textoBotaoPrincipal: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerBotaoSair: {
    width: '100%',
    marginTop: 30,
    borderRadius: 8,
    overflow: 'hidden',
  }
});
