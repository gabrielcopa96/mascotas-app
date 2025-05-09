import * as SecureStore from 'expo-secure-store';

// Tipos para la autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  email: string;
  // Otros campos del usuario
}

// Claves para almacenamiento seguro
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Clase de servicio de autenticación
class AuthService {
  // Función de login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Aquí iría la llamada a la API real
      // Por ahora, simulamos una respuesta exitosa
      const mockResponse: AuthResponse = {
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: '1',
          name: 'Usuario de Prueba',
          email: credentials.email,
        },
      };

      // Guardar el token y los datos del usuario
      await this.saveAuthData(mockResponse);

      return mockResponse;
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  }

  // Función de login con Google
  async loginWithGoogle(): Promise<AuthResponse> {
    try {
      // Aquí iría la integración con Google Auth
      // Por ahora, simulamos una respuesta exitosa
      const mockResponse: AuthResponse = {
        token: 'mock_google_jwt_token_' + Date.now(),
        user: {
          id: '2',
          name: 'Usuario de Google',
          email: 'usuario.google@example.com',
        },
      };

      // Guardar el token y los datos del usuario
      await this.saveAuthData(mockResponse);

      return mockResponse;
    } catch (error) {
      console.error('Error en login con Google:', error);
      throw new Error('Error al iniciar sesión con Google. Por favor, inténtalo de nuevo.');
    }
  }

  // Función de logout
  async logout(): Promise<void> {
    try {
      // Eliminar los datos de autenticación
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
      console.error('Error en logout:', error);
      throw new Error('Error al cerrar sesión.');
    }
  }

  // Verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      return !!token;
    } catch (error) {
      console.error('Error al verificar autenticación:', error);
      return false;
    }
  }

  // Obtener el token de autenticación
  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
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
  private async saveAuthData(authResponse: AuthResponse): Promise<void> {
    try {
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, authResponse.token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(authResponse.user));
    } catch (error) {
      console.error('Error al guardar datos de autenticación:', error);
      throw new Error('Error al guardar los datos de sesión.');
    }
  }
}

// Exportar una instancia única del servicio
export const authService = new AuthService();
