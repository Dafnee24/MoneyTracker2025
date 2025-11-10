import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Logo from '../../assets/Logo 1.svg';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignInProject');
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Logo width={192} height={158} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FFF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
