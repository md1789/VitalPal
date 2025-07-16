import React from 'react';
import { View, ViewProps } from 'react-native';
import { Colors } from '../constants/Colors';

export interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = lightColor || Colors.white;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}