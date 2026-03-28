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

// Helper to safe-save to localStorage
const saveMessages = (messages: Message[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  } catch (error) {
    console.warn('Failed to save messages to localStorage:', error);
  }
};

const initialState: ChatState = {
  messages: [], // Empty initially to avoid hydration mismatch
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<
  string, // Return type
  Message[], // First argument (arg)
  { rejectValue: string } // Config
>(
  'chat/sendMessage',
  async (messages, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get AI response');
      }

      const data = await response.json();
      return data.text;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(message);
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
        try {
          localStorage.removeItem('chat_messages');
        } catch (error) {
          console.warn('Failed to remove messages from localStorage:', error);
        }
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
