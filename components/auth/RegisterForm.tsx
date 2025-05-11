import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Checkbox } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';
import { RegisterCredentials } from '../../services/authService';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import useRegisterForm from '../../hooks/forms/useRegisterForm';

interface RegisterFormProps {
  onSubmit: (credentials: RegisterCredentials) => Promise<void>;
  isLoading?: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isLoading = false }) => {
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  
  const {
    values,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    acceptTerms,
    termsError,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleTermsChange,
    handleSubmit,
    isValid
  } = useRegisterForm(onSubmit);



  const handleOpenTermsModal = () => {
    setTermsModalVisible(true);
  };

  const handleCloseTermsModal = () => {
    setTermsModalVisible(false);
  };

  const handleAcceptTerms = () => {
    handleTermsChange(true);
    setTermsModalVisible(false);
  };

  // Icono para mostrar/ocultar contraseña
  const renderPasswordIcon = (isConfirmPassword = false) => (
    <IconRegistry
      name={isConfirmPassword ? (showConfirmPassword ? 'eye-off' : 'eye') : (showPassword ? 'eye-off' : 'eye')}
      size={20}
      color={COLORS.primary.dark}
    />
  );

  return (
    <View style={styles.container}>
      <Input
        label="Nombre"
        placeholder="Ingresá tu nombre"
        value={values.firstName}
        onChangeText={(text) => handleChange('firstName', text)}
        error={errors.firstName}
        touched={touched.firstName}
        onBlur={() => handleBlur('firstName')}
      />

      <Input
        label="Apellido"
        placeholder="Ingresá tu apellido"
        value={values.lastName}
        onChangeText={(text) => handleChange('lastName', text)}
        error={errors.lastName}
        touched={touched.lastName}
        onBlur={() => handleBlur('lastName')}
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

      <Input
        label="Repetir Contraseña"
        placeholder="Repetí tu contraseña"
        value={values.confirmPassword}
        onChangeText={(text) => handleChange('confirmPassword', text)}
        secureTextEntry={!showConfirmPassword}
        error={errors.confirmPassword}
        touched={touched.confirmPassword}
        icon={renderPasswordIcon(true)}
        iconPosition="right"
        onIconPress={toggleConfirmPasswordVisibility}
        onBlur={() => handleBlur('confirmPassword')}
      />

      <Checkbox
        label="Acepto los términos y condiciones"
        checked={acceptTerms}
        onValueChange={handleTermsChange}
        onLabelPress={handleOpenTermsModal}
        error={termsError}
        style={styles.checkbox}
      />

      <TermsAndConditionsModal
        visible={termsModalVisible}
        onClose={handleCloseTermsModal}
        onAccept={handleAcceptTerms}
      />

      <Button
        title="Registrarse"
        onPress={handleSubmit}
        loading={isLoading}
        fullWidth
        style={styles.registerButton}
        icon={<IconRegistry name="paw" size={20} color={COLORS.white} />}
        iconPosition="left"
        disabled={!isValid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  checkbox: {
    marginVertical: 4, // Reducido aún más
  },
  registerButton: {
    marginTop: 6, // Reducido aún más
  },
});

export default RegisterForm;
