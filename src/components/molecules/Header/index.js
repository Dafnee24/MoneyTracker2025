import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ArrowBack from '../../../assets/arrow/arrow_back_.svg';

const Header = ({label, withBack = false}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {withBack && <ArrowBack width={24} height={24} />}
        <Text style={[styles.text, withBack && styles.textWithBack]}>
          {label}
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 24,
    paddingVertical: 37,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 22,
  },
  textWithBack: {marginLeft: 12},
});
