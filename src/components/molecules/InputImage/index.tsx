import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  onSelectImage?: (uri: string | null) => void;
  initialUri?: string | null;
};

const InputImage = ({onSelectImage, initialUri = null}: Props) => {
  const [imageUri, setImageUri] = useState<string | null>(initialUri);

  const handleSelectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.7,
      });

      if (result.didCancel) {
        return;
      }

      const uri = result.assets?.[0]?.uri || null;
      setImageUri(uri);
      onSelectImage?.(uri);
    } catch (error) {
      console.warn('Image selection error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage} activeOpacity={0.8}>
        {imageUri ? (
          <Image source={{uri: imageUri}} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, styles.placeholder]}>
            <Text style={styles.placeholderText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputImage;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 1,
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#8D92A3',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },
  placeholderText: {
    color: '#8D92A3',
    fontSize: 1,
  },
});
