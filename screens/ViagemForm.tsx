import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { colors } from '../theme';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ViagemForm() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const viagemEdit = route.params?.viagem;

  const [destino, setDestino] = useState(viagemEdit?.destino || '');
  const [dataIda, setDataIda] = useState(viagemEdit?.dataIda || '');
  const [dataVolta, setDataVolta] = useState(viagemEdit?.dataVolta || '');
  const [orcamento, setOrcamento] = useState(viagemEdit?.orcamento || '');
  const [transporte, setTransporte] = useState(viagemEdit?.transporte || '');
  const [hospedagem, setHospedagem] = useState(viagemEdit?.hospedagem || '');

  async function salvar() {
    try {
      if (viagemEdit) {
        await updateDoc(doc(db, 'viagens', viagemEdit.id), {
          destino,
          dataIda,
          dataVolta,
          orcamento,
          transporte,
          hospedagem,
        });
        Alert.alert('Sucesso', 'Viagem atualizada!');
      } else {
        await addDoc(collection(db, 'viagens'), {
          destino,
          dataIda,
          dataVolta,
          orcamento,
          transporte,
          hospedagem,
        });
        Alert.alert('Sucesso', 'Viagem cadastrada!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar a viagem.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{viagemEdit ? 'Editar Viagem' : 'Nova Viagem'}</Text>

      <TextInput style={styles.input} placeholder="Destino" value={destino} onChangeText={setDestino} />
      <TextInput style={styles.input} placeholder="Data de ida (dd/mm/aaaa)" value={dataIda} onChangeText={setDataIda} />
      <TextInput style={styles.input} placeholder="Data de volta (dd/mm/aaaa)" value={dataVolta} onChangeText={setDataVolta} />
      <TextInput style={styles.input} placeholder="Orçamento (R$)" value={orcamento} onChangeText={setOrcamento} />
      <TextInput style={styles.input} placeholder="Transporte" value={transporte} onChangeText={setTransporte} />
      <TextInput style={styles.input} placeholder="Hospedagem" value={hospedagem} onChangeText={setHospedagem} />

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={styles.buttonText}>{viagemEdit ? 'Salvar Alterações' : 'Cadastrar Viagem'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 26,
    color: colors.textDark,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
