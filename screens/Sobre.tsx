import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../theme';

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/201/201623.png' }} style={styles.logo} />
      <Text style={styles.title}>Sobre o App Viagem 🌎</Text>
      <Text style={styles.text}>
        O App Viagem foi desenvolvido para ajudar você a organizar e registrar suas aventuras pelo mundo!
      </Text>
      <Text style={styles.text}>
        💡 Feito com React Native, Firebase e muito espírito de viagem!
      </Text>
      <Text style={styles.footer}>Desenvolvido por Vitória 🏝️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center', padding: 20 },
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 26, color: colors.textDark, fontWeight: 'bold', marginBottom: 20 },
  text: { fontSize: 16, color: colors.textLight, textAlign: 'center', marginBottom: 10 },
  footer: { marginTop: 40, color: colors.textDark, fontWeight: 'bold' },
});
