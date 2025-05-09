import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import Typography from './Typography';

interface DividerProps {
  text?: string;
  color?: string;
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({
  text,
  color = COLORS.border.main,
  style,
}) => {
  if (text) {
    return (
      <View style={[styles.containerWithText, style]}>
        <View style={[styles.line, { backgroundColor: color }]} />
        <View style={styles.textContainer}>
          <Typography variant="body2" color={COLORS.text.secondary}>
            {text}
          </Typography>
        </View>
        <View style={[styles.line, { backgroundColor: color }]} />
      </View>
    );
  }

  return <View style={[styles.line, { backgroundColor: color }, style]} />;
};

const styles = StyleSheet.create({
  containerWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border.main,
  },
  textContainer: {
    paddingHorizontal: SIZES.spacing.md,
  },
});

export default Divider;
