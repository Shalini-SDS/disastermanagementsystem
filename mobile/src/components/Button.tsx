import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes } from '@/styles/spacing';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return Colors.neutral.gray300;
    switch (variant) {
      case 'primary':
        return Colors.primary.dark;
      case 'secondary':
        return Colors.secondary.light;
      case 'danger':
        return Colors.accent.red;
      case 'success':
        return Colors.accent.green;
      case 'outline':
        return 'transparent';
      default:
        return Colors.primary.dark;
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') return Colors.primary.dark;
    return undefined;
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return Spacing.sm;
      case 'medium':
        return Spacing.md;
      case 'large':
        return Spacing.lg;
      default:
        return Spacing.md;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return FontSizes.sm;
      case 'medium':
        return FontSizes.base;
      case 'large':
        return FontSizes.lg;
      default:
        return FontSizes.base;
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return Colors.primary.dark;
    return Colors.neutral.white;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 2 : 0,
          paddingVertical: getPadding(),
          paddingHorizontal: getPadding() * 1.5,
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
    >
      <View style={styles.content}>
        {icon}
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: getFontSize(),
            },
            textStyle,
          ]}
        >
          {loading ? 'Loading...' : title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  text: {
    fontWeight: '600',
  },
});
