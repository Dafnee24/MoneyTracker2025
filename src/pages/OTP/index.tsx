import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Logo2 from '../../assets/Logo 2.svg';

const OtpScreenProject = ({navigation}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backIcon}>‹</Text>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Logo2 width={90} height={90} />
      </View>

      <Text style={styles.title}>Verifikasi Email</Text>

      {/* OTP BOX */}
      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={value}
            onChangeText={text => handleOtpChange(text, index)}
          />
        ))}
      </View>

      {/* VERIFY BUTTON */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Verifikasi Email</Text>
      </TouchableOpacity>

      {/* SIGN IN TEXT */}
      <Text style={styles.footerText}>
        Sudah punya akun?
        <Text
          style={styles.signIn}
          onPress={() => navigation.navigate('SignInProject')}>
          {' '}
          Sign In
        </Text>
      </Text>
    </View>
  );
};

export default OtpScreenProject;

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
    marginBottom: 30,
  },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginBottom: 40,
  },

  otpInput: {
    width: 55,
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    fontSize: 22,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#61DA85',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  footerText: {
    fontSize: 14,
    color: '#555',
  },

  signIn: {
    color: '#61DA85',
    fontWeight: '600',
  },
});
