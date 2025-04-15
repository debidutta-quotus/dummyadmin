// src/theme.js
const theme = {
  colors: {
    primary: '#007bff', // Example primary blue
    secondary: '#6c757d', // Example gray
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    background: '#ffffff', // Default background color
    text: '#333333', // Default text color
  },
  fontSizes: {
    small: '0.875rem', // 14px
    medium: '1rem', // 16px (base size)
    large: '1.25rem', // 20px
    xlarge: '1.5rem', // 24px
    xxlarge: '2rem', // 32px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
    // ... add more weights as needed
  },
  spacing: {
    // Use consistent spacing units (e.g., multiples of 8px)
    xxsmall: '4px',
    xsmall: '8px',
    small: '12px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '48px',
    // ... add more spacing values as needed
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    // ... add more border radius values as needed
  },
  boxShadow: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    large: '0 6px 12px rgba(0, 0, 0, 0.2)',
    // ... add more box shadow values as needed
  },
  breakpoints: {
    // Common breakpoints for responsive design
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
  // ... any other theme properties you need
};

export default theme;
