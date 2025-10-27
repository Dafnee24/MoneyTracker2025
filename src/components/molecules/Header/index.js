import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
    paddingLeft: 24,
    paddingVertical: 37,
  },
});
