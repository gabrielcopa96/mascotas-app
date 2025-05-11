import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, Link } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';

interface LoginLinkProps {
  onPress: () => void;
}

const LoginLink: React.FC<LoginLinkProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Typography variant="body1" color={COLORS.text.primary}>
        ¿Ya tenes una cuenta?
      </Typography>
      <View style={styles.linkContainer}>
        <Link
          title="Inicia sesión"
          onPress={onPress}
          color={COLORS.primary.light}
          icon={<IconRegistry name="paw" size={16} color={COLORS.primary.light} />}
          iconPosition="left"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: SIZES.spacing.xl,
  },
  linkContainer: {
    marginTop: SIZES.spacing.xs,
  },
});

export default LoginLink;
