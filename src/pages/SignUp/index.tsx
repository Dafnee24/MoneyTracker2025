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
