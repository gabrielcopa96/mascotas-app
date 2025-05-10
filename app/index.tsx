import { Redirect } from 'expo-router';

export default function Index() {
  // Redirigir a la pantalla de login
  return <Redirect href="/(auth)/login" />;
}
