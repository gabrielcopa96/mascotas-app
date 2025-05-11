import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  touched?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  touched,
  keyboardType = 'default',
  autoCapitalize = 'none',
  icon,
  iconPosition = 'right',
  onIconPress,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  onBlur,
  onFocus,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  // Determinar el color del borde según el estado
  const getBorderColor = () => {
    if (error && touched) {
      return COLORS.status.error;
    }
    // Ya no cambiamos el color al enfocar
    return COLORS.border.main;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: editable ? COLORS.white : COLORS.background.main,
          },
        ]}
      >
        {icon && iconPosition === 'left' && (
          <TouchableOpacity
            onPress={onIconPress}
            style={styles.iconLeft}
            disabled={!onIconPress}
          >
            {icon}
          </TouchableOpacity>
        )}
        <TextInput
          style={[
            styles.input,
            {
              paddingLeft: icon && iconPosition === 'left' ? 0 : SIZES.spacing.md,
              paddingRight: icon && iconPosition === 'right' ? 0 : SIZES.spacing.md,
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          editable={editable}
        />
        {icon && iconPosition === 'right' && (
          <TouchableOpacity
            onPress={onIconPress}
            style={styles.iconRight}
            disabled={!onIconPress}
          >
            {icon}
          </TouchableOpacity>
        )}
      </View>
      {error && touched && (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.spacing.sm, // Reducido de md a sm
    width: '100%',
  },
  labelContainer: {
    marginBottom: SIZES.spacing.xs,
  },
  label: {
    ...FONTS.medium,
    fontSize: SIZES.md,
    color: COLORS.text.primary,
  },
  required: {
    color: COLORS.status.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.borderRadius.md,
    height: 50, // Reducido de 56 a 50
    // Eliminamos overflow: 'hidden' para que el borde no se corte
  },
  input: {
    flex: 1,
    height: '100%',
    ...FONTS.regular,
    fontSize: SIZES.md,
    color: COLORS.text.primary,
  },
  iconLeft: {
    paddingLeft: SIZES.spacing.md,
    height: '100%',
    justifyContent: 'center',
  },
  iconRight: {
    paddingRight: SIZES.spacing.md,
    height: '100%',
    justifyContent: 'center',
  },
  errorText: {
    ...FONTS.regular,
    fontSize: 10, // Reducimos el tamaño de la fuente
    color: COLORS.status.error,
    marginTop: 2, // Reducimos el margen superior
    marginBottom: 0, // Eliminamos cualquier margen inferior
  },
});

export default Input;
