import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../components/molecules/Header';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/atoms/Button';
import Gap from '../../components/atoms/Gap';

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Header label="Sign In" />
      <View style={styles.contentWrapper}>
        <TextInput
          label="Email Address"
          placeholder="Type your email address Dafnee"
        />
        <Gap height={16} />
        <TextInput
          label="Password"
          placeholder="Type your password"
          secureTextEntry={true}
        />
        <Gap height={24} />
        <Button label="Sign In" />
        <Gap height={12} />
        <Button
          label="Create New Account"
          color="#8D92A3"
          textColor="#FFFFFF"
        />
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 26,
  },
});
