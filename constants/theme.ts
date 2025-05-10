import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const COLORS = {
  // Colores principales
  primary: {
    dark: '#121B3B',
    main: '#314AA1',
    light: '#375AD3',
  },
  // Colores de botones
  button: {
    primary: '#5973F5',
    secondary: '#38B4C8',
    tertiary: '#E7F0FF',
  },
  // Colores de fondo
  background: {
    main: '#F7F8FB',
    light: '#FFFFFF',
    accent: '#E7F0FF',
  },
  // Colores de texto
  text: {
    primary: '#121B3B',
    secondary: '#6E7191',
    tertiary: '#A0A3BD',
    white: '#FFFFFF',
  },
  // Colores de estado
  status: {
    success: '#00C48C',
    warning: '#FFB800',
    error: '#FF4D4F',
    info: '#375AD3',
  },
  // Colores de borde
  border: {
    light: '#E7F0FF',
    main: '#D9DBE9',
    dark: '#A0A3BD',
  },
  // Otros colores
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
};

export const SIZES = {
  // Tamaños de fuente
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 32,
  
  // Dimensiones de pantalla
  width,
  height,
  
  // Espaciado
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  
  // Radios de borde
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    round: 999,
  },
};

export const FONTS = {
  regular: {
    fontFamily: 'Outfit_400Regular',
  },
  medium: {
    fontFamily: 'Outfit_500Medium',
  },
  semiBold: {
    fontFamily: 'Outfit_600SemiBold',
  },
  bold: {
    fontFamily: 'Outfit_700Bold',
  },
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

const theme = { COLORS, SIZES, FONTS, SHADOWS };

export default theme;
