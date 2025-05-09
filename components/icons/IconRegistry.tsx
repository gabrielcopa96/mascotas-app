import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, {
  Path,
  G,
  Circle,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Line,
  Polyline,
} from "react-native-svg";
import { COLORS } from "../../constants/theme";

export type IconName =
  | "logo"
  | "google"
  | "eye"
  | "eye-off"
  | "user"
  | "lock"
  | "email"
  | "arrow-right"
  | "paw"
  | "calendar"
  | "card"
  | "home"
  | "profile"
  | "notification";

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: any;
}

const IconRegistry: React.FC<IconProps> = ({
  name,
  size = 24,
  color = COLORS.primary.light,
  style,
}) => {
  const renderIcon = () => {
    switch (name) {
      case "logo":
        return (
          <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
            <Defs>
              <LinearGradient
                id="logoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <Stop offset="0%" stopColor={COLORS.primary.dark} />
                <Stop offset="100%" stopColor={COLORS.primary.main} />
              </LinearGradient>
            </Defs>
            {/* Diamond shape */}
            <Path d="M50 5L95 50L50 95L5 50L50 5Z" fill="url(#logoGradient)" />
            {/* Pet silhouettes - simplified representation */}
            <Path
              d="M35 40C35 40 30 50 40 65C40 65 25 60 25 45C25 45 30 35 35 40Z"
              fill="#000"
              opacity="0.6"
            />
            <Path
              d="M65 40C65 40 70 50 60 65C60 65 75 60 75 45C75 45 70 35 65 40Z"
              fill="#000"
              opacity="0.6"
            />
            {/* Star/sparkle */}
            <Path
              d="M80 30L82 35L87 37L82 39L80 44L78 39L73 37L78 35L80 30Z"
              fill="#FFF"
            />
          </Svg>
        );

      case "google":
        return (
          <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <Path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <Path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <Path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </Svg>
        );

      case "eye":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <Circle cx="12" cy="12" r="3" />
          </Svg>
        );

      case "eye-off":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <Line x1="1" y1="1" x2="23" y2="23" />
          </Svg>
        );

      case "user":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <Circle cx="12" cy="7" r="4" />
          </Svg>
        );

      case "lock":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </Svg>
        );

      case "email":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <Polyline points="22,6 12,13 2,6" />
          </Svg>
        );

      case "arrow-right":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Line x1="5" y1="12" x2="19" y2="12" />
            <Polyline points="12 5 19 12 12 19" />
          </Svg>
        );

      case "paw":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M8.5 2C7.12 2 6 3.12 6 4.5C6 5.88 7.12 7 8.5 7S11 5.88 11 4.5C11 3.12 9.88 2 8.5 2Z" />
            <Path d="M15.5 2C14.12 2 13 3.12 13 4.5C13 5.88 14.12 7 15.5 7S18 5.88 18 4.5C18 3.12 16.88 2 15.5 2Z" />
            <Path d="M5 10C3.62 10 2.5 11.12 2.5 12.5C2.5 13.88 3.62 15 5 15S7.5 13.88 7.5 12.5C7.5 11.12 6.38 10 5 10Z" />
            <Path d="M19 10C17.62 10 16.5 11.12 16.5 12.5C16.5 13.88 17.62 15 19 15S21.5 13.88 21.5 12.5C21.5 11.12 20.38 10 19 10Z" />
            <Path d="M12 8C9.79 8 8 11.58 8 16C8 20.42 9.79 22 12 22C14.21 22 16 20.42 16 16C16 11.58 14.21 8 12 8Z" />
          </Svg>
        );

      case "calendar":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <Line x1="16" y1="2" x2="16" y2="6" />
            <Line x1="8" y1="2" x2="8" y2="6" />
            <Line x1="3" y1="10" x2="21" y2="10" />
          </Svg>
        );

      case "card":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <Line x1="1" y1="10" x2="23" y2="10" />
          </Svg>
        );

      case "home":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <Polyline points="9 22 9 12 15 12 15 22" />
          </Svg>
        );

      case "profile":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <Circle cx="12" cy="7" r="4" />
          </Svg>
        );

      case "notification":
        return (
          <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <Path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </Svg>
        );

      default:
        return <View />;
    }
  };

  return <View style={[styles.container, style]}>{renderIcon()}</View>;
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconRegistry;
