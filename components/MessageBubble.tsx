/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
'use client';

import { memo } from 'react';
import { Message } from '@/redux/chatSlice';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = memo(({ message }: MessageBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[85%] sm:max-w-[75%] items-end gap-2 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
          }`}
        >
          {isUser ? <User size={18} /> : <Bot size={18} />}
        </div>
        <div
          className={`px-5 py-3.5 rounded-[1.5rem] shadow-sm border text-left overflow-hidden ${
            isUser
              ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-400/50 dark:border-blue-500/50 rounded-br-[0.25rem]'
              : 'bg-white dark:bg-zinc-800/90 text-gray-800 dark:text-zinc-100 border-gray-200/60 dark:border-zinc-700/50 rounded-bl-[0.25rem] backdrop-blur-sm'
          }`}
        >
          <div className="text-sm leading-relaxed break-words overflow-x-auto">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node: _node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                a: ({ node: _node, ...props }) => (
                  <a
                    className={`hover:underline underline-offset-2 break-all ${
                      isUser ? 'text-blue-100 font-semibold' : 'text-blue-600 dark:text-blue-400'
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  />
                ),
                ul: ({ node: _node, ...props }) => <ul className="list-disc pl-4 mb-3 space-y-1" {...props} />,
                ol: ({ node: _node, ...props }) => <ol className="list-decimal pl-4 mb-3 space-y-1" {...props} />,
                li: ({ node: _node, ...props }) => <li className="mb-1" {...props} />,
                h1: ({ node: _node, ...props }) => <h1 className="text-xl font-bold mb-2 mt-4" {...props} />,
                h2: ({ node: _node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3" {...props} />,
                h3: ({ node: _node, ...props }) => <h3 className="text-base font-bold mb-2 mt-2" {...props} />,
                code: ({ node: _node, inline, className: _className, children, ...props }: any) => {
                  return inline ? (
                    <code
                      className={`rounded px-1.5 py-0.5 text-xs font-mono break-words ${
                        isUser ? 'bg-blue-700 text-white' : 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-zinc-200'
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <div className="my-3 overflow-hidden rounded-xl bg-gray-900 dark:bg-zinc-950 border border-gray-700 dark:border-zinc-800 shadow-sm">
                      <div className="px-4 py-2 bg-gray-800/50 dark:bg-zinc-900/50 border-b border-gray-700 dark:border-zinc-800 text-xs font-medium text-gray-400 flex items-center justify-between">
                        <span>Code snippet</span>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-gray-50 text-xs font-mono leading-relaxed inline-block min-w-full">
                          <code {...props}>{children}</code>
                        </pre>
                      </div>
                    </div>
                  );
                },
                blockquote: ({ node: _node, ...props }) => (
                  <blockquote
                    className={`border-l-4 pl-4 py-1 mb-3 italic ${
                      isUser ? 'border-blue-400 text-blue-100' : 'border-gray-300 dark:border-zinc-700 text-gray-600 dark:text-zinc-400'
                    }`}
                    {...props}
                  />
                ),
                table: ({ node: _node, ...props }) => (
                  <div className="overflow-x-auto mb-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left text-sm" {...props} />
                  </div>
                ),
                th: ({ node: _node, ...props }) => (
                  <th className={`px-4 py-2 font-semibold ${isUser ? 'bg-blue-700 text-white' : 'bg-gray-50 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300'}`} {...props} />
                ),
                td: ({ node: _node, ...props }) => (
                  <td className={`px-4 py-2 border-t ${isUser ? 'border-blue-500' : 'border-gray-200 dark:border-zinc-800'}`} {...props} />
                ),
              }}
            >
              {message.content.replace(/^(#+)(?=[^\s#])/gm, '$1 ')}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
});

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble;
