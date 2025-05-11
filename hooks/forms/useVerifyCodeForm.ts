import { useState, useCallback, useEffect } from 'react';

interface VerifyCodeFormValues {
  code: string;
}

interface VerifyCodeFormErrors {
  code: string;
}

interface UseVerifyCodeFormReturn {
  values: VerifyCodeFormValues;
  errors: VerifyCodeFormErrors;
  touched: Record<keyof VerifyCodeFormValues, boolean>;
  isSubmitting: boolean;
  timeRemaining: number;
  canResend: boolean;
  handleChange: (field: keyof VerifyCodeFormValues, value: string) => void;
  handleBlur: (field: keyof VerifyCodeFormValues) => void;
  handleSubmit: () => Promise<void>;
  handleResend: () => Promise<void>;
  isValid: boolean;
}

const useVerifyCodeForm = (
  onSubmit: (values: VerifyCodeFormValues) => Promise<void>,
  onResend: () => Promise<void>,
  resendTimeout: number = 60 // Tiempo en segundos para poder reenviar el código
): UseVerifyCodeFormReturn => {
  // Estado para los valores del formulario
  const [values, setValues] = useState<VerifyCodeFormValues>({
    code: '',
  });

  // Estado para los errores del formulario
  const [errors, setErrors] = useState<VerifyCodeFormErrors>({
    code: '',
  });

  // Estado para los campos que han sido tocados
  const [touched, setTouched] = useState<Record<keyof VerifyCodeFormValues, boolean>>({
    code: false,
  });

  // Estado para el envío del formulario
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Estado para el temporizador de reenvío
  const [timeRemaining, setTimeRemaining] = useState(resendTimeout);
  const [canResend, setCanResend] = useState(false);

  // Iniciar el temporizador cuando se monta el componente
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearInterval(timer);
            setCanResend(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeRemaining]);

  // Validación del código
  const validateCode = useCallback((code: string): string => {
    if (!code) {
      return 'El código es requerido';
    }

    // Validar que el código tenga el formato correcto (6 dígitos)
    if (!/^\d{6}$/.test(code)) {
      return 'El código debe contener 6 dígitos';
    }

    return '';
  }, []);

  // Validación de todo el formulario
  const validateForm = useCallback((): boolean => {
    const codeError = validateCode(values.code);

    setErrors({
      code: codeError,
    });

    return !codeError;
  }, [values, validateCode]);

  // Manejador de cambio de valores
  const handleChange = useCallback((field: keyof VerifyCodeFormValues, value: string) => {
    // Para el código, solo permitir dígitos y limitar a 6 caracteres
    if (field === 'code') {
      const digitsOnly = value.replace(/\D/g, '').substring(0, 6);
      
      setValues((prevValues) => ({
        ...prevValues,
        [field]: digitsOnly,
      }));

      // Validación en tiempo real
      if (touched.code) {
        const fieldError = validateCode(digitsOnly);
        setErrors((prevErrors) => ({
          ...prevErrors,
          code: fieldError,
        }));
      }
      
      return;
    }

    setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  }, [touched, validateCode]);

  // Manejador de blur (cuando el campo pierde el foco)
  const handleBlur = useCallback((field: keyof VerifyCodeFormValues) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true,
    }));

    // Validar el campo cuando pierde el foco
    if (field === 'code') {
      const fieldError = validateCode(values.code);
      setErrors((prevErrors) => ({
        ...prevErrors,
        code: fieldError,
      }));
    }
  }, [values, validateCode]);

  // Manejador de envío del formulario
  const handleSubmit = useCallback(async () => {
    // Marcar todos los campos como tocados
    setTouched({
      code: true,
    });

    // Validar el formulario
    const isValid = validateForm();

    if (isValid) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Error al verificar el código:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validateForm, onSubmit]);

  // Manejador para reenviar el código
  const handleResend = useCallback(async () => {
    if (!canResend) return;
    
    try {
      setIsSubmitting(true);
      await onResend();
      // Reiniciar el temporizador
      setTimeRemaining(resendTimeout);
      setCanResend(false);
    } catch (error) {
      console.error('Error al reenviar el código:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [canResend, onResend, resendTimeout]);

  // Verificar si el formulario es válido
  const isValid = !errors.code && values.code.length === 6;

  return {
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
    isValid,
  };
};

export default useVerifyCodeForm;
