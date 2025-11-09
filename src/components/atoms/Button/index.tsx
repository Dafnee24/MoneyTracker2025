import {StyleSheet, Text, TouchableOpacity, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {BackButton} from '../../../assets';

const Button = ({
  label,
  color = '#60D978',
  textColor = '#FFFF',
  type,
  icon,
  onPress,
}) => {
  if (type === 'icon-only') {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {icon === 'icon-back' && <BackButton />}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={styles.button(color)}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={styles.text(textColor)}>{label}</Text>
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

const styles = StyleSheet.create({
  button: color => ({
    backgroundColor: color,
    padding: 19,
    borderRadius: 26,
    height: 60,
  }),
  text: textColor => ({
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: textColor,
  }),
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
