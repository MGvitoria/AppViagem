import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Platform, ScrollView } from 'react-native';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, addDoc, updateDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { Viagem } from '../model/Viagem';
import { Styles, Colors } from '../Style/Styles';

type Props = NativeStackScreenProps<AppStackParamList, 'FormularioViagem'>;

export function FormularioViagem({ route, navigation }: Props) {
  const { idViagem } = route.params;
  const [nome, setNome] = useState('');
  const [destino, setDestino] = useState('');
  const [dataInicio, setDataInicio] = useState(new Date()); 
  const [dataFim, setDataFim] = useState(new Date());      
  const [mostrarDatePickerInicio, setMostrarDatePickerInicio] = useState(false);
  const [mostrarDatePickerFim, setMostrarDatePickerFim] = useState(false);
  const [loading, setLoading] = useState(false);
  const estaEditando = !!idViagem;

  useEffect(() => {
    navigation.setOptions({ title: estaEditando ? 'Editar Viagem' : 'Nova Viagem' });
    if (estaEditando && auth.currentUser?.uid) {
      const buscarViagem = async () => {
        const refDoc = doc(db, "viagens", idViagem);
        const snapshotDoc = await getDoc(refDoc);
        if (snapshotDoc.exists()) {
          const dados = snapshotDoc.data();
          const viagem = new Viagem({ ...dados, id: idViagem });

          setNome(viagem.nome);
          setDestino(viagem.destino);
          setDataInicio(viagem.dataInicio);
          setDataFim(viagem.dataFim);
        } else {
          Alert.alert("Erro", "Viagem não encontrada.");
          navigation.goBack();
        }
      };
      buscarViagem();
    }
  }, [idViagem, estaEditando, navigation]);

  const handleDataChange = (tipo: 'inicio' | 'fim', event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || (tipo === 'inicio' ? dataInicio : dataFim);
    
    if (tipo === 'inicio') {
      setMostrarDatePickerInicio(Platform.OS === 'ios');
      setDataInicio(currentDate);
    } else {
      setMostrarDatePickerFim(Platform.OS === 'ios');
      setDataFim(currentDate);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!nome || !destino) {
      Alert.alert("Erro", "Nome e destino são obrigatórios.");
      return;
    }

    const inicio = dataInicio instanceof Date ? dataInicio : new Date(dataInicio);
    const fim = dataFim instanceof Date ? dataFim : new Date(dataFim);

    if (inicio > fim) {
      Alert.alert("Erro", "A data de início não pode ser posterior à data final.");
      return;
    }
    
    setLoading(true);

    const novaViagem = new Viagem({
      idUsuario: auth.currentUser!.uid,
      nome,
      destino,
      dataInicio: inicio, 
      dataFim: fim,    
    });

    try {
      if (estaEditando) {
        await updateDoc(doc(db, "viagens", idViagem), novaViagem.toFirestore());
        Alert.alert("Sucesso", "Viagem atualizada com sucesso!");
      } else {
        await addDoc(collection(db, "viagens"), novaViagem.toFirestore());
        Alert.alert("Sucesso", "Viagem cadastrada com sucesso!");
      }
      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao salvar viagem:", error);
      Alert.alert("Erro", estaEditando ? "Falha ao atualizar a viagem." : "Falha ao cadastrar a viagem.");
    } finally {
        setLoading(false);
    }
  };

  const renderDatePicker = (value: Date, setter: (val: boolean) => void, type: 'inicio' | 'fim', show: boolean) => (
    <View style={styles.containerDatePicker}>
        <Text style={styles.textoData}>
            {value.toLocaleDateString('pt-BR')}
        </Text>
        <Button onPress={() => setter(true)} title="Alterar Data" color={Colors.secondary} />
        {show && (
            <DateTimePicker
                value={value}
                mode="date"
                display="default"
                onChange={(event, date) => handleDataChange(type, event, date)}
                minimumDate={type === 'fim' ? dataInicio : undefined}
            />
        )}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={Styles.screenContainer}>
        <View style={Styles.formCard}>
            <Text style={styles.label}>Nome da Viagem:</Text>
            <TextInput 
                style={Styles.input} 
                value={nome} 
                onChangeText={setNome} 
                placeholder="Ex: Férias no Nordeste" 
                placeholderTextColor={Colors.textSecondary}
            />

            <Text style={styles.label}>Destino:</Text>
            <TextInput 
                style={Styles.input} 
                value={destino} 
                onChangeText={setDestino} 
                placeholder="Ex: Salvador, BA"
                placeholderTextColor={Colors.textSecondary}
            />

            <Text style={styles.label}>Data de Início:</Text>
            {renderDatePicker(dataInicio, setMostrarDatePickerInicio, 'inicio', mostrarDatePickerInicio)}

            <Text style={styles.label}>Data Final:</Text>
            {renderDatePicker(dataFim, setMostrarDatePickerFim, 'fim', mostrarDatePickerFim)}

            <View style={Styles.buttonContainer}>
                <Button 
                    title={loading ? 'Salvando...' : (estaEditando ? 'Salvar Alterações' : 'Cadastrar Viagem')} 
                    onPress={handleSubmit} 
                    color={Colors.primary} 
                    disabled={loading}
                />
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: Colors.text,
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
