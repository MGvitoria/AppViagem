import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { colors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import CardViagem from '../components/CardViagem';

export default function ViagemList() {
  const [viagens, setViagens] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'viagens'), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setViagens(lista);
    });
    return () => unsubscribe();
  }, []);

  async function excluir(id: string) {
    Alert.alert('Excluir viagem', 'Tem certeza que deseja excluir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteDoc(doc(db, 'viagens', id));
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Viagens 🌎</Text>

      <FlatList
        data={viagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardViagem
            viagem={item}
            onEdit={() => navigation.navigate('ViagemForm', { viagem: item })}
            onDelete={() => excluir(item.id)}
          />
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ViagemForm')}>
        <Text style={styles.addButtonText}>＋</Text>
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
    fontSize: 28,
    color: colors.textDark,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
  },
});
