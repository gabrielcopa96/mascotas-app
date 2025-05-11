import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Input, Typography } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';
import useLoginForm from '../../hooks/forms/useLoginForm';
import { LoginCredentials } from '../../services/authService';
import { navigateTo } from '../../utils/navigation';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  onForgotPassword?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit, 
  isLoading = false,
  onForgotPassword = () => navigateTo('/forgot-password')
}) => {
  const {
    values,
    errors,
    touched,
    showPassword,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    handleSubmit,
  } = useLoginForm(onSubmit);

  // Icono para mostrar/ocultar contraseña
  const renderPasswordIcon = () => (
    <IconRegistry
      name={showPassword ? 'eye-off' : 'eye'}
      size={20}
      color={COLORS.primary.dark}
    />
  );

  return (
    <View style={styles.container}>
      <Input
        label="Email o dni"
        placeholder="Ingresá tu email o dni"
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
        error={errors.email}
        touched={touched.email}
        keyboardType="email-address"
        autoCapitalize="none"
        onBlur={() => handleBlur('email')}
      />

      <Input
        label="Contraseña"
        placeholder="Ingresá tu contraseña"
        value={values.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry={!showPassword}
        error={errors.password}
        touched={touched.password}
        icon={renderPasswordIcon()}
        iconPosition="right"
        onIconPress={togglePasswordVisibility}
        onBlur={() => handleBlur('password')}
      />

      <TouchableOpacity 
        style={styles.forgotPasswordContainer} 
        onPress={onForgotPassword}
      >
        <Typography 
          variant="body2" 
          color={COLORS.primary.light}
        >
          ¿Olvidaste tu contraseña?
        </Typography>
      </TouchableOpacity>

      <Button
        title="Iniciar sesión"
        onPress={handleSubmit}
        loading={isLoading}
        fullWidth
        style={styles.loginButton}
        icon={<IconRegistry name="paw" size={20} color={COLORS.white} />}
        iconPosition="left"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: SIZES.spacing.xs,
    marginBottom: SIZES.spacing.sm,
  },
  loginButton: {
    marginTop: SIZES.spacing.sm,
  },
});

export default LoginForm;
