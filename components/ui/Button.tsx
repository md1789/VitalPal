import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { ButtonProps } from '../../types';

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onPress, 
  disabled, 
  style 
}) => {
  // Fix: Remove the strict typing and let TypeScript infer the type
  const getButtonStyle = () => {
    const baseStyle = [styles.button];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.buttonPrimary);
        break;
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      case 'ghost':
        baseStyle.push(styles.buttonGhost);
        break;
    }
    
    switch (size) {
      case 'sm':
        baseStyle.push(styles.buttonSm);
        break;
      case 'md':
        baseStyle.push(styles.buttonMd);
        break;
      case 'lg':
        baseStyle.push(styles.buttonLg);
        break;
    }
    
    if (disabled) {
      baseStyle.push({ opacity: 0.5 });
    }
    
    return baseStyle;
  };

  // Fix: Remove the strict typing here too
  const getTextStyle = () => {
    const baseStyle = [styles.buttonText];
    
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.buttonTextPrimary);
        break;
      case 'secondary':
        baseStyle.push(styles.buttonTextSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonTextOutline);
        break;
      case 'ghost':
        baseStyle.push(styles.buttonTextGhost);
        break;
    }
    
    switch (size) {
      case 'sm':
        baseStyle.push(styles.buttonTextSm);
        break;
      case 'md':
        baseStyle.push(styles.buttonTextMd);
        break;
      case 'lg':
        baseStyle.push(styles.buttonTextLg);
        break;
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={getTextStyle()}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary[500],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: Colors.primary[500],
    backgroundColor: Colors.transparent,
  },
  buttonGhost: {
    backgroundColor: Colors.transparent,
  },
  buttonSm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  buttonMd: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    minHeight: 48,
  },
  buttonLg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    minHeight: 56,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: Colors.white,
  },
  buttonTextSecondary: {
    color: Colors.gray[700],
  },
  buttonTextOutline: {
    color: Colors.primary[500],
  },
  buttonTextGhost: {
    color: Colors.gray[600],
  },
  buttonTextSm: {
    fontSize: 14,
  },
  buttonTextMd: {
    fontSize: 16,
  },
  buttonTextLg: {
    fontSize: 18,
  },
});

export default Button;