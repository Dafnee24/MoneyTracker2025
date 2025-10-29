import React, {useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
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
        <View style={styles.avatarWrapper}>
          {imageUri ? (
            <Image source={{uri: imageUri}} style={styles.avatar} />
          ) : (
            <Image
              source={require('../../../assets/placeholder_PP.png')}
              style={styles.avatar}
            />
          )}
        </View>
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
  avatarWrapper: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#8D92A3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    borderRadius: 80,
  },
  // No placeholder styles needed when using image asset
});
