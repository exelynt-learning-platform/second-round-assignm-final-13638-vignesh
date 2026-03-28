'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { addUserMessage, sendMessage, resetChat, Message } from '@/redux/chatSlice';
import MessageBubble from './MessageBubble';
import InputBar from './InputBar';
import Loader from './Loader';
import ThemeToggle from './ThemeToggle';
import Modal from './Modal';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function ChatBox() {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading, error } = useSelector((state: RootState) => state.chat);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    // Hydrate messages after mount to avoid server mismatch
    const saved = typeof window !== 'undefined' ? localStorage.getItem('chat_messages') : null;
    if (saved) {
      dispatch({ type: 'chat/setMessages', payload: JSON.parse(saved) });
    }
    setTimeout(() => setMounted(true), 0);
  }, [dispatch]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, loading]);

  const handleSendMessage = (content: string) => {
    dispatch(addUserMessage(content));
    // Pass the updated messages array to the async thunk
    const updatedMessages: Message[] = [...messages, { role: 'user', content }];
    dispatch(sendMessage(updatedMessages));
  };

  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    dispatch(resetChat());
    setShowResetModal(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] sm:h-[85vh] w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl overflow-hidden sm:rounded-[2rem] sm:border border-gray-200/50 dark:border-zinc-800/50 animate-in fade-in zoom-in-95 duration-700">
      {/* Header */}
      <header className="flex items-center justify-between p-4 px-6 border-b border-gray-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md relative z-10 transition-colors duration-0">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-xl text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-zinc-100 tracking-tight">AI Assistant</h1>
            <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
              <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <ThemeToggle />
          <button
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-xl transition-all active:scale-95"
            title="New Chat"
          >
            <RotateCcw size={20} />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent"
      >
        {mounted && messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 animate-in zoom-in duration-500">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-full text-blue-600 dark:text-blue-400 mb-2">
              <Sparkles size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-zinc-100">Welcome to your AI Chatbox</h2>
            <p className="text-gray-500 dark:text-zinc-400 max-w-xs">
              Start a conversation by typing a message below. I can help with information, writing, and problem-solving.
            </p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
        
        {loading && (
          <div className="flex justify-start p-2 animate-in fade-in slide-in-from-left duration-300">
            <Loader />
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-2xl text-red-600 dark:text-red-400 text-sm flex items-center justify-between animate-in shake duration-500">
             <span>{error}</span>
             <button 
               onClick={() => dispatch(sendMessage(messages))}
               className="underline font-bold hover:text-red-700 dark:hover:text-red-300"
             >
               Retry
             </button>
          </div>
        )}
      </div>

      {/* Input Area */}
      <InputBar onSendMessage={handleSendMessage} isLoading={loading} />

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Start New Chat"
        description="Are you sure you want to clear this conversation? This action cannot be undone."
        actions={[
          {
            label: 'Cancel',
            onClick: () => setShowResetModal(false),
          },
          {
            label: 'Clear Chat',
            onClick: confirmReset,
            variant: 'danger',
          },
        ]}
      />
    </div>
  );
}
