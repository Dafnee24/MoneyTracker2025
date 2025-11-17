import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Logo2 from '../../assets/Logo 2.svg';

const VerifikasiGagal = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Logo2 width={90} height={90} />
      </View>

      <Text style={styles.title}>Verifikasi tidak berhasil</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpProject')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifikasiGagal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 50,
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backIcon: {
    fontSize: 32,
    fontWeight: '300',
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 60,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#61DA85',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
