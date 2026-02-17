/**
 * Vibrant & Attractive Mobile Theme for Disaster Management App
 * Modern, eye-catching colors optimized for mobile interfaces
 */

export const Colors = {
  // Primary Colors - Ultra Vibrant
  primary: {
    dark: '#FF1654',      // Vivid Magenta-Red - Main brand
    main: '#FF2E7E',      // Hot Pink - Primary action
    light: '#FF6BA1',     // Light Pink
    lighter: '#FFACC7',   // Soft Pink
  },
  
  // Secondary Colors - Vibrant Cyan/Sky Blue
  secondary: {
    dark: '#0EA5E9',      // Sky Blue
    main: '#00D9FF',      // Cyan - Complementary 
    light: '#7FF7FF',     // Light Cyan
    lighter: '#BFFFFE',   // Ultra light Cyan
  },
  
  // Accent Colors - For alerts and important info
  accent: {
    red: '#FF0A3E',       // Vivid Red - Emergencies
    orange: '#FF6B1A',    // Vibrant Orange - Warnings
    yellow: '#FFD200',    // Bright Yellow - Caution
    green: '#00D98C',     // Vibrant Green - Success
    purple: '#A855F7',    // Vibrant Purple - Special
    blue: '#0066FF',      // Bright Blue - Info
  },
  
  // Gradient Colors - Modern feel
  teal: {
    dark: '#00C9A7',      // Teal
    light: '#2EFFD4',     // Light Teal
    lighter: '#BFFFED',   // Ultra light Teal
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F0F9FF',    // Almost white - light blue tint
    gray100: '#E0F2FE',   // Very light blue
    gray200: '#BAE6FD',   // Light blue-gray
    gray300: '#7DD3FC',   // Border light
    gray400: '#38BDF8',   // Medium
    gray500: '#0EA5E9',   // Medium dark
    gray600: '#0284C7',   // Dark
    gray700: '#075985',   // Darker
    gray800: '#0C2D48',   // Very dark
    gray900: '#0A1929',   // Almost black
  },
  
  // Semantic Colors
  success: '#00D98C',
  error: '#FF0A3E',
  warning: '#FF6B1A',
  info: '#00D9FF',
  
  // Gradients (for backgrounds)
  gradient: {
    primary: ['#FF1654', '#FF6BA1'],      // Magenta-Pink gradient
    secondary: ['#0EA5E9', '#00D9FF'],    // Blue-Cyan gradient
    vibrant: ['#FF1654', '#00D9FF'],      // Pink to Cyan - Full vibrant
    sunset: ['#FF6B1A', '#FFD200'],       // Warm gradient
    ocean: ['#0EA5E9', '#00C9A7'],        // Cool gradient
    fire: ['#FF0A3E', '#FF6B1A'],         // Fire gradient
  },
};

export const textColor = {
  primary: Colors.neutral.gray900,
  secondary: Colors.neutral.gray600,
  tertiary: Colors.neutral.gray500,
  white: Colors.neutral.white,
  light: Colors.neutral.gray100,
};

export const backgroundColor = {
  primary: Colors.neutral.white,
  secondary: Colors.neutral.gray50,
  tertiary: Colors.neutral.gray100,
  dark: Colors.neutral.gray900,
  overlay: 'rgba(0, 0, 0, 0.5)',
};

export const borderColor = {
  light: Colors.neutral.gray200,
  medium: Colors.neutral.gray300,
  dark: Colors.neutral.gray400,
};
