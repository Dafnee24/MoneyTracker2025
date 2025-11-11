import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

export type ChatRole = 'user' | 'ai';
export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  ts: number;
};
export type ChatConversation = {
  id: string;
  title?: string;
  messages: ChatMessage[];
  createdAt: number;
};

type ChatContextValue = {
  conversations: ChatConversation[];
  activeId: string | null;
  setActive: (id: string | null) => void;
  ensureActive: () => ChatConversation;
  createConversation: (opts?: {
    title?: string;
    withWelcome?: boolean;
  }) => ChatConversation;
  appendToActive: (
    msg: Omit<ChatMessage, 'id' | 'ts'> & {id?: string},
  ) => string;
  updateInActive: (messageId: string, nextText: string) => void;
  getActive: () => ChatConversation | null;
};

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const idRef = useRef<number>(Date.now());

  const nextId = () => String((idRef.current += 1));

  const getActive = () => conversations.find(c => c.id === activeId) || null;

  const createConversation = (opts?: {
    title?: string;
    withWelcome?: boolean;
  }) => {
    const id = nextId();
    const conv: ChatConversation = {
      id,
      title: opts?.title || `Obrolan ${conversations.length + 1}`,
      messages: [],
      createdAt: Date.now(),
    };
    const withWelcome = opts?.withWelcome ?? true;
    if (withWelcome) {
      conv.messages.push({
        id: nextId(),
        role: 'ai',
        text: 'Halo! Tanyakan apa saja seputar kesehatan yaa, saya siap membantu kamuu.',
        ts: Date.now(),
      });
    }
    setConversations(prev => [conv, ...prev]);
    setActiveId(id);
    return conv;
  };

  const ensureActive = () => {
    const current = getActive();
    if (current) {
      return current;
    }
    return createConversation();
  };

  const setActive = (id: string | null) => setActiveId(id);

  const appendToActive = (
    msg: Omit<ChatMessage, 'id' | 'ts'> & {id?: string},
  ) => {
    const id = msg.id || nextId();
    setConversations(prev =>
      prev.map(c =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {id, role: msg.role, text: msg.text, ts: Date.now()},
              ],
            }
          : c,
      ),
    );
    return id;
  };

  const updateInActive = (messageId: string, nextText: string) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === activeId
          ? {
              ...c,
              messages: c.messages.map(m =>
                m.id === messageId ? {...m, text: nextText} : m,
              ),
            }
          : c,
      ),
    );
  };

  const value = useMemo<ChatContextValue>(
    () => ({
      conversations,
      activeId,
      setActive,
      ensureActive,
      createConversation,
      appendToActive,
      updateInActive,
      getActive,
    }),
    [conversations, activeId],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return ctx;
};
