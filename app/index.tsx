import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import { authService } from '../services/authService';
import { GradientBackground } from '../components/ui';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado y si es válido
    const checkAuthStatus = async () => {
      try {
        // Verificar si el usuario está autenticado (incluye validación de token)
        const authenticated = await authService.isAuthenticated();
        
        // Si está autenticado, verificar que los datos del usuario estén disponibles
        if (authenticated) {
          const userData = await authService.getUser();
          if (!userData) {
            // Si no hay datos de usuario a pesar de tener token, consideramos que no está autenticado
            console.warn('Token válido pero no se encontraron datos de usuario');
            await authService.logout(); // Limpiar el token inválido
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error al verificar el estado de autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading) {
    return (
      <GradientBackground
        colors={[COLORS.primary.dark, COLORS.primary.main] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          <ActivityIndicator size="large" color={COLORS.white} />
        </View>
      </GradientBackground>
    );
  }

  // Redirigir según el estado de autenticación
  return isAuthenticated ? 
    <Redirect href="/(tabs)" /> : 
    <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
