import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  viagem: any;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CardViagem({ viagem, onEdit, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.destino}>{viagem.destino}</Text>
      <Text style={styles.text}>🗓 {viagem.dataIda} → {viagem.dataVolta}</Text>
      <Text style={styles.text}>💰 R$ {viagem.orcamento}</Text>
      <Text style={styles.text}>🚗 {viagem.transporte}</Text>
      <Text style={styles.text}>🏨 {viagem.hospedagem}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={onEdit}>
          <Ionicons name="create" size={22} color={colors.textLight} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Ionicons name="trash" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  destino: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  text: {
    fontSize: 14,
    color: colors.textLight,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 15,
  },
});
