import { useState, useCallback } from 'react';

interface ForgotPasswordFormValues {
  email: string;
}

interface ForgotPasswordFormErrors {
  email: string;
}

interface UseForgotPasswordFormReturn {
  values: ForgotPasswordFormValues;
  errors: ForgotPasswordFormErrors;
  touched: Record<keyof ForgotPasswordFormValues, boolean>;
  isSubmitting: boolean;
  handleChange: (field: keyof ForgotPasswordFormValues, value: string) => void;
  handleBlur: (field: keyof ForgotPasswordFormValues) => void;
  handleSubmit: () => Promise<void>;
  isValid: boolean;
}

const useForgotPasswordForm = (
  onSubmit: (values: ForgotPasswordFormValues) => Promise<void>
): UseForgotPasswordFormReturn => {
  // Estado para los valores del formulario
  const [values, setValues] = useState<ForgotPasswordFormValues>({
    email: '',
  });

  // Estado para los errores del formulario
  const [errors, setErrors] = useState<ForgotPasswordFormErrors>({
    email: '',
  });

  // Estado para los campos que han sido tocados
  const [touched, setTouched] = useState<Record<keyof ForgotPasswordFormValues, boolean>>({
    email: false,
  });

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de email
  const validateEmail = useCallback((email: string): string => {
    if (!email) {
      return 'El email es requerido';
    }

    // Regex más completo para validar emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Regex para validar DNI argentino (7-8 dígitos)
    const dniRegex = /^\d{7,8}$/;
    
    if (!emailRegex.test(email) && !dniRegex.test(email)) {
      if (email.includes('@')) {
        return 'Formato de email inválido';
      } else if (/^\d+$/.test(email)) {
        return 'El DNI debe tener entre 7 y 8 dígitos';
      } else {
        return 'Ingresa un email o DNI válido';
      }
    }

    return '';
  }, []);

  // Validación de todo el formulario
  const validateForm = useCallback((): boolean => {
    const emailError = validateEmail(values.email);

    setErrors({
      email: emailError,
    });

    return !emailError;
  }, [values, validateEmail]);

  // Manejador de cambio de valores
  const handleChange = useCallback((field: keyof ForgotPasswordFormValues, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    // Validación en tiempo real si el campo ya ha sido tocado
    if (touched[field]) {
      let fieldError = '';
      
      if (field === 'email') {
        fieldError = validateEmail(value);
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: fieldError,
      }));
    }
  }, [touched, validateEmail]);

  // Manejador de blur (cuando el campo pierde el foco)
  const handleBlur = useCallback((field: keyof ForgotPasswordFormValues) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));

    // Validar el campo cuando pierde el foco
    let fieldError = '';
    
    if (field === 'email') {
      fieldError = validateEmail(values.email);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldError,
    }));
  }, [values, validateEmail]);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async () => {
    // Marcar todos los campos como tocados
    setTouched({
      email: true,
    });

    // Validar el formulario
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error en el envío del formulario:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);

  // Verificar si el formulario es válido
  const isValid = !errors.email && values.email !== '';

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  };
};

export default useForgotPasswordForm;
