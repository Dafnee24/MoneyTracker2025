import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from 'react-native';
import {IconObrolan, IconSearch, MenuHamburger, NullPhoto} from '../../assets';
import {useChat} from '../../context/ChatContext';

const Item = ({label, onPress}: {label: string; onPress?: () => void}) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.7} onPress={onPress}>
    <IconObrolan width={20} height={20} />
    <Text style={styles.itemText}>{label}</Text>
  </TouchableOpacity>
);

type ChatItem = {id: string; title: string; preview: string};

const SideBarScreenProject = ({navigation}) => {
  const [query, setQuery] = useState('');
  const {conversations, setActive, createConversation} = useChat();
  const drawerWidth = Dimensions.get('window').width * 0.7;
  const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;

  const items: ChatItem[] = useMemo(
    () =>
      conversations.map(c => ({
        id: c.id,
        title: c.title || 'Obrolan',
        preview:
          c.messages[c.messages.length - 1]?.text || 'Mulai obrolan baru',
      })),
    [conversations],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items;
    }
    return items.filter(
      c =>
        c.title.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q),
    );
  }, [query, items]);

  const goChat = (id?: string) => {
    if (id) {
      setActive(id);
    }
    navigation.navigate('ChatScreenProject');
  };

  const handleNewChat = () => {
    const conv = createConversation({title: 'Obrolan Baru'});
    navigation.navigate('ChatScreenProject');
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -drawerWidth,
      duration: 220,
      useNativeDriver: true,
    }).start(({finished}) => {
      if (finished) {
        navigation.goBack();
      }
    });
  };

  return (
    <View style={styles.screen}>
      <Pressable style={styles.overlay} onPress={closeSidebar} />
      <Animated.View
        style={[
          styles.sidebarWrapper,
          {transform: [{translateX: slideAnim}], width: '70%'},
        ]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={styles.headerRow}>
            <TouchableOpacity activeOpacity={0.7} onPress={closeSidebar}>
              <MenuHamburger width={22} height={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.menuSection}>
            <Item label="Obrolan" onPress={() => {}} />
            <Item label="Obrolan Baru" onPress={handleNewChat} />
            <Item
              label="Ai Insight"
              onPress={() => navigation.navigate('InsightScreenProject')}
            />
          </View>

          <View style={styles.searchRow}>
            <View style={styles.searchField}>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari obrolan"
                placeholderTextColor="#6E6E6E"
                value={query}
                onChangeText={setQuery}
                returnKeyType="search"
                onSubmitEditing={() => {}}
              />
            </View>
            <IconSearch width={18} height={18} />
          </View>

          <View style={styles.separator} />

          <Text style={styles.sectionTitle}>Obrolan</Text>
          {filtered.map(it => (
            <TouchableOpacity
              key={it.id}
              style={styles.chatCard}
              onPress={() => goChat(it.id)}>
              <Text style={styles.chatTitle}>{it.title}</Text>
              <Text style={styles.chatPreview}>{it.preview}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.footerSpacer} />

          <TouchableOpacity
            style={styles.profileRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ProfileScreenProject')}>
            <Image source={NullPhoto} style={styles.avatar} />
            <View>
              <Text style={styles.profileName}>Dafnee pangaila</Text>
              <Text style={styles.profileSub}>Belum masuk akun</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SideBarScreenProject;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 1,
  },
  sidebarWrapper: {
    width: '70%',
    backgroundColor: '#F2FFF4',
    marginTop: '0%',
    marginBottom: '14%',
    marginRight: '20%',
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    zIndex: 2,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  container: {flex: 1},
  content: {paddingBottom: 24, flexGrow: 1},
  headerRow: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  menuSection: {gap: 14, marginBottom: 20},
  item: {flexDirection: 'row', alignItems: 'center', gap: 10},
  itemText: {fontSize: 15, color: '#1E1E1E'},
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  searchField: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3E3E3',
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  searchInput: {paddingVertical: 6, fontSize: 14, color: '#1E1E1E'},
  separator: {height: 2, backgroundColor: '#DCE9D9', marginVertical: 14},
  sectionTitle: {fontSize: 16, fontWeight: '600', marginBottom: 8},
  chatCard: {
    backgroundColor: '#F5FFF1',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DCE9D9',
  },
  chatTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1E1E1E',
  },
  chatPreview: {fontSize: 13, color: '#1E1E1E'},
  footerSpacer: {flexGrow: 1, height: 24},
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 'auto',
  },
  avatar: {width: 32, height: 32, borderRadius: 16},
  profileName: {fontSize: 14, color: '#1E1E1E'},
  profileSub: {fontSize: 12, color: '#6E6E6E'},
});
