import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import IconRegistry from '../icons/IconRegistry';
import Typography from './Typography';
import { COLORS, SIZES } from '../../constants/theme';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  style?: ViewStyle;
}

const Logo: React.FC<LogoProps> = ({
  size = 'medium',
  showText = false,
  style,
}) => {
  // Determinar el tamaño del logo según el prop size
  const getLogoSize = () => {
    switch (size) {
      case 'small':
        return 40;
      case 'medium':
        return 60;
      case 'large':
        return 100;
      default:
        return 60;
    }
  };

  // Determinar el tamaño del texto según el tamaño del logo
  const getTextVariant = () => {
    switch (size) {
      case 'small':
        return 'h5';
      case 'medium':
        return 'h3';
      case 'large':
        return 'h1';
      default:
        return 'h3';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <IconRegistry name="logo" size={getLogoSize()} />
      {showText && (
        <View style={styles.textContainer}>
          <Typography
            variant={getTextVariant()}
            color={COLORS.primary.dark}
            align="center"
          >
            MascotaSalud
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: SIZES.spacing.sm,
  },
});

export default Logo;
