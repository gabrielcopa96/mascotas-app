import { useState, useCallback } from 'react';
import { RegisterCredentials } from '../../services/authService';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface UseRegisterFormReturn {
  values: RegisterFormValues;
  errors: RegisterFormErrors;
  touched: Record<keyof RegisterFormValues, boolean>;
  showPassword: boolean;
  showConfirmPassword: boolean;
  acceptTerms: boolean;
  termsError: string;
  isSubmitting: boolean;
  handleChange: (field: keyof RegisterFormValues, value: string) => void;
  handleBlur: (field: keyof RegisterFormValues) => void;
  togglePasswordVisibility: () => void;
  toggleConfirmPasswordVisibility: () => void;
  handleTermsChange: (checked: boolean) => void;
  handleSubmit: () => Promise<void>;
  isValid: boolean;
}

const useRegisterForm = (onSubmit: (values: RegisterCredentials) => Promise<void>): UseRegisterFormReturn => {
  // Estado para los valores del formulario
  const [values, setValues] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado para los errores del formulario
  const [errors, setErrors] = useState<RegisterFormErrors>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Estado para los campos que han sido tocados
  const [touched, setTouched] = useState<Record<keyof RegisterFormValues, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Estado para mostrar/ocultar las contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado para los términos y condiciones
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState('');

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validación de nombre
  const validateFirstName = useCallback((firstName: string): string => {
    if (!firstName.trim()) {
      return 'El nombre es requerido';
    }

    if (firstName.length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar que solo contenga letras y espacios
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(firstName)) {
      return 'El nombre solo debe contener letras';
    }

    return '';
  }, []);

  // Validación de apellido
  const validateLastName = useCallback((lastName: string): string => {
    if (!lastName.trim()) {
      return 'El apellido es requerido';
    }

    if (lastName.length < 2) {
      return 'El apellido debe tener al menos 2 caracteres';
    }

    // Validar que solo contenga letras y espacios
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(lastName)) {
      return 'El apellido solo debe contener letras';
    }

    return '';
  }, []);

  // Validación de email
  const validateEmail = useCallback((email: string): string => {
    if (!email) {
      return 'El email es requerido';
    }

    // Regex más completo para validar emails
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      return 'Formato de email inválido';
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

  // Validación de términos y condiciones
  const validateTerms = useCallback((): string => {
    if (!acceptTerms) {
      return 'Debes aceptar los términos y condiciones';
    }
    return '';
  }, [acceptTerms]);

  // Validación de todo el formulario
  const validateForm = useCallback((): boolean => {
    const firstNameError = validateFirstName(values.firstName);
    const lastNameError = validateLastName(values.lastName);
    const emailError = validateEmail(values.email);
    const passwordError = validatePassword(values.password);
    const confirmPasswordError = validateConfirmPassword(values.confirmPassword);
    const termsErrorMsg = validateTerms();

    setErrors({
      firstName: firstNameError,
      lastName: lastNameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    setTermsError(termsErrorMsg);

    return !firstNameError && !lastNameError && !emailError && 
           !passwordError && !confirmPasswordError && !termsErrorMsg;
  }, [
    values, 
    validateFirstName, 
    validateLastName, 
    validateEmail, 
    validatePassword, 
    validateConfirmPassword,
    validateTerms
  ]);

  // Manejador de cambio de valores
  const handleChange = useCallback((field: keyof RegisterFormValues, value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));

    // Validación en tiempo real si el campo ya ha sido tocado
    if (touched[field]) {
      let fieldError = '';
      
      switch (field) {
        case 'firstName':
          fieldError = validateFirstName(value);
          break;
        case 'lastName':
          fieldError = validateLastName(value);
          break;
        case 'email':
          fieldError = validateEmail(value);
          break;
        case 'password':
          fieldError = validatePassword(value);
          // También validar confirmPassword si ya fue tocado
          if (touched.confirmPassword) {
            const confirmPasswordError = values.confirmPassword === value ? '' : 'Las contraseñas no coinciden';
            setErrors(prev => ({
              ...prev,
              confirmPassword: confirmPasswordError
            }));
          }
          break;
        case 'confirmPassword':
          fieldError = value === values.password ? '' : 'Las contraseñas no coinciden';
          break;
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: fieldError,
      }));
    }
  }, [
    touched, 
    validateFirstName, 
    validateLastName, 
    validateEmail, 
    validatePassword,
    values.password,
    values.confirmPassword
  ]);

  // Manejador de blur (cuando el campo pierde el foco)
  const handleBlur = useCallback((field: keyof RegisterFormValues) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));

    // Validar el campo cuando pierde el foco
    let fieldError = '';
    
    switch (field) {
      case 'firstName':
        fieldError = validateFirstName(values.firstName);
        break;
      case 'lastName':
        fieldError = validateLastName(values.lastName);
        break;
      case 'email':
        fieldError = validateEmail(values.email);
        break;
      case 'password':
        fieldError = validatePassword(values.password);
        break;
      case 'confirmPassword':
        fieldError = validateConfirmPassword(values.confirmPassword);
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: fieldError,
    }));
  }, [
    values, 
    validateFirstName, 
    validateLastName, 
    validateEmail, 
    validatePassword, 
    validateConfirmPassword
  ]);

  // Alternar visibilidad de la contraseña
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }, []);

  // Alternar visibilidad de la confirmación de contraseña
  const toggleConfirmPasswordVisibility = useCallback(() => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  }, []);

  // Manejar cambio en términos y condiciones
  const handleTermsChange = useCallback((checked: boolean) => {
    setAcceptTerms(checked);
    if (checked) {
      setTermsError('');
    }
  }, []);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async () => {
    // Marcar todos los campos como tocados
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Validar el formulario
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);
      try {
        // Preparar las credenciales para la API
        const credentials: RegisterCredentials = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        
        await onSubmit(credentials);
      } catch (error) {
        console.error('Error en el registro:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);

  // Verificar si el formulario es válido
  const isValid = !errors.firstName && !errors.lastName && !errors.email && 
                 !errors.password && !errors.confirmPassword && !termsError &&
                 values.firstName !== '' && values.lastName !== '' && 
                 values.email !== '' && values.password !== '' && 
                 values.confirmPassword !== '' && acceptTerms;

  return {
    values,
    errors,
    touched,
    showPassword,
    showConfirmPassword,
    acceptTerms,
    termsError,
    isSubmitting,
    handleChange,
    handleBlur,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleTermsChange,
    handleSubmit,
    isValid,
  };
};

export default useRegisterForm;
