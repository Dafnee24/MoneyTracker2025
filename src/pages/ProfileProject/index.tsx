import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Switch,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import LogoPolos from '../../assets/LogoPolos.svg';
import BackIcon from '../../assets/arrow/arrow_back_.svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchImageLibrary} from 'react-native-image-picker';

const ProfileProject: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [isDark, setIsDark] = useState(false);

  const [userData, setUserData] = useState({
    photo: 'https://i.pravatar.cc/300',
    name: 'Dafnee Pangaila',
    email: 'Dafnee@gmail.com',
    location: 'Airmadidi',
    phone: '08888821209123',
  });

  // menerima data UPDATE dari EditProfile
  useEffect(() => {
    if (route.params?.updatedData) {
      setUserData(route.params.updatedData);
    }
  }, [route.params]);

  const colors = {
    background: isDark ? '#1c1c1c' : '#ffffff',
    text: isDark ? '#f5f5f5' : '#000000',
    sub: isDark ? '#cccccc' : '#666666',
    border: isDark ? '#444444' : '#EAEAEA',
  };

  // ganti foto profile langsung
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, res => {
      if (!res.didCancel && res.assets) {
        setUserData(prev => ({...prev, photo: res.assets[0].uri}));
      }
    });
  };

  // logout ke splashscreen
  const handleLogout = () => {
    Alert.alert('Logout', 'Logout berhasil!', [
      {
        text: 'OK',
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{name: 'SplashScreenProject'}],
          }),
      },
    ]);
  };

  // reusable untuk info row
  const InfoItem = ({icon, text}: {icon: string; text: string}) => (
    <TouchableOpacity style={styles.listItem}>
      <Ionicons name={icon as any} size={22} color={colors.text} />
      <Text style={[styles.listText, {color: colors.text}]}>{text}</Text>
      <Ionicons name="chevron-forward" size={20} color={colors.sub} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon width={28} height={28} fill={colors.text} />
        </TouchableOpacity>

        <LogoPolos width={38} height={38} />
      </View>

      {/* PROFILE SECTION */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickImage}>
          <Image source={{uri: userData.photo}} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={[styles.name, {color: colors.text}]}>{userData.name}</Text>
        <Text style={[styles.email, {color: colors.sub}]}>
          {userData.email}
        </Text>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditProfile' as never, {userData})
          }>
          <Text style={styles.editButtonText}>edit profile</Text>
        </TouchableOpacity>
      </View>

      {/* INFO LIST */}
      <View style={styles.listSection}>
        <InfoItem icon="mail-outline" text={userData.email} />
        <InfoItem icon="location-outline" text={userData.location} />
        <InfoItem icon="call-outline" text={userData.phone} />
      </View>

      <View style={[styles.divider, {backgroundColor: colors.border}]} />

      {/* DARK MODE */}
      <View style={styles.darkRow}>
        <Text style={[styles.darkText, {color: colors.text}]}>Dark mode</Text>
        <Switch value={isDark} onValueChange={() => setIsDark(!isDark)} />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#FF3333" />
        <Text style={styles.logoutText}>log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileProject;

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  /* HEADER */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  /* PROFILE */
  profileSection: {
    alignItems: 'center',
    marginBottom: 25,
  },

  profileImage: {
    width: 95,
    height: 95,
    borderRadius: 55,
    marginBottom: 10,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
  },

  email: {
    fontSize: 14,
    marginBottom: 8,
  },

  editButton: {
    backgroundColor: '#61DA85',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 25,
    marginTop: 6,
  },

  editButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },

  /* INFO LIST */
  listSection: {
    marginTop: 15,
  },

  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  listText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
  },

  divider: {
    height: 1,
    marginVertical: 20,
  },

  /* DARK MODE */
  darkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  darkText: {
    fontSize: 16,
    fontWeight: '500',
  },

  /* LOGOUT */
  logoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  logoutText: {
    color: '#FF3333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});
