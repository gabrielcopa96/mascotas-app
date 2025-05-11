import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '../../components/ui';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  
  const handleAvatarPress = () => {
    // Navegar a la pantalla de perfil del usuario
    router.push('/(tabs)/profile');
  };

  return (
    <View style={styles.container}>
      {/* Header con fondo degradado */}
      <GradientBackground
        colors={[COLORS.primary.dark, COLORS.primary.main] as const}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header as any}
      >
        <View style={styles.headerContent}>
          {/* Avatar y nombre del usuario */}
          <TouchableOpacity 
            style={styles.userInfo}
            onPress={handleAvatarPress}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {user ? user.firstName.charAt(0) + user.lastName.charAt(0) : 'U'}
                </Text>
              </View>
            </View>
            <Text style={styles.userName}>
              {user ? `${user.firstName} ${user.lastName}` : 'Usuario'}
            </Text>
          </TouchableOpacity>
          
          {/* Icono de notificaciones */}
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </GradientBackground>

      {/* Contenido principal */}
      <ScrollView style={styles.content}>
        {/* Aquí irá el resto del contenido de la pantalla principal */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.main,
  },
  header: {
    height: 120,
    paddingTop: 40, // Para tener en cuenta la barra de estado
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    color: COLORS.white,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.primary.main,
    fontSize: SIZES.lg,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
