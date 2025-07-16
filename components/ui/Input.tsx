import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { InputProps } from '../../types';

const Input: React.FC<InputProps> = ({ 
  placeholder, 
  value, 
  onChangeText, 
  label, 
  error, 
  secureTextEntry = false, 
  style 
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={Colors.gray[400]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray[700],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: Colors.white,
    color: Colors.gray[800],
  },
  inputError: {
    borderColor: Colors.red[500],
  },
  errorText: {
    color: Colors.red[500],
    fontSize: 14,
    marginTop: 4,
  },
});

export default Input;