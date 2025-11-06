import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Salvar nome no Firestore
      await setDoc(doc(db, 'usuarios', user.uid), {
        nome,
        email,
      });

      Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
      navigation.navigate('Login' as never);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text>Nome</Text>
      <TextInput value={nome} onChangeText={setNome} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>Senha</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10 }}
      />
      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: '#007bff', padding: 10 }}>
        <Text style={{ color: '#fff', textAlign: 'center' }}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
