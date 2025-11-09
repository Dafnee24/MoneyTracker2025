import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Logo from '../../assets/Logo 1.svg';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';

const SignIn = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={98} height={87} />
      </View>

      <View style={styles.contentWrapper}>
        <TextInput placeholder="Masukan username" />
        <Gap height={29} />
        <TextInput placeholder="Masukan email" />
        <Gap height={29} />
        <TextInput placeholder="Masukan password" secureTextEntry={true} />
        <Gap height={29} />
        <TextInput placeholder="Nomor Telefon" />
        <Gap height={29} />
        <Button label="Sign Up" />
        <Gap height={29} />

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Sudah punya akun? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignInProject')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 103,
  },
  contentWrapper: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 28,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#494B4F',
  },
  signInLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#60D978',
  },
});
