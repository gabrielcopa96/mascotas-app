import { useState, useCallback } from 'react';

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email: string;
  password: string;
}

interface UseLoginFormReturn {
  values: LoginFormValues;
  errors: LoginFormErrors;
  touched: Record<keyof LoginFormValues, boolean>;
  showPassword: boolean;
  isSubmitting: boolean;
  handleChange: (field: keyof LoginFormValues, value: string) => void;
  handleBlur: (field: keyof LoginFormValues) => void;
  togglePasswordVisibility: () => void;
  handleSubmit: () => Promise<void>;
  isValid: boolean;
}

const useLoginForm = (onSubmit: (values: LoginFormValues) => Promise<void>): UseLoginFormReturn => {
  // Estado para los valores del formulario
  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  // Estado para los errores del formulario
  const [errors, setErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
  });

  // Estado para los campos que han sido tocados
  const [touched, setTouched] = useState<Record<keyof LoginFormValues, boolean>>({
    email: false,
    password: false,
  });

  // Estado para mostrar/ocultar la contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de email
  const validateEmail = useCallback((email: string): string => {
    if (!email) {
      return 'El email es requerido';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dniRegex = /^\d{7,8}$/;
    
    if (!emailRegex.test(email) && !dniRegex.test(email)) {
      return 'Ingresa un email o DNI válido';
    }

    return '';
  }, []);

  // Validación de contraseña
  const validatePassword = useCallback((password: string): string => {
    if (!password) {
      return 'La contraseña es requerida';
    }

    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }

    return '';
  }, []);

  // Validación de todo el formulario
  const validateForm = useCallback((): boolean => {
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return !emailError && !passwordError;
  }, [values, validateEmail, validatePassword]);

  // Manejador de cambio de valores
  const handleChange = useCallback((field: keyof LoginFormValues, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    // Validación en tiempo real si el campo ya ha sido tocado
    if (touched[field]) {
      let fieldError = '';
      
      if (field === 'email') {
        fieldError = validateEmail(value);
      } else if (field === 'password') {
        fieldError = validatePassword(value);
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: fieldError,
      }));
    }
  }, [touched, validateEmail, validatePassword]);

  // Manejador de blur (cuando el campo pierde el foco)
  const handleBlur = useCallback((field: keyof LoginFormValues) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));

    // Validar el campo cuando pierde el foco
    let fieldError = '';
    
    if (field === 'email') {
      fieldError = validateEmail(values.email);
    } else if (field === 'password') {
      fieldError = validatePassword(values.password);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldError,
    }));
  }, [values, validateEmail, validatePassword]);

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async () => {
    // Marcar todos los campos como tocados
    setTouched({
      email: true,
      password: true,
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
  const isValid = !errors.email && !errors.password && values.email !== '' && values.password !== '';

  return {
    values,
    errors,
    touched,
    showPassword,
    isSubmitting,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    handleSubmit,
    isValid,
  };
};

export default useLoginForm;
