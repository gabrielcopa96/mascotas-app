import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

interface LinkProps {
  title: string;
  onPress: () => void;
  color?: string;
  underline?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const Link: React.FC<LinkProps> = ({
  title,
  onPress,
  color = COLORS.primary.light,
  underline = true,
  icon,
  iconPosition = 'right',
  style,
  textStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && iconPosition === 'left' && icon}
      <Text
        style={[
          styles.text,
          {
            color,
            textDecorationLine: underline ? 'underline' : 'none',
            marginLeft: icon && iconPosition === 'left' ? SIZES.spacing.xs : 0,
            marginRight: icon && iconPosition === 'right' ? SIZES.spacing.xs : 0,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
      {icon && iconPosition === 'right' && icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...FONTS.medium,
    fontSize: SIZES.md,
  },
});

export default Link;
