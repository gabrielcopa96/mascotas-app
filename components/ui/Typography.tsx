import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2' | 'caption' | 'button';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: TextStyle;
  children: React.ReactNode;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  color,
  align = 'left',
  style,
  children,
  ...props
}) => {
  // Obtener el estilo según la variante
  const getVariantStyle = (): TextStyle => {
    switch (variant) {
      case 'h1':
        return {
          ...FONTS.bold,
          fontSize: SIZES.title,
          lineHeight: SIZES.title * 1.3,
        };
      case 'h2':
        return {
          ...FONTS.bold,
          fontSize: SIZES.xxxl,
          lineHeight: SIZES.xxxl * 1.3,
        };
      case 'h3':
        return {
          ...FONTS.semiBold,
          fontSize: SIZES.xxl,
          lineHeight: SIZES.xxl * 1.3,
        };
      case 'h4':
        return {
          ...FONTS.semiBold,
          fontSize: SIZES.xl,
          lineHeight: SIZES.xl * 1.3,
        };
      case 'h5':
        return {
          ...FONTS.medium,
          fontSize: SIZES.lg,
          lineHeight: SIZES.lg * 1.3,
        };
      case 'h6':
        return {
          ...FONTS.medium,
          fontSize: SIZES.md,
          lineHeight: SIZES.md * 1.3,
        };
      case 'body1':
        return {
          ...FONTS.regular,
          fontSize: SIZES.md,
          lineHeight: SIZES.md * 1.5,
        };
      case 'body2':
        return {
          ...FONTS.regular,
          fontSize: SIZES.sm,
          lineHeight: SIZES.sm * 1.5,
        };
      case 'caption':
        return {
          ...FONTS.regular,
          fontSize: SIZES.xs,
          lineHeight: SIZES.xs * 1.5,
        };
      case 'button':
        return {
          ...FONTS.medium,
          fontSize: SIZES.md,
          lineHeight: SIZES.md * 1.3,
        };
      default:
        return {
          ...FONTS.regular,
          fontSize: SIZES.md,
          lineHeight: SIZES.md * 1.5,
        };
    }
  };

  return (
    <Text
      style={[
        getVariantStyle(),
        {
          color: color || COLORS.text.primary,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Typography;
