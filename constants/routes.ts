/**
 * Constantes para las rutas de la aplicación
 * Esto nos ayuda a mantener las rutas consistentes en toda la aplicación
 * y evitar errores de tipado con Expo Router
 */

export const ROUTES = {
  // Rutas de autenticación
  AUTH: {
    LOGIN: '/',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
  
  // Rutas principales de la aplicación
  APP: {
    HOME: '/(tabs)',
    EXPLORE: '/(tabs)/explore',
    PROFILE: '/(tabs)/profile',
  },
  
  // Otras rutas
  ONBOARDING: '/onboarding',
} as const;

export type AppRoutes = typeof ROUTES;
