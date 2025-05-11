import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GradientBackground } from '../../components/ui';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Manejar cierre de sesión
  const handleLogout = async () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, cerrar sesión",
          onPress: async () => {
            try {
              await logout();
              // Navegar a la pantalla de login
              router.replace('/(auth)/login');
            } catch (err) {
              Alert.alert('Error', 'No se pudo cerrar sesión. Intenta nuevamente.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header simple */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.primary.main} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi Perfil</Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      {/* Contenido del perfil */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Información del perfil */}
        <View style={styles.profileInfo}>
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
          <Text style={styles.userEmail}>
            {user ? user.email : 'usuario@ejemplo.com'}
          </Text>
        </View>

        {/* Opciones de perfil */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="person-outline" size={24} color={COLORS.primary.main} />
            <Text style={styles.optionText}>Datos personales</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="paw-outline" size={24} color={COLORS.primary.main} />
            <Text style={styles.optionText}>Mis mascotas</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="card-outline" size={24} color={COLORS.primary.main} />
            <Text style={styles.optionText}>Métodos de pago</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="notifications-outline" size={24} color={COLORS.primary.main} />
            <Text style={styles.optionText}>Notificaciones</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.optionItem}>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.primary.main} />
            <Text style={styles.optionText}>Ayuda y soporte</Text>
            <Ionicons name="chevron-forward" size={20} color={COLORS.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Botón de cerrar sesión */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color={COLORS.status.error} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    height: 80,
    paddingTop: 40, // Para tener en cuenta la barra de estado
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.text.primary,
    fontSize: SIZES.xl,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    ...SHADOWS.medium,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: COLORS.primary.main,
    fontSize: SIZES.xxxl,
    fontWeight: 'bold',
  },
  userName: {
    color: COLORS.text.primary,
    fontSize: SIZES.xl,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: COLORS.text.secondary,
    fontSize: SIZES.md,
  },
  optionsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius.md,
    marginBottom: 20,
    overflow: 'hidden',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border.light,
  },
  optionText: {
    flex: 1,
    marginLeft: 15,
    color: COLORS.text.primary,
    fontSize: SIZES.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: SIZES.borderRadius.md,
    marginBottom: 30,
  },
  logoutText: {
    marginLeft: 10,
    color: COLORS.status.error,
    fontSize: SIZES.md,
    fontWeight: 'bold',
  },
});
