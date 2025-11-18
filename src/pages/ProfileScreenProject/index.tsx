import React, {useMemo, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderChat from '../../components/molecules/HeaderChat';
import {BackButton, NullPhoto} from '../../assets';
import {launchImageLibrary} from 'react-native-image-picker';
import MailIcon from '../../assets/Mail.svg';
import LocationIcon from '../../assets/Location.svg';
import PhoneIcon from '../../assets/Phone.svg';
import LogOutIcon from '../../assets/LogOut.svg';

type ProfileData = {
  name: string;
  email: string;
  location: string;
  phone: string;
};

const defaultProfile: ProfileData = {
  name: 'Dafnee pangaila',
  email: 'Dafnee@gmail.com',
  location: 'Airmadidi',
  phone: '08888821209123',
};

type InfoRowProps = {
  icon: React.ReactNode;
  value: string;
  onPress?: () => void;
};

const InfoRow = ({icon, value, onPress}: InfoRowProps) => (
  <TouchableOpacity
    style={styles.infoRow}
    activeOpacity={0.6}
    onPress={onPress}>
    <View style={styles.rowLeft}>
      {icon}
      <Text style={styles.rowText}>{value}</Text>
    </View>
    <Text style={styles.rowArrow}>{'>'}</Text>
  </TouchableOpacity>
);

const ProfileScreenProject = ({navigation}) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(profile);
  const [darkMode, setDarkMode] = useState(false);

  const displayPhoto = useMemo(
    () => photoUri || (NullPhoto as any),
    [photoUri],
  );

  const handlePickImage = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });
      const asset = res.assets?.[0];
      if (asset?.uri) {
        setPhotoUri(asset.uri);
      }
    } catch (err) {
      console.warn('Failed to pick image', err);
    }
  };

  const handleEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const saveProfile = () => {
    setProfile(draft);
    setEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderChat
        onPressMenu={() => navigation.goBack()}
        leftSlot={<BackButton width={24} height={24} />}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerSection}>
          <TouchableOpacity onPress={handlePickImage} activeOpacity={0.8}>
            <Image
              source={
                typeof displayPhoto === 'string'
                  ? {uri: displayPhoto}
                  : displayPhoto
              }
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            {editing ? (
              <>
                <TextInput
                  style={styles.editInput}
                  value={draft.name}
                  onChangeText={text =>
                    setDraft(prev => ({...prev, name: text}))
                  }
                />
                <TextInput
                  style={styles.editInput}
                  value={draft.email}
                  onChangeText={text =>
                    setDraft(prev => ({...prev, email: text}))
                  }
                />
              </>
            ) : (
              <>
                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.email}>{profile.email}</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={editing ? saveProfile : handleEdit}>
            <Text style={styles.editButtonText}>
              {editing ? 'save profile' : 'edit profile'}
            </Text>
          </TouchableOpacity>
          {editing && (
            <TouchableOpacity
              style={[styles.editButton, styles.cancelButton]}
              onPress={() => setEditing(false)}>
              <Text style={[styles.editButtonText, styles.cancelText]}>
                cancel
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.infoCard}>
          {editing ? (
            <>
              <TextInput
                style={styles.infoInput}
                value={draft.location}
                onChangeText={text =>
                  setDraft(prev => ({...prev, location: text}))
                }
                placeholder="Kota"
              />
              <TextInput
                style={styles.infoInput}
                value={draft.phone}
                onChangeText={text =>
                  setDraft(prev => ({...prev, phone: text}))
                }
                placeholder="Nomor telepon"
                keyboardType="phone-pad"
              />
            </>
          ) : (
            <>
              <InfoRow icon={<MailIcon />} value={profile.email} />
              <InfoRow icon={<LocationIcon />} value={profile.location} />
              <InfoRow icon={<PhoneIcon />} value={profile.phone} />
            </>
          )}
        </View>

        <View style={styles.separator} />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dark mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? '#60D978' : '#FFFFFF'}
            trackColor={{false: '#D3D3D3', true: '#C2F0CE'}}
          />
        </View>

        <TouchableOpacity style={styles.logoutRow} activeOpacity={0.7}>
          <View style={styles.rowLeft}>
            <LogOutIcon width={24} height={24} />
            <Text style={styles.logoutText}>log out</Text>
          </View>
          <Text style={styles.rowArrow}>{'>'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreenProject;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
    gap: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EDEDED',
  },
  profileInfo: {flex: 1},
  name: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E1E1E',
  },
  email: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#5D5F63',
    marginTop: 2,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 8,
    fontFamily: 'Poppins-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#60D978',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 120,
    borderRadius: 14,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  cancelButton: {
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
  },
  cancelText: {
    color: '#1E1E1E',
  },
  infoCard: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 16,
    paddingVertical: 8,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#1E1E1E',
  },
  rowArrow: {
    fontSize: 22,
    color: '#9F9F9F',
  },
  infoInput: {
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#DADADA',
    marginBottom: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#1E1E1E',
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#F25151',
    textTransform: 'capitalize',
  },
});
