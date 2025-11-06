import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { colors } from '../theme';

export default function HospedagemList() {
  const [hospedagens, setHospedagens] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'hospedagens'), (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setHospedagens(lista);
    });
    return () => unsubscribe();
  }, []);

  async function adicionar() {
    const nome = prompt('Nome da hospedagem:');
    const endereco = prompt('Endereço:');
    if (nome && endereco) {
      await addDoc(collection(db, 'hospedagens'), { nomeHospedagem: nome, endereco });
    }
  }

  async function excluir(id: string) {
    Alert.alert('Excluir hospedagem', 'Deseja remover?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: async () => await deleteDoc(doc(db, 'hospedagens', id)) },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hospedagens 🏨</Text>

      <FlatList
        data={hospedagens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.nomeHospedagem}</Text>
            <Text style={styles.address}>{item.endereco}</Text>
            <TouchableOpacity onPress={() => excluir(item.id)}>
              <Text style={styles.delete}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={adicionar}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { fontSize: 26, color: colors.textDark, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: 'bold', color: colors.textDark },
  address: { fontSize: 14, color: colors.textLight },
  delete: { color: colors.danger, marginTop: 8 },
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
  },
  addButtonText: { color: '#fff', fontSize: 28 },
});
