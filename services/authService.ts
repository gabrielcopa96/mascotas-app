import * as SecureStore from 'expo-secure-store';
import axiosInstance from '../utils/axiosConfig';
import { API_URL } from '../utils/axiosConfig';

// Tipos para la autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  email: string;
  code: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
}

export interface ApiResponse<T> {
  statusCode: number;
  timestamp: string;
  path: string;
  data: T;
}

export interface AuthData {
  message: string;
  token: string;
  user: User;
}

export interface PasswordResetData {
  message: string;
  email?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

// Claves para almacenamiento seguro
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Clase de servicio de autenticación
class AuthService {
  // Variable para almacenar temporalmente el email durante el proceso de recuperación de contraseña
  private tempEmail: string = '';
  // Función de login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthData>>(
        '/auth/login',
        credentials
      );

      const authData = response.data.data;
      
      // Crear objeto de respuesta de autenticación
      const authResponse: AuthResponse = {
        token: authData.token,
        user: authData.user
      };

      // Guardar el token y los datos del usuario
      await this.saveAuthData(authResponse);

      return authResponse;
    } catch (error: any) {
      console.error('Error en login:', error);
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        const errorMessage = error.response.data?.message || 'Error al iniciar sesión';
        throw new Error(errorMessage);
      }
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  }

  // Función de login con Google
  async loginWithGoogle(): Promise<AuthResponse> {
    try {
      // Aquí iría la integración con Google Auth para obtener el token de Google
      // Por ahora, esta funcionalidad no está implementada en la API
      throw new Error('La autenticación con Google aún no está disponible');
      
      // Cuando esté disponible, sería algo así:
      // 1. Obtener token de Google
      // 2. Enviar token a nuestra API
      // const response = await axios.post<ApiResponse<AuthData>>(
      //   `${API_URL}/auth/google`,
      //   { token: googleToken }
      // );
      // 3. Procesar respuesta similar a login normal
    } catch (error: any) {
      console.error('Error en login con Google:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al iniciar sesión con Google';
        throw new Error(errorMessage);
      }
      throw new Error(error.message || 'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
    }
  }
  
  // Función de registro
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthData>>(
        '/auth/register',
        credentials
      );

      const authData = response.data.data;
      
      // Crear objeto de respuesta de autenticación
      const authResponse: AuthResponse = {
        token: authData.token,
        user: authData.user
      };

      // Guardar el token y los datos del usuario
      await this.saveAuthData(authResponse);

      return authResponse;
    } catch (error: any) {
      console.error('Error en registro:', error);
      if (error.response) {
        // El servidor respondió con un código de estado diferente de 2xx
        const errorMessage = error.response.data?.message || 'Error al registrar usuario';
        throw new Error(errorMessage);
      }
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  }

  // Función de logout
  async logout(): Promise<void> {
    try {
      // Eliminar token y datos de usuario del almacenamiento seguro
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
      
      // Limpiar cualquier otro dato de sesión que pueda existir
      this.setTempEmail('');
      
      // Aquí se podría agregar una llamada al backend para invalidar el token
      // cuando se implemente ese endpoint
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  }

  // Verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (!token) return false;
      
      // Verificar si el token es válido localmente (comprobando que no esté expirado)
      // Nota: Esto es una validación básica, idealmente se debería verificar con el backend
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
        const currentTime = Date.now();
        
        if (currentTime >= expirationTime) {
          // Token expirado, limpiar datos de autenticación
          await this.logout();
          return false;
        }
        
        return true;
      } catch (parseError) {
        console.error('Error al analizar el token:', parseError);
        // Si hay un error al analizar el token, lo consideramos inválido
        await this.logout();
        return false;
      }
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  }

  // Obtener el token de autenticación
  async getToken(): Promise<string | null> {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      return token;
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  }

  // Obtener los datos del usuario
  async getUser(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  }

  // Guardar los datos de autenticación
  async saveAuthData(authResponse: AuthResponse): Promise<void> {
    try {
      // Guardar token y datos de usuario en el almacenamiento seguro
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, authResponse.token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(authResponse.user));
      
      // Configurar el token en el interceptor de Axios para futuras solicitudes
      // Esto se hace automáticamente en el interceptor, pero lo mencionamos aquí para claridad
    } catch (error) {
      console.error('Error al guardar datos de autenticación:', error);
      throw error;
    }
  }

  // Guardar email temporalmente para el proceso de recuperación de contraseña
  setTempEmail(email: string): void {
    this.tempEmail = email;
  }

  // Obtener el email temporal
  getTempEmail(): string {
    return this.tempEmail;
  }

  // Solicitar código de recuperación de contraseña
  async forgotPassword(request: ForgotPasswordRequest): Promise<string> {
    try {
      const response = await axiosInstance.post<ApiResponse<PasswordResetData>>(
        '/auth/forgot-password',
        request
      );

      // Guardar el email para usarlo en los siguientes pasos
      this.setTempEmail(request.email);
      
      return response.data.data.message;
    } catch (error: any) {
      console.error('Error en solicitud de recuperación de contraseña:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al solicitar recuperación de contraseña';
        throw new Error(errorMessage);
      }
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  }

  // Verificar código de recuperación de contraseña
  async verifyCode(code: string): Promise<string> {
    try {
      const email = this.getTempEmail();
      if (!email) {
        throw new Error('No hay un email registrado para la recuperación de contraseña');
      }

      const request: VerifyCodeRequest = {
        email,
        code
      };

      const response = await axiosInstance.post<ApiResponse<PasswordResetData>>(
        '/auth/verify-code',
        request
      );
      
      return response.data.data.message;
    } catch (error: any) {
      console.error('Error en verificación de código:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Código inválido o expirado';
        throw new Error(errorMessage);
      }
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  }

  // Reenviar código de verificación
  async resendVerificationCode(): Promise<string> {
    try {
      const email = this.getTempEmail();
      if (!email) {
        throw new Error('No hay un email registrado para la recuperación de contraseña');
      }

      const request: ForgotPasswordRequest = { email };
      const response = await axiosInstance.post<ApiResponse<PasswordResetData>>(
        '/auth/resend-code',
        request
      );
      
      return response.data.data.message;
    } catch (error: any) {
      console.error('Error al reenviar código:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al reenviar código';
        throw new Error(errorMessage);
      }
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  }

  // Restablecer contraseña
  async resetPassword(password: string): Promise<string> {
    try {
      const email = this.getTempEmail();
      if (!email) {
        throw new Error('No hay un email registrado para la recuperación de contraseña');
      }

      // Obtener el código de la memoria del dispositivo o estado de la aplicación
      // En una implementación real, este código debería estar almacenado en el estado de la aplicación
      // después de la verificación exitosa
      const code = ''; // Este valor debería venir del estado de la aplicación

      const request: ResetPasswordRequest = {
        email,
        code,
        password
      };

      const response = await axiosInstance.post<ApiResponse<PasswordResetData>>(
        '/auth/reset-password',
        request
      );
      
      // Limpiar el email temporal después de restablecer la contraseña
      this.setTempEmail('');
      
      return response.data.data.message;
    } catch (error: any) {
      console.error('Error al restablecer contraseña:', error);
      if (error.response) {
        const errorMessage = error.response.data?.message || 'Error al restablecer contraseña';
        throw new Error(errorMessage);
      }
      throw new Error('Error al conectar con el servidor. Por favor, inténtalo de nuevo.');
    }
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();
