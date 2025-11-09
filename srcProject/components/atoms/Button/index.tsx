import {StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import React from 'react';

type ButtonProps = {
  label: string;
  color?: string;
  textColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  color = '#02CF8E',
  textColor = '#020202',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color} as ViewStyle]}
      activeOpacity={0.5}>
      <Text style={[styles.text, {color: textColor} as TextStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create<{button: ViewStyle; text: TextStyle}>({
  button: {
    padding: 12,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});
