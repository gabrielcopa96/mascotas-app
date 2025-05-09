import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography, Link } from '../ui';
import IconRegistry from '../icons/IconRegistry';
import { COLORS, SIZES } from '../../constants/theme';

interface RegisterLinkProps {
  onPress: () => void;
}

const RegisterLink: React.FC<RegisterLinkProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Typography variant="body1" color={COLORS.white}>
        ¿No tenes una cuenta?
      </Typography>
      <View style={styles.linkContainer}>
        <Link
          title="Unite y gestiona el cuidado de tu mascota"
          onPress={onPress}
          color={COLORS.background.light}
          icon={<IconRegistry name="paw" size={16} color={COLORS.background.light} />}
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

export default RegisterLink;
