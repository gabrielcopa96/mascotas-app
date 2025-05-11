import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'google';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}) => {
  // Determinar el estilo del botón según la variante
  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.button.primary,
          borderColor: COLORS.button.primary,
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.button.secondary,
          borderColor: COLORS.button.secondary,
        };
      case 'tertiary':
        return {
          backgroundColor: COLORS.button.tertiary,
          borderColor: COLORS.button.tertiary,
        };
      case 'google':
        return {
          backgroundColor: COLORS.white,
          borderColor: COLORS.primary.dark,
        };
      default:
        return {
          backgroundColor: COLORS.button.primary,
          borderColor: COLORS.button.primary,
        };
    }
  };

  // Determinar el estilo del texto según la variante
  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          color: COLORS.text.white,
        };
      case 'tertiary':
        return {
          color: COLORS.primary.light,
        };
      case 'google':
        return {
          color: COLORS.primary.dark,
        };
      default:
        return {
          color: COLORS.text.white,
        };
    }
  };

  // Determinar el tamaño del botón
  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: SIZES.spacing.xs,
          paddingHorizontal: SIZES.spacing.md,
          borderRadius: SIZES.borderRadius.sm,
        };
      case 'medium':
        return {
          paddingVertical: SIZES.spacing.sm,
          paddingHorizontal: SIZES.spacing.lg,
          borderRadius: SIZES.borderRadius.md,
        };
      case 'large':
        return {
          paddingVertical: SIZES.spacing.md,
          paddingHorizontal: SIZES.spacing.xl,
          borderRadius: SIZES.borderRadius.md,
        };
      default:
        return {
          paddingVertical: SIZES.spacing.sm,
          paddingHorizontal: SIZES.spacing.lg,
          borderRadius: SIZES.borderRadius.md,
        };
    }
  };

  // Determinar el tamaño del texto según el tamaño del botón
  const getTextSizeStyle = () => {
    switch (size) {
      case 'small':
        return {
          fontSize: SIZES.md,
        };
      case 'medium':
        return {
          fontSize: SIZES.lg,
        };
      case 'large':
        return {
          fontSize: SIZES.xl,
        };
      default:
        return {
          fontSize: SIZES.lg,
        };
    }
  };

  // Estilos combinados para el botón
  const buttonStyles = [
    styles.button,
    getButtonStyle(),
    getSizeStyle(),
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  // Estilos combinados para el texto
  const textStyles = [
    styles.text,
    getTextStyle(),
    getTextSizeStyle(),
    textStyle,
  ];

  // Color del indicador de carga según la variante
  const getLoaderColor = () => {
    if (variant === 'tertiary') {
      return COLORS.primary.light;
    }
    return COLORS.white;
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <View style={styles.contentContainer}>
        {loading && (
          <ActivityIndicator 
            size="small" 
            color={getLoaderColor()} 
            style={styles.loader} 
          />
        )}
        {(!loading || variant === 'google') && (
          <>
            {icon && iconPosition === 'left' && (
              <View style={styles.iconLeft}>{icon}</View>
            )}
            <Text style={[textStyles, loading && styles.fadedText]}>{title}</Text>
            {icon && iconPosition === 'right' && (
              <View style={styles.iconRight}>{icon}</View>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...FONTS.medium,
    textAlign: 'center',
  },
  fadedText: {
    opacity: 0.7,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  loader: {
    marginRight: SIZES.spacing.xs,
  },
  iconLeft: {
    marginRight: SIZES.spacing.xs,
  },
  iconRight: {
    marginLeft: SIZES.spacing.xs,
  },
});

export default Button;
