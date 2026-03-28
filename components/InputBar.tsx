'use client';

import { useState, FormEvent, KeyboardEvent, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface InputBarProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export default function InputBar({ onSendMessage, isLoading }: InputBarProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
      resetTextareaHeight();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as FormEvent);
    }
  };

  return (
    <div className="p-4  no-scrollbar sm:p-6 bg-white/30 dark:bg-zinc-900/30 border-t border-gray-200/50 dark:border-zinc-800/50 backdrop-blur-md mt-auto relative z-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl no-scrollbar mx-auto relative flex items-center space-x-2"
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message AI..."
          className="w-full px-5 py-4 no-scrollbar bg-white/80 dark:bg-zinc-950/80 border border-gray-200/50 dark:border-zinc-800/50 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] resize-none text-gray-800 dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500 transition-all scrollbar-hide max-h-[200px] overflow-y-auto"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`flex-shrink-0 p-4 rounded-[1.25rem] flex items-center justify-center transition-all ${
            !input.trim() || isLoading
              ? 'bg-gray-200/50 dark:bg-zinc-800/50 text-gray-400 dark:text-zinc-500 cursor-not-allowed hidden sm:flex'
              : 'bg-gradient-to-tr from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 dark:hover:shadow-blue-900/40 active:scale-95'
          }`}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Send size={20} />
          )}
        </button>
      </form>
    </div>
  );
}
