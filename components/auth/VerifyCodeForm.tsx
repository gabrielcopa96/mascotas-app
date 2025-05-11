import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Input, Typography } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';
import useVerifyCodeForm from '../../hooks/forms/useVerifyCodeForm';

interface VerifyCodeFormProps {
  onSubmit: (values: { code: string }) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
}

const VerifyCodeForm: React.FC<VerifyCodeFormProps> = ({ 
  onSubmit, 
  onResend,
  isLoading = false 
}) => {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    timeRemaining,
    canResend,
    handleChange,
    handleBlur,
    handleSubmit,
    handleResend,
    isValid
  } = useVerifyCodeForm(onSubmit, onResend);

  // Formatear el tiempo restante para mostrar minutos:segundos
  const formatTimeRemaining = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Input
        label="Código de verificación"
        placeholder="Ingresá el código de 6 dígitos"
        value={values.code}
        onChangeText={(text) => handleChange('code', text)}
        error={errors.code}
        touched={touched.code}
        keyboardType="number-pad"
        maxLength={6}
        onBlur={() => handleBlur('code')}
      />

      <View style={styles.timerContainer}>
        {!canResend ? (
          <Typography variant="body2" color={COLORS.text.secondary}>
            Podrás solicitar un nuevo código en {formatTimeRemaining()}
          </Typography>
        ) : (
          <Button
            title="Reenviar código"
            onPress={handleResend}
            variant="tertiary"
            loading={isLoading && isSubmitting}
            style={styles.resendButton}
            textStyle={{ color: COLORS.primary.main }}
          />
        )}
      </View>

      <Button
        title="Verificar código"
        onPress={handleSubmit}
        loading={isLoading || isSubmitting}
        fullWidth
        style={styles.submitButton}
        icon={<IconRegistry name="arrow-right" size={20} color={COLORS.white} />}
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
  timerContainer: {
    alignItems: 'center',
    marginTop: SIZES.spacing.xs,
    marginBottom: SIZES.spacing.sm,
  },
  resendButton: {
    marginTop: 0,
  },
  submitButton: {
    marginTop: SIZES.spacing.md,
  },
});

export default VerifyCodeForm;
