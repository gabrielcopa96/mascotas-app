import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Typography, GradientBackground } from '../../components/ui';
import { COLORS, SIZES } from '../../constants/theme';
import { navigateToLogin, navigateTo } from '../../utils/navigation';
import IconRegistry from '../../components/icons/IconRegistry';
import { ForgotPasswordRequest } from '../../services/authService';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPasswordScreen() {
  const { forgotPassword, isLoading, error } = useAuth();

  // Manejar envío de código
  const handleSendCode = async (request: ForgotPasswordRequest) => {
    try {
      // Llamada a la API para enviar el código
      const message = await forgotPassword(request);
      
      // Mostrar mensaje de éxito
      Alert.alert('Código enviado', message || 'Se ha enviado un código de verificación a tu email');
      
      // Navegar a la pantalla de verificación de código
      navigateTo('/verify-code');
    } catch (err) {
      // El error ya está manejado en el hook useAuth
      Alert.alert('Error', error || 'No se pudo enviar el código de verificación. Inténtalo de nuevo.');
    }
  };

  // Manejar navegación a la pantalla de login
  const handleBackToLogin = () => {
    navigateToLogin();
  };

  return (
    <GradientBackground
      colors={[COLORS.primary.dark, COLORS.primary.main] as const}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBackToLogin}
            >
              <IconRegistry name="arrow-right" size={24} color={COLORS.white} style={styles.backIcon} />
              <Typography variant="body2" color={COLORS.white}>Volver</Typography>
            </TouchableOpacity>
            
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/images/logo.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.cardContainer}>
            <Typography variant="h1" color={COLORS.text.primary} align="center" style={styles.title}>
              Recuperar contraseña
            </Typography>
            
            <Typography variant="body1" color={COLORS.text.secondary} align="center" style={styles.subtitle}>
              Ingresa tu email para recibir un código de verificación
            </Typography>

            <ForgotPasswordForm 
              onSubmit={handleSendCode}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SIZES.spacing.lg,
    paddingTop: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.spacing.lg,
    position: 'relative',
    width: '100%',
    marginTop: SIZES.spacing.md,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    top: -10,
  },
  backIcon: {
    transform: [{ rotate: '180deg' }],
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius.lg,
    padding: SIZES.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    marginBottom: SIZES.spacing.sm,
    letterSpacing: 1,
  },
  subtitle: {
    marginBottom: SIZES.spacing.lg,
  },
  sendButton: {
    marginTop: SIZES.spacing.md,
  },
});
