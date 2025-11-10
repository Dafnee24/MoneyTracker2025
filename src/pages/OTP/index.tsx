import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import ArrowBack from '../../assets/arrow/arrow_back_.svg';
import Logo from '../../assets/Logo 2.svg';

const OTP = ({navigation}: any) => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Logic verifikasi OTP
    navigation.navigate('SignIn');
  };

  const handleResendOTP = () => {
    // Logic resend OTP
    console.log('Resend OTP');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>
      {/* Header dengan Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowBack width={30} height={30} />
        </TouchableOpacity>
      </View>

      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Logo width={98} height={87} />
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <Text style={styles.title}>Verifikasi Email</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Kami telah mengirim kode OTP ke{'\n'}
          <Text style={styles.emailText}>email@example.com</Text>
        </Text>

        <Gap height={32} />

        {/* OTP Input Container */}
        <View style={styles.otpContainer}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={styles.otpInput}>
              <Text style={styles.otpText}>{otp[index] || ''}</Text>
            </View>
          ))}
        </View>

        {/* Hidden TextInput untuk capture OTP */}
        <TextInput
          style={styles.hiddenInput}
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={4}
          autoFocus={true}
        />

        <Gap height={40} />

        {/* Verify Button */}
        <Button
          label="Verifikasi Email"
          onPress={handleVerify}
          color="#60D978" // Sesuaikan dengan warna primary
          textColor="#FFFFFF"
          width={346}
          heigth={60}
        />

        <Gap height={24} />

        {/* Resend OTP */}
        <TouchableOpacity onPress={handleResendOTP}>
          <Text style={styles.resendText}>
            Tidak menerima kode?{' '}
            <Text style={styles.resendLink}>Kirim ulang</Text>
          </Text>
        </TouchableOpacity>

        <Gap height={40} />

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default OTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#020202',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
    textAlign: 'center',
    lineHeight: 20,
  },
  emailText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#60D978', // Warna email highlight
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  otpText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#020202',
  },
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
  resendText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
    textAlign: 'center',
  },
  resendLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#60D978', // Warna link
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#8D92A3',
  },
  signInLink: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#60D978', // Warna sign in link
  },
});
