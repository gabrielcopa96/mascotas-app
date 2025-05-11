import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';
import useResetPasswordForm from '../../hooks/forms/useResetPasswordForm';

interface ResetPasswordFormProps {
  onSubmit: (values: { password: string }) => Promise<void>;
  isLoading?: boolean;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const {
    values,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    isSubmitting,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSubmit,
    isValid
  } = useResetPasswordForm(onSubmit);

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
        label="Nueva contraseña"
        placeholder="Ingresá tu nueva contraseña"
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
        label="Confirmar contraseña"
        placeholder="Repetí tu nueva contraseña"
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

      <Button
        title="Cambiar contraseña"
        onPress={handleSubmit}
        loading={isLoading || isSubmitting}
        fullWidth
        style={styles.submitButton}
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
  submitButton: {
    marginTop: SIZES.spacing.md,
  },
});

export default ResetPasswordForm;
