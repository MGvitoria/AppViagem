import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { db } from '../firebase';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { Atividade } from '../model/Atividade';
import { Styles, Colors } from '../Style/Styles';

type Props = NativeStackScreenProps<AppStackParamList, 'FormularioAtividade'>;

export function FormularioAtividade({ route, navigation }: Props) {
  const { idViagem, idAtividade, nomeViagem } = route.params;
  const [nome, setNome] = useState('');
  const [detalhes, setDetalhes] = useState('');
  const [data, setData] = useState(new Date()); 
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const estaEditando = !!idAtividade;

  useEffect(() => {
    navigation.setOptions({ title: estaEditando ? 'Editar Atividade' : 'Nova Atividade' });

    if (estaEditando) {
      const buscarAtividade = async () => {
        const refDoc = doc(db, "atividades", idAtividade);
        const snapshotDoc = await getDoc(refDoc);
        if (snapshotDoc.exists()) {
          const dados = snapshotDoc.data();
          const atividade = new Atividade({ ...dados, id: idAtividade });

          setNome(atividade.nome);
          setDetalhes(atividade.detalhes);
          setData(atividade.data); 
        } else {
          Alert.alert("Erro", "Atividade não encontrada.");
          navigation.goBack();
        }
      };
      buscarAtividade();
    }
  }, [idAtividade, estaEditando, navigation]);

  const handleDataChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || data;
    setMostrarDatePicker(Platform.OS === 'ios');
    if (Platform.OS === 'android') {
        setMostrarDatePicker(false);
    }
    setData(currentDate);
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!nome || !detalhes) {
      Alert.alert("Erro", "Nome e detalhes da atividade são obrigatórios.");
      return;
    }

    setLoading(true);

    const novaAtividade = new Atividade({
      idViagem: idViagem,
      nome,
      detalhes,
      data, 
    });

    try {
      if (estaEditando) {
        await updateDoc(doc(db, "atividades", idAtividade), novaAtividade.toFirestore());
        Alert.alert("Sucesso", "Atividade atualizada!");
      } else {
        await addDoc(collection(db, "atividades"), novaAtividade.toFirestore());
        Alert.alert("Sucesso", "Atividade cadastrada!");
      }
      navigation.navigate('ListaAtividades', { idViagem, nomeViagem });
    } catch (error: any) {
      console.error("Erro ao salvar atividade:", error);
      Alert.alert("Erro", estaEditando ? "Falha ao atualizar a atividade." : "Falha ao cadastrar a atividade.");
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
                <Text style={styles.viagemInfo}>Viagem: {nomeViagem}</Text>
                
                <Text style={styles.label}>Nome da Atividade:</Text>
                <TextInput 
                    style={Styles.input} 
                    value={nome} 
                    onChangeText={setNome} 
                    placeholder="Ex: Visita ao Museu"
                    placeholderTextColor={Colors.textSecondary} 
                />

                <Text style={styles.label}>Detalhes (Descrição):</Text>
                <TextInput 
                    style={[Styles.input, styles.areaTexto]} 
                    value={detalhes} 
                    onChangeText={setDetalhes} 
                    placeholder="Ex: Aberto das 10h às 18h. Comprar ingresso online."
                    placeholderTextColor={Colors.textSecondary}
                    multiline
                />

                <Text style={styles.label}>Data da Atividade:</Text>
                <View style={styles.containerDatePicker}>
                    <Text style={styles.textoData}>
                    {data.toLocaleDateString('pt-BR')}
                    </Text>
                    <Button onPress={() => setMostrarDatePicker(true)} title="Alterar Data" color={Colors.secondary} />
                </View>
                {mostrarDatePicker && (
                    <DateTimePicker
                        value={data}
                        mode="date"
                        display="default"
                        onChange={handleDataChange}
                    />
                )}

                <View style={Styles.buttonContainer}>
                    <Button 
                        title={loading ? 'Salvando...' : (estaEditando ? 'Salvar Alterações' : 'Cadastrar Atividade')} 
                        onPress={handleSubmit} 
                        color={Colors.secondary} 
                        disabled={loading}
                    />
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  viagemInfo: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: Colors.text,
  },
  areaTexto: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
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
