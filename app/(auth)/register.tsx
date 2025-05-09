import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GradientBackground } from '../../components/ui';
import { COLORS } from '../../constants/theme';

export default function RegisterScreen() {
  return (
    <GradientBackground
      colors={[COLORS.primary.dark, COLORS.primary.main] as const}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Pantalla de Registro</Text>
        <Text style={styles.text}>Esta pantalla será implementada próximamente</Text>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: COLORS.white,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
});
