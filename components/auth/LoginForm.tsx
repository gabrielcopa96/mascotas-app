import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';
import useLoginForm from '../../hooks/forms/useLoginForm';
import { LoginCredentials } from '../../services/authService';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading = false }) => {
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
  loginButton: {
    marginTop: SIZES.spacing.md,
  },
});

export default LoginForm;
