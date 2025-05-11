import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Typography from './Typography';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onValueChange: (checked: boolean) => void;
  error?: string;
  style?: StyleProp<ViewStyle>;
  onLabelPress?: () => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onValueChange,
  error,
  style,
  onLabelPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => onValueChange(!checked)}
        activeOpacity={0.7}
      >
        <View style={[
          styles.checkbox,
          checked ? styles.checkboxChecked : styles.checkboxUnchecked,
          error ? styles.checkboxError : null
        ]}>
          {checked && (
            <IconRegistry
              name="paw"
              size={14}
              color={COLORS.white}
            />
          )}
        </View>
        <TouchableOpacity 
          onPress={onLabelPress} 
          disabled={!onLabelPress}
          activeOpacity={onLabelPress ? 0.7 : 1}
        >
          <Typography
            variant="body2"
            color={onLabelPress ? COLORS.primary.light : COLORS.text.primary}
            style={styles.label}
          >
            {label}
          </Typography>
        </TouchableOpacity>
      </TouchableOpacity>
      
      {error ? (
        <Typography
          variant="caption"
          color="#FF3B30"
          style={styles.errorText}
        >
          {error}
        </Typography>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.spacing.sm,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.spacing.sm,
  },
  checkboxUnchecked: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border.dark,
  },
  checkboxChecked: {
    backgroundColor: COLORS.button.primary,
    borderWidth: 1,
    borderColor: COLORS.button.primary,
  },
  checkboxError: {
    borderColor: '#FF3B30',
  },
  label: {
    flex: 1,
  },

  errorText: {
    marginTop: 4,
    marginLeft: 30, // Alineado con el texto del label
  },
});

export default Checkbox;
