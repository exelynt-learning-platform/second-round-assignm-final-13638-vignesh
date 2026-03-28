import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

// Helper to save to localStorage
const saveMessages = (messages: Message[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  }
};

const initialState: ChatState = {
  messages: [], // Empty initially to avoid hydration mismatch
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messages: Message[], { rejectWithValue }) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const data = await response.json();
      return data.text as string;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    addUserMessage: (state, action: PayloadAction<string>) => {
      const newMessage: Message = { role: 'user', content: action.payload };
      state.messages.push(newMessage);
      saveMessages(state.messages);
      state.error = null;
    },
    resetChat: (state) => {
      state.messages = [];
      state.loading = false;
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('chat_messages');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const assistantMessage: Message = { role: 'assistant', content: action.payload };
        state.messages.push(assistantMessage);
        saveMessages(state.messages);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addUserMessage, resetChat, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
