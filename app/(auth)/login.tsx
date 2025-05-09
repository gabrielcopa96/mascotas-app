import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Typography, Logo, GradientBackground, Divider } from '../../components/ui';
import { COLORS, SIZES } from '../../constants/theme';
import { navigateToHome, navigateToRegister } from '../../utils/navigation';
import LoginForm from '../../components/auth/LoginForm';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import RegisterLink from '../../components/auth/RegisterLink';
import useAuth from '../../hooks/useAuth';
import { LoginCredentials } from '../../services/authService';

export default function LoginScreen() {
  const { login, loginWithGoogle, isLoading, error } = useAuth();

  // Manejar inicio de sesión
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      await login(credentials);
      // Navegar al dashboard después de iniciar sesión
      navigateToHome();
    } catch (err) {
      // El error ya está manejado en el hook useAuth
      // Pero podríamos mostrar un mensaje adicional si es necesario
      Alert.alert('Error de inicio de sesión', error || 'No se pudo iniciar sesión');
    }
  };

  // Manejar inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      // Navegar al dashboard después de iniciar sesión
      navigateToHome();
    } catch (err) {
      // El error ya está manejado en el hook useAuth
      Alert.alert('Error de inicio de sesión', error || 'No se pudo iniciar sesión con Google');
    }
  };

  // Manejar navegación a la pantalla de registro
  const handleRegisterPress = () => {
    navigateToRegister();
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
          <View style={styles.logoContainer}>
            <Logo size="large" />
          </View>

          <View style={styles.formContainer}>
            <Typography variant="h3" color={COLORS.white} align="center" style={styles.title}>
              Inicia sesion
            </Typography>

            {/* Formulario de login */}
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />

            <Divider text="ó" color={COLORS.border.light} style={styles.divider} />

            {/* Botón de login con Google */}
            <GoogleLoginButton onPress={handleGoogleLogin} isLoading={isLoading} />

            {/* Enlace para registrarse */}
            <RegisterLink onPress={handleRegisterPress} />
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
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.spacing.xl,
  },
  formContainer: {
    width: '100%',
  },
  title: {
    marginBottom: SIZES.spacing.xl,
  },
  divider: {
    marginVertical: SIZES.spacing.lg,
  },
});
