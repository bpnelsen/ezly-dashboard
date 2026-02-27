/**
 * EZLY Design System - Theme & Design Tokens
 * 
 * This file defines all design tokens used across the application:
 * - Colors (primary, secondary, status, neutral)
 * - Typography (font scales)
 * - Spacing (padding, margins, gaps)
 * - Shadows (elevation system)
 * - Border radius consistency
 * - Animation timing
 */

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',  // Primary blue
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
  // Secondary Brand Colors
  secondary: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Secondary green
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#145231',
  },
  
  // Neutral/Gray Colors
  neutral: {
    0: '#ffffff',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // Status Colors
  status: {
    success: '#10b981',  // Green
    warning: '#f59e0b',  // Amber
    error: '#ef4444',    // Red
    info: '#3b82f6',     // Blue
  },
  
  // Semantic Colors
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },
  
  text: {
    primary: '#111827',
    secondary: '#4b5563',
    tertiary: '#9ca3af',
    inverse: '#ffffff',
  },
  
  border: {
    light: '#e5e7eb',
    default: '#d1d5db',
    dark: '#9ca3af',
  },
};

export const typography = {
  // Font sizes (rem units)
  size: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  
  // Font weights
  weight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: '-0.01em',
    normal: '0em',
    wide: '0.025em',
  },
  
  // Preset typography combinations
  presets: {
    h1: {
      fontSize: '2.25rem',    // 36px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '1.875rem',   // 30px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',     // 24px
      fontWeight: 600,
      lineHeight: 1.25,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.25rem',    // 20px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h5: {
      fontSize: '1.125rem',   // 18px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1rem',       // 16px
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    body: {
      fontSize: '1rem',       // 16px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    bodySmall: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    label: {
      fontSize: '0.875rem',   // 14px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    caption: {
      fontSize: '0.75rem',    // 12px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '0.025em',
    },
  },
};

export const spacing = {
  // Spacing scale (px)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};

export const radius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.375rem', // 6px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  full: '9999px',
};

export const shadows = {
  none: 'none',
  
  // Elevation system
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  
  // Focus shadow
  focus: '0 0 0 3px rgba(59, 130, 246, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.5)',
  
  // Inset shadow
  inset: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
};

export const animation = {
  // Transition durations (ms)
  duration: {
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  
  // Easing functions
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  animation,
  breakpoints,
};

export type Theme = typeof theme;
