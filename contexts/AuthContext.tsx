import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import { authService, LoginCredentials, RegisterCredentials, User, ForgotPasswordRequest } from '../services/authService';

// Tipo para el contexto de autenticación
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (request: ForgotPasswordRequest) => Promise<string>;
  verifyCode: (code: string) => Promise<string>;
  resendVerificationCode: () => Promise<string>;
  resetPassword: (password: string) => Promise<string>;
  error: string | null;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props para el proveedor del contexto
interface AuthProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar el estado de autenticación al iniciar y configurar un intervalo para verificar periódicamente
  useEffect(() => {
    let authCheckInterval: NodeJS.Timeout | null = null;
    
    const loadAuthState = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const userData = await authService.getUser();
          setUser(userData);
        } else {
          // Si no está autenticado, asegurarse de que el usuario sea null
          setUser(null);
        }
      } catch (err) {
        console.error('Error al cargar el estado de autenticación:', err);
        setError('Error al cargar el estado de autenticación');
        // En caso de error, considerar al usuario como no autenticado
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Cargar el estado de autenticación inmediatamente
    loadAuthState();
    
    // Configurar un intervalo para verificar la autenticación cada 15 minutos
    // Esto ayuda a detectar tokens expirados incluso cuando la app está abierta
    authCheckInterval = setInterval(loadAuthState, 15 * 60 * 1000);
    
    // Limpiar el intervalo cuando el componente se desmonte
    return () => {
      if (authCheckInterval) {
        clearInterval(authCheckInterval);
      }
    };
  }, []);

  // Función de login
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Error en login:', err);
      setError(err.message || 'Error al iniciar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de registro
  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Error en registro:', err);
      setError(err.message || 'Error al registrar usuario');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de login con Google
  const loginWithGoogle = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.loginWithGoogle();
      setUser(response.user);
      setIsAuthenticated(true);
    } catch (err: any) {
      console.error('Error en login con Google:', err);
      setError(err.message || 'Error al iniciar sesión con Google');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de logout
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: any) {
      console.error('Error en logout:', err);
      setError(err.message || 'Error al cerrar sesión');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de recuperación de contraseña
  const forgotPassword = async (request: ForgotPasswordRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const message = await authService.forgotPassword(request);
      return message;
    } catch (err: any) {
      console.error('Error en recuperación de contraseña:', err);
      setError(err.message || 'Error al solicitar recuperación de contraseña');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función de verificación de código
  const verifyCode = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const message = await authService.verifyCode(code);
      return message;
    } catch (err: any) {
      console.error('Error en verificación de código:', err);
      setError(err.message || 'Código inválido o expirado');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para reenviar código de verificación
  const resendVerificationCode = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const message = await authService.resendVerificationCode();
      return message;
    } catch (err: any) {
      console.error('Error al reenviar código:', err);
      setError(err.message || 'Error al reenviar código');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para restablecer contraseña
  const resetPassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const message = await authService.resetPassword(password);
      return message;
    } catch (err: any) {
      console.error('Error al restablecer contraseña:', err);
      setError(err.message || 'Error al restablecer contraseña');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Valores del contexto
  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    forgotPassword,
    verifyCode,
    resendVerificationCode,
    resetPassword,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
