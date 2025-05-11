import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image } from 'react-native';
import { Typography, GradientBackground, Divider } from '../../components/ui';
import { COLORS, SIZES } from '../../constants/theme';
import { navigateToHome, navigateToRegister } from '../../utils/navigation';
import LoginForm from '../../components/auth/LoginForm';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import RegisterLink from '../../components/auth/RegisterLink';
import { useAuth } from '../../contexts/AuthContext';
import { LoginCredentials } from '../../services/authService';

export default function LoginScreen() {
  const { login, loginWithGoogle, error } = useAuth();
  const [isLoginLoading, setIsLoginLoading] = React.useState(false);
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = React.useState(false);

  // Manejar inicio de sesión
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setIsLoginLoading(true);
      await login(credentials);
      // Navegar al dashboard después de iniciar sesión
      navigateToHome();
    } catch (err) {
      // El error ya está manejado en el hook useAuth
      // Pero podríamos mostrar un mensaje adicional si es necesario
      Alert.alert('Error de inicio de sesión', error || 'No se pudo iniciar sesión');
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Manejar inicio de sesión con Google
  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoginLoading(true);
      await loginWithGoogle();
      // Navegar al dashboard después de iniciar sesión
      navigateToHome();
    } catch (err) {
      // El error ya está manejado en el hook useAuth
      Alert.alert('Error de inicio de sesión', error || 'No se pudo iniciar sesión con Google');
    } finally {
      setIsGoogleLoginLoading(false);
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
            <Image 
              source={require('../../assets/images/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>

          <View style={styles.cardContainer}>
            <Typography variant="h2" color={COLORS.text.primary} align="center" style={styles.title}>
              Inicia sesión
            </Typography>

            {/* Formulario de login */}
            <LoginForm onSubmit={handleLogin} isLoading={isLoginLoading} />

            <Divider text="ó" color={COLORS.border.dark} style={styles.divider} />

            {/* Botón de login con Google */}
            <GoogleLoginButton onPress={handleGoogleLogin} isLoading={isGoogleLoginLoading} />

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
  logo: {
    width: 120,
    height: 120,
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
    marginBottom: SIZES.spacing.xl,
    letterSpacing: 1,
  },
  divider: {
    marginVertical: SIZES.spacing.lg,
  },
});
