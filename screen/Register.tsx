import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth, db } from '../firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../App';
import { Usuario } from '../model/Usuario';
import { Styles, Colors } from '../Style/Styles';

type Props = NativeStackScreenProps<AuthStackParamList, 'Registro'>;

export function Register({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [fone, setFone] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDataChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dataNascimento;
    setMostrarDatePicker(Platform.OS === 'ios');
    if (Platform.OS === 'android') {
        setMostrarDatePicker(false);
    }
    setDataNascimento(currentDate);
  };

  const handleRegistro = async () => {
    if (loading) return;
    if (!nome || !email || !senha || senha.length < 6) {
        Alert.alert("Erro", "Preencha todos os campos corretamente (senha min. 6 caracteres).");
        return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      const novoUsuario = new Usuario({
        id: user.uid,
        nome: nome,
        email: email,
        fone: fone,
        dataNascimento: dataNascimento, 
        dataCriacao: new Date(),
      });
      
      // Salvar dados adicionais do usuário no Firestore
      await setDoc(doc(db, "usuarios", user.uid), novoUsuario.toFirestore());

      Alert.alert("Sucesso", "Registro concluído! Faça login para continuar.");
      navigation.navigate('Login');
    } catch (error: any) {
      let errorMessage = "Falha no registro. Tente novamente.";
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = "Este e-mail já está em uso.";
      }
      Alert.alert("Erro de Registro", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
        style={Styles.screenContainer} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={Styles.formCard}>
                <Text style={styles.titulo}>Crie sua Conta</Text>
                
                <TextInput
                    style={Styles.input}
                    placeholder="Nome Completo"
                    placeholderTextColor={Colors.textSecondary}
                    value={nome}
                    onChangeText={setNome}
                />
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
                    placeholder="Telefone (Opcional)"
                    placeholderTextColor={Colors.textSecondary}
                    value={fone}
                    onChangeText={setFone}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={Styles.input}
                    placeholder="Senha (Mín. 6 caracteres)"
                    placeholderTextColor={Colors.textSecondary}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <View style={styles.containerDatePicker}>
                    <Text style={styles.textoData}>
                        Data Nasc.: {dataNascimento.toLocaleDateString('pt-BR')}
                    </Text>
                    <Button onPress={() => setMostrarDatePicker(true)} title="Escolher Data" color={Colors.accent} />
                </View>
                
                {mostrarDatePicker && (
                    <DateTimePicker
                        value={dataNascimento}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        onChange={handleDataChange}
                        maximumDate={new Date()}
                    />
                )}
                
                <View style={Styles.buttonContainer}>
                    <Button 
                        title={loading ? 'Registrando...' : 'Registrar'} 
                        onPress={handleRegistro} 
                        color={Colors.primary}
                        disabled={loading}
                    />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={Styles.linkButton}>Já tem conta? Faça Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: Colors.primary,
  },
  containerDatePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    padding: 10,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.white,
  },
  textoData: {
    fontSize: 16,
    color: Colors.text,
  },
});
