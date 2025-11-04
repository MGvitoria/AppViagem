import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../App';
import { Styles, Colors } from '../Style/Styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    try {
      if (!email || !senha) {
        Alert.alert("Erro", "Preencha e-mail e senha para entrar.");
        return;
      }
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
    } catch (error: any) {
      Alert.alert("Erro de Login", "Falha ao entrar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={Styles.contentCenter}>
      <View style={Styles.formCard}>
        <Text style={styles.titulo}>Planejador de Viagens</Text>
        <TextInput
          style={Styles.input}
          placeholder="E-mail"
          placeholderTextColor={Colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={Styles.input}
          placeholder="Senha"
          placeholderTextColor={Colors.textSecondary}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
        />
        <View style={Styles.buttonContainer}>
          <Button 
            title={loading ? "Entrando..." : "Entrar"} 
            onPress={handleLogin} 
            color={Colors.primary} 
            disabled={loading}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
          <Text style={Styles.linkButton}>Não tem conta? Registre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: Colors.primary,
  },
});
