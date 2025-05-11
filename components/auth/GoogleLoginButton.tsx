import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '../ui';
import IconRegistry from '../icons/IconRegistry';

interface GoogleLoginButtonProps {
  onPress: () => void;
  isLoading?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
  onPress,
  isLoading = false,
}) => {
  return (
    <Button
      title="Iniciar sesión con Google"
      onPress={onPress}
      variant="google"
      fullWidth
      loading={isLoading}
      icon={<IconRegistry name="google" size={20} />}
      iconPosition="left"
    />
  );
};

export default GoogleLoginButton;
