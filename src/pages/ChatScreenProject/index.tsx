import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {InputGemini, HeaderChat} from '../../components/molecules';
import {useNavigation} from '@react-navigation/native';
import {useChat} from '../../context/ChatContext';
import MarkdownText from '../../components/molecules/MarkdownText';
import {askGemini} from '../../services/gemini';

const ChatMessage = ({item}) => {
  const isUser = item.role === 'user';
  return (
    <View style={[styles.bubble, isUser ? styles.userBubble : styles.aiBubble]}>
      {isUser ? (
        <Text style={[styles.bubbleText, styles.userText]}>{item.text}</Text>
      ) : (
        <MarkdownText>{item.text}</MarkdownText>
      )}
    </View>
  );
};

const ChatScreen = () => {
  const navigation = useNavigation();
  const {
    ensureActive,
    getActive,
    appendToActive,
    updateInActive,
    conversations,
    activeId,
  } = useChat();
  useEffect(() => {
    ensureActive();
  }, []);
  const messages = useMemo(() => {
    const c = conversations.find(x => x.id === activeId);
    return c?.messages || [];
  }, [conversations, activeId]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const scrollToEnd = () => {
    requestAnimationFrame(() => listRef.current?.scrollToEnd({animated: true}));
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) {
      return;
    }

    const userId = appendToActive({role: 'user', text: trimmed});
    const aiId = appendToActive({
      id: String(Date.now() + 1),
      role: 'ai',
      text: '',
    });
    setInput('');
    scrollToEnd();

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    try {
      setLoading(true);
      const full = await askGemini(trimmed);

      // Stream by words in small chunks
      const words = full.split(/(\s+)/); // keep spaces
      let acc = '';
      for (let i = 0; i < words.length; i += 3) {
        acc += words.slice(i, i + 3).join('');
        const textNow = acc;
        updateInActive(aiId, textNow);

        await delay(25);
      }
      scrollToEnd();
    } catch (err) {
      const fallback = `Maaf, gagal menghubungi AI.\n${err?.message || ''}`;
      updateInActive(aiId, fallback);
      scrollToEnd();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderChat
        onPressMenu={() => (navigation as any).navigate('SideBarScreenProject')}
      />
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={ChatMessage}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={scrollToEnd}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputBar}>
          <InputGemini
            placeholder="Tanya apa saja seputar kesehatan..."
            value={input}
            onChangeText={setInput}
            onSend={sendMessage}
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  listContent: {paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8},
  bubble: {
    maxWidth: '80%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginBottom: 16,
  },
  userBubble: {alignSelf: 'flex-end', backgroundColor: '#BFF7CF'},
  aiBubble: {alignSelf: 'flex-start', backgroundColor: '#D9D9D9'},
  bubbleText: {fontSize: 15, lineHeight: 22, fontFamily: 'Poppins-Regular'},
  userText: {color: '#1E1E1E'},
  aiText: {color: '#1E1E1E'},
  inputBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
});
