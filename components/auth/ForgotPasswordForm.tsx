import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';
import useForgotPasswordForm from '../../hooks/forms/useForgotPasswordForm';
import { ForgotPasswordRequest } from '../../services/authService';

interface ForgotPasswordFormProps {
  onSubmit: (request: ForgotPasswordRequest) => Promise<void>;
  isLoading?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSubmit, 
  isLoading = false 
}) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid
  } = useForgotPasswordForm(onSubmit);

  return (
    <View style={styles.container}>
      <Input
        label="Email o DNI"
        placeholder="Ingresá tu email o DNI"
        value={values.email}
        onChangeText={(text) => handleChange('email', text)}
        error={errors.email}
        touched={touched.email}
        keyboardType="email-address"
        autoCapitalize="none"
        onBlur={() => handleBlur('email')}
      />

      <Button
        title="Enviar código"
        onPress={handleSubmit}
        loading={isLoading || isSubmitting}
        fullWidth
        style={styles.submitButton}
        icon={<IconRegistry name="email" size={20} color={COLORS.white} />}
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

export default ForgotPasswordForm;
