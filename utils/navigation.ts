import { router } from 'expo-router';

/**
 * Utilidad para navegar a una ruta específica
 * Esta función es un wrapper alrededor de router.push que maneja correctamente las rutas
 * @param route Ruta a la que navegar
 */
export const navigateTo = (route: string) => {
  // Asegurarse de que la ruta comienza con '/'
  const formattedRoute = route.startsWith('/') ? route : `/${route}`;
  
  // Usar router.push para navegar a la ruta
  router.push(formattedRoute as any);
};

/**
 * Utilidad para reemplazar la ruta actual
 * Esta función es un wrapper alrededor de router.replace que maneja correctamente las rutas
 * @param route Ruta a la que navegar
 */
export const replaceRoute = (route: string) => {
  // Asegurarse de que la ruta comienza con '/'
  const formattedRoute = route.startsWith('/') ? route : `/${route}`;
  
  // Usar router.replace para reemplazar la ruta actual
  router.replace(formattedRoute as any);
};

/**
 * Navegar a la pantalla de inicio de sesión
 */
export const navigateToLogin = () => {
  replaceRoute('/');
};

/**
 * Navegar a la pantalla de registro
 */
export const navigateToRegister = () => {
  navigateTo('/register');
};

/**
 * Navegar a la pantalla principal (dashboard)
 */
export const navigateToHome = () => {
  replaceRoute('/(tabs)');
};

/**
 * Navegar a la pantalla de recuperación de contraseña
 */
export const navigateToForgotPassword = () => {
  navigateTo('/forgot-password');
};
