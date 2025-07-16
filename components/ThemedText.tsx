import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors } from '../constants/Colors';

export interface ThemedTextProps extends TextProps {
  type?: 'default' | 'title' | 'subtitle' | 'link';
}

export function ThemedText({ style, type = 'default', ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray[800],
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    color: Colors.gray[900],
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.gray[800],
  },
  link: {
    fontSize: 16,
    lineHeight: 30,
    color: Colors.primary[500],
  },
});