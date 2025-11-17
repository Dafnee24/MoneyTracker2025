import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useRoute} from '@react-navigation/native';

// Define type for user data
interface UserData {
  photo?: string;
  name?: string;
  email?: string;
  location?: string;
  phone?: string;
}

const EditProfile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const user = route.params?.userData as UserData | undefined;

  // Initialize with empty values and update when user data is available
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  // Update state when user data is available
  useEffect(() => {
    if (user) {
      setPhoto(user.photo || '');
      setName(user.name || '');
      setEmail(user.email || '');
      setLocation(user.location || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (!res.didCancel && res.assets && res.assets[0]) {
        setPhoto(res.assets[0].uri || '');
      }
    });
  };

  const handleSave = () => {
    navigation.navigate('ProfileProject' as never, {
      updatedData: {photo, name, email, location, phone},
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={26} />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Photo */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            photo
              ? {uri: photo}
              : {uri: 'https://via.placeholder.com/120x120?text=No+Image'}
          }
          style={styles.photo}
        />{' '}
        <View style={styles.cameraIcon}>
          <Ionicons name="camera" size={20} color="white" />
        </View>
      </TouchableOpacity>

      {/* Input Form */}
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        style={styles.input}
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 25,
    right: '35%',
    backgroundColor: '#45CE74',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  saveBtn: {
    backgroundColor: '#45CE74',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
