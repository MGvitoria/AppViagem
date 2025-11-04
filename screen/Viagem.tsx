import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase';
import { collection, query, where, onSnapshot, doc, getDocs, runTransaction, deleteDoc } from 'firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../App';
import { Viagem as ViagemModel } from '../model/Viagem'; 
import { Styles, Colors } from '../Style/Styles'; 

type Props = NativeStackScreenProps<AppStackParamList, 'ListaViagens'>;

export function Viagem({ navigation }: Props) {
  const [viagens, setViagens] = useState<ViagemModel[]>([]);
  const [loading, setLoading] = useState(true);
  const idUsuario = auth.currentUser?.uid;

  useEffect(() => {
    if (!idUsuario) {
        setLoading(false);
        return;
    }

    const q = query(collection(db, "viagens"), where("idUsuario", "==", idUsuario));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const dadosViagens = querySnapshot.docs.map(doc => new ViagemModel({
        id: doc.id,
        ...doc.data(),
      }));
      dadosViagens.sort((a, b) => a.dataInicio.getTime() - b.dataInicio.getTime());
      setViagens(dadosViagens);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar viagens:", error);
      Alert.alert("Erro de Busca", "Não foi possível carregar as viagens.");
      setLoading(false);
    });

    return unsubscribe;
  }, [idUsuario]);

  const handleExcluir = async (viagem: ViagemModel) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir a Viagem "${viagem.nome}"? Isso removerá TODAS as atividades associadas.`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          onPress: async () => {
            try {
              await runTransaction(db, async (transaction) => {
                const queryAtividades = query(collection(db, "atividades"), where("idViagem", "==", viagem.id));
                const snapshotAtividades = await getDocs(queryAtividades);
                
                snapshotAtividades.docs.forEach((docAtividade) => {
                  transaction.delete(docAtividade.ref);
                });

                const refViagem = doc(db, "viagens", viagem.id);
                transaction.delete(refViagem);
              });

              Alert.alert("Sucesso", "Viagem e atividades associadas excluídas.");
            } catch (error: any) {
              Alert.alert("Erro de Exclusão", "Não foi possível excluir a viagem e suas atividades.");
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: ViagemModel }) => (
    <View style={Styles.card}>
      <Text style={[Styles.cardTitle, { color: Colors.primary }]}>{item.nome}</Text>
      <Text style={Styles.cardDetail}>Destino: {item.destino}</Text>
      <Text style={Styles.cardDetail}>Período: {item.dataInicio.toLocaleDateString('pt-BR')} a {item.dataFim.toLocaleDateString('pt-BR')}</Text>
      
      <View style={Styles.cardActions}>
        <TouchableOpacity 
          style={styles.botaoAcaoContainer} 
          onPress={() => navigation.navigate('ListaAtividades', { idViagem: item.id, nomeViagem: item.nome })}
        >
          <Text style={[styles.textoAcao, { color: Colors.secondary }]}>Atividades</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoAcaoContainer} 
          onPress={() => navigation.navigate('FormularioViagem', { idViagem: item.id })}
        >
          <Text style={[styles.textoAcao, { color: Colors.accent }]}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoAcaoContainer} 
          onPress={() => handleExcluir(item)}
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
          title="Adicionar Nova Viagem" 
          onPress={() => navigation.navigate('FormularioViagem', { idViagem: undefined })} 
          color={Colors.primary}
        />
      </View>

      {loading ? (
        <Text style={styles.textoVazio}>Carregando viagens...</Text>
      ) : (
        <FlatList
          data={viagens}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.conteudoLista}
          ListEmptyComponent={<Text style={styles.textoVazio}>Nenhuma viagem cadastrada. Adicione uma!</Text>}
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
