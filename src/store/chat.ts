import { create } from 'zustand';

interface Message {
      _id: string;
      body: string;
      senderId: string;
      createdAt: string;
}

interface ChatState {
      messages: Record<string, Message[]>; // roomId -> list
      addMessage: (room: string, m: Message) => void;
}

export const useChatStore = create<ChatState>((set) => ({
      messages: {},
      addMessage: (room, m) =>
            set((s) => ({
                  messages: {
                        ...s.messages,
                        [room]: [...(s.messages[room] || []), m]
                  }
            }))
}));
