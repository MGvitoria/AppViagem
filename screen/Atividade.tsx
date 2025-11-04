import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { Atividade as AtividadeModel } from '../model/Atividade';
import { Styles, Colors } from '../Style/Styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ListaAtividades'>;

export function Atividade({ route, navigation }: Props) {
  const { idViagem, nomeViagem } = route.params;
  const [atividades, setAtividades] = useState<AtividadeModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: `Atividades: ${nomeViagem}` });
    
    const q = query(collection(db, "atividades"), where("idViagem", "==", idViagem));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dadosAtividades = querySnapshot.docs.map(doc => new AtividadeModel({
        id: doc.id,
        ...doc.data(),
      }));
      dadosAtividades.sort((a, b) => a.data.getTime() - b.data.getTime()); 
      setAtividades(dadosAtividades);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar atividades:", error);
      Alert.alert("Erro de Busca", "Não foi possível carregar as atividades.");
      setLoading(false);
    });

    return unsubscribe;
  }, [idViagem, nomeViagem]);

  const handleExcluir = async (idAtividade: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta atividade?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "atividades", idAtividade));
              Alert.alert("Sucesso", "Atividade excluída.");
            } catch (error: any) {
              Alert.alert("Erro de Exclusão", error.message);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: AtividadeModel }) => (
    <View style={Styles.card}>
      <Text style={[Styles.cardTitle, { color: Colors.secondary }]}>{item.nome}</Text>
      <Text style={Styles.cardDetail}>Dia: {item.data.toLocaleDateString('pt-BR')}</Text>
      <Text style={Styles.cardDetail}>Detalhes: {item.detalhes}</Text>
      
      <View style={Styles.cardActions}>
        <TouchableOpacity 
          style={styles.botaoAcaoContainer} 
          onPress={() => navigation.navigate('FormularioAtividade', { idViagem: idViagem, idAtividade: item.id, nomeViagem: nomeViagem })}
        >
          <Text style={[styles.textoAcao, { color: Colors.accent }]}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.botaoAcaoContainer} 
          onPress={() => handleExcluir(item.id)}
        >
          <Text style={[styles.textoAcao, { color: Colors.danger }]}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={Styles.screenContainer}>
      <View style={styles.containerBotaoAdicionar}>
        <Button 
          title="Adicionar Nova Atividade" 
          onPress={() => navigation.navigate('FormularioAtividade', { idViagem: idViagem, idAtividade: undefined, nomeViagem: nomeViagem })} 
          color={Colors.secondary}
        />
      </View>
      
      {loading ? (
        <Text style={styles.textoVazio}>Carregando atividades...</Text>
      ) : (
        <FlatList
          data={atividades}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.conteudoLista}
          ListEmptyComponent={<Text style={styles.textoVazio}>Nenhuma atividade cadastrada para esta viagem.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerBotaoAdicionar: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    ...Styles.buttonContainer,
  },
  conteudoLista: {
    paddingBottom: 20,
  },
  botaoAcaoContainer: {
    marginLeft: 15,
  },
  textoAcao: {
    fontSize: 15,
    fontWeight: '600',
  },
  textoVazio: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: Colors.textSecondary,
    fontStyle: 'italic',
  }
});
