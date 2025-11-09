import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React from 'react';

const TextInput = ({label, placeholder, ...rest}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <Input placeholder={placeholder} style={styles.input} {...rest} />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderColor: '#494B4F',
    borderRadius: 26,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    padding: 19,
    height: 60,
  },
});
