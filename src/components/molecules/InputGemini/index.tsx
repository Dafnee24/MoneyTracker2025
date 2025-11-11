import React from 'react';
import {StyleSheet, View, TextInput as RNTextInput} from 'react-native';
import Button from '../../atoms/Button';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
};

const InputGemini: React.FC<Props> = ({
  value,
  onChangeText,
  onSend,
  placeholder = 'Tanya apa saja',
  disabled,
}) => {
  const canSend = !!value?.trim() && !disabled;

  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#8D92A3"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="send"
        onSubmitEditing={() => canSend && onSend()}
      />
      <View style={[styles.sendWrapper, !canSend && styles.sendWrapperDisabled]} pointerEvents={canSend ? 'auto' : 'none'}>
        <Button
          type="icon-only"
          icon="icon-send"
          size={20}
          onPress={onSend}
        />
      </View>
    </View>
  );
};

export default InputGemini;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#D9D9D9',
    borderRadius: 26,
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    paddingHorizontal: 18,
    height: 48,
    color: '#020202',
  },
  sendWrapper: {
    marginLeft: 12,
    height: 48,
    width: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  sendWrapperDisabled: {
    opacity: 0.4,
  },
});
