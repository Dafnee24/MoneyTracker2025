import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Logo from '../../assets/Logo 1.svg';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import {G} from 'react-native-svg';

const OtpBerhasilProject = ({navigation}) => {
  const handleVerify = () => {
    navigation.replace('SignInProject');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.backButtonWrapper}>
          <Button
            type="icon-only"
            icon="icon-back"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View style={styles.logoWrapper}>
          <Logo width={120} height={170} />
          <Gap height={70} />
          <Text style={styles.title}>Verifikasi Email Tidak Berhasil</Text>
        </View>

        <View style={styles.footer}>
          <Button label="Sing In" onPress={handleVerify} />
          <Gap height={18} />
          <View style={styles.signInRow}>
            <TouchableOpacity
              onPress={() => navigation.replace('SignInProject')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
          <Gap height={270} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpBerhasilProject;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    backgroundColor: '#FFFFFF',
  },
  backButtonWrapper: {
    paddingTop: 24,
  },
  logoWrapper: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    color: '#020202',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 32,
  },
  signInRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#5D5F63',
  },
  signInLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#60D978',
  },
});
