import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/molecules/Header';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';
import InputImage from '../../components/molecules/InputImage';

const SignUp = () => {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  return (
    <View style={styles.container}>
      <Header label="Sign Up" withBack />
      <View style={styles.contentWrapper}>
        <InputImage initialUri={photoUri} onSelectImage={setPhotoUri} />
        <Gap height={26} />
        <TextInput label="Full Name" placeholder="Type your full name" />
        <Gap height={16} />
        <TextInput
          label="Email Address"
          placeholder="Type your email address"
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password here"
          secureTextEntry={true}
        />
<<<<<<< HEAD
        <Gap height={24} />
        <Button label="Lanjutkan" />
        <Gap height={12} />
=======
>>>>>>> acc319e00e8cfca5876e1f08b2b1ec1cf31011e0
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
});
