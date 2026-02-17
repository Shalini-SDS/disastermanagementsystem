import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSizes } from '@/styles/spacing';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  style?: ViewStyle;
  onPress?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'default',
  style,
  onPress,
}) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary.lighter;
      case 'secondary':
        return Colors.secondary.lighter;
      case 'danger':
        return '#FFE8EB';
      default:
        return Colors.backgroundColor.primary;
    }
  };

  const getTitleColor = () => {
    switch (variant) {
      case 'primary':
        return Colors.primary.dark;
      case 'secondary':
        return Colors.secondary.dark;
      case 'danger':
        return Colors.accent.red;
      default:
        return Colors.textColor.primary;
    }
  };

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: getBackgroundColor() },
        style,
      ]}
    >
      {title && (
        <Text style={[styles.title, { color: getTitleColor() }]}>
          {title}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    marginBottom: Spacing.md,
  },
});
