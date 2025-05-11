import { useState, useCallback } from 'react';

interface ResetPasswordFormValues {
  password: string;
  confirmPassword: string;
}

interface ResetPasswordFormErrors {
  password: string;
  confirmPassword: string;
}

interface UseResetPasswordFormReturn {
  values: ResetPasswordFormValues;
  errors: ResetPasswordFormErrors;
  touched: Record<keyof ResetPasswordFormValues, boolean>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isSubmitting: boolean;
  handleChange: (field: keyof ResetPasswordFormValues, value: string) => void;
  handleBlur: (field: keyof ResetPasswordFormValues) => void;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  handleSubmit: () => Promise<void>;
  isValid: boolean;
}

const useResetPasswordForm = (
  onSubmit: (values: { password: string }) => Promise<void>
): UseResetPasswordFormReturn => {
  // Estado para los valores del formulario
  const [values, setValues] = useState<ResetPasswordFormValues>({
    password: '',
    confirmPassword: '',
  });

  // Estado para los errores del formulario
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({
    password: '',
    confirmPassword: '',
  });

  // Estado para los campos que han sido tocados
  const [touched, setTouched] = useState<Record<keyof ResetPasswordFormValues, boolean>>({
    password: false,
    confirmPassword: false,
  });

  // Estado para mostrar/ocultar las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de contraseña
  const validatePassword = useCallback((password: string): string => {
    if (!password) {
      return 'La contraseña es requerida';
    }

    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    // Validación de seguridad de la contraseña
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
      return 'La contraseña debe incluir mayúsculas, minúsculas y números';
    }

    return '';
  }, []);

  // Validación de confirmación de contraseña
  const validateConfirmPassword = useCallback((confirmPassword: string): string => {
    if (!confirmPassword) {
      return 'Confirma tu contraseña';
    }

    if (confirmPassword !== values.password) {
      return 'Las contraseñas no coinciden';
    }

    return '';
  }, [values.password]);

  // Validación de todo el formulario
  const validateForm = useCallback((): boolean => {
    const passwordError = validatePassword(values.password);
    const confirmPasswordError = validateConfirmPassword(values.confirmPassword);

    setErrors({
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    return !passwordError && !confirmPasswordError;
  }, [values, validatePassword, validateConfirmPassword]);

  // Manejador de cambio de valores
  const handleChange = useCallback((field: keyof ResetPasswordFormValues, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    // Validación en tiempo real si el campo ya ha sido tocado
    if (touched[field]) {
      let fieldError = '';
      
      if (field === 'password') {
        fieldError = validatePassword(value);
        // También validar confirmPassword si ya fue tocado
        if (touched.confirmPassword) {
          const confirmPasswordError = values.confirmPassword === value ? '' : 'Las contraseñas no coinciden';
          setErrors(prev => ({
            ...prev,
            confirmPassword: confirmPasswordError
          }));
        }
      } else if (field === 'confirmPassword') {
        fieldError = value === values.password ? '' : 'Las contraseñas no coinciden';
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: fieldError,
      }));
    }
  }, [touched, validatePassword, values.password]);

  // Manejador de blur (cuando el campo pierde el foco)
  const handleBlur = useCallback((field: keyof ResetPasswordFormValues) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));

    // Validar el campo cuando pierde el foco
    let fieldError = '';
    
    if (field === 'password') {
      fieldError = validatePassword(values.password);
    } else if (field === 'confirmPassword') {
      fieldError = validateConfirmPassword(values.confirmPassword);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldError,
    }));
  }, [values, validatePassword, validateConfirmPassword]);

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  // Alternar visibilidad de la confirmación de contraseña
  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  }, []);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async () => {
    // Marcar todos los campos como tocados
    setTouched({
      password: true,
      confirmPassword: true,
    });

    // Validar el formulario
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit({ password: values.password });
      } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);

  // Verificar si el formulario es válido
  const isValid = !errors.password && !errors.confirmPassword && 
                 values.password !== '' && values.confirmPassword !== '';

  return {
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
    isValid,
  };
};

export default useResetPasswordForm;
