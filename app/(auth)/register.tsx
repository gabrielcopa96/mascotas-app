import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import IconRegistry from '../../components/icons/IconRegistry';
import { Typography, GradientBackground, Divider } from '../../components/ui';
import { COLORS, SIZES } from '../../constants/theme';
import { navigateToHome, navigateToLogin } from '../../utils/navigation';
import RegisterForm from '../../components/auth/RegisterForm';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterCredentials } from '../../services/authService';

export default function RegisterScreen() {
  const { register, loginWithGoogle, isLoading, error } = useAuth();

  // Manejar registro de usuario
  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      await register(credentials);
      // Navegar al dashboard después de registrarse
      navigateToHome();
    } catch (err) {
      // El error ya está manejado en el hook useAuth
      Alert.alert('Error de registro', error || 'No se pudo completar el registro');
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

  // Manejar navegación a la pantalla de login
  const handleLoginPress = () => {
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
              onPress={handleLoginPress}
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
            <Typography variant="h2" color={COLORS.text.primary} align="center" style={styles.title}>
              Registrarse
            </Typography>

            {/* Formulario de registro */}
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />

            <Divider text="ó" color={COLORS.border.dark} style={styles.divider} />

            {/* Botón de login con Google */}
            <GoogleLoginButton onPress={handleGoogleLogin} isLoading={isLoading} />

            {/* Ya no necesitamos el enlace aquí porque tenemos el botón de volver arriba */}
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
    justifyContent: 'flex-start', // Cambiamos a flex-start para que no se desplace tanto
    padding: SIZES.spacing.lg,
    paddingTop: SIZES.spacing.xl, // Añadimos padding superior para la isla dinámica
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.spacing.md, // Reducimos el margen inferior
    position: 'relative',
    width: '100%',
    marginTop: 40, // Fijamos un margen superior específico
  },
  backButton: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    top: -10, // Movemos el botón hacia arriba
  },
  backIcon: {
    transform: [{ rotate: '180deg' }], // Girar el icono para que apunte a la izquierda
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80, // Reducimos el tamaño del logo
    height: 80,
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
    marginBottom: SIZES.spacing.sm, // Reducimos el margen inferior
    letterSpacing: 0.5, // Reducimos el espaciado entre letras
  },
  divider: {
    marginVertical: SIZES.spacing.md, // Reducido el margen vertical
  },
});
