import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { COLORS, SIZES, SHADOWS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'outlined' | 'elevated';
  color?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  onPress,
  variant = 'default',
  color,
  style,
  contentStyle,
  disabled = false,
}) => {
  // Determinar el estilo de la tarjeta según la variante
  const getCardStyle = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: COLORS.background.light,
          borderWidth: 1,
          borderColor: COLORS.border.main,
          ...SHADOWS.small,
        };
      case 'elevated':
        return {
          backgroundColor: color || COLORS.background.light,
          ...SHADOWS.medium,
        };
      default:
        return {
          backgroundColor: color || COLORS.background.light,
        };
    }
  };

  const cardStyles = [styles.card, getCardStyle(), style];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyles}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.borderRadius.md,
    overflow: 'hidden',
  },
  content: {
    padding: SIZES.spacing.md,
  },
});

export default Card;
