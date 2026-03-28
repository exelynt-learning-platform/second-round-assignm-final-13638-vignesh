'use client';

export default function Loader() {
  return (
    <div className="flex items-center  space-x-2 p-4 bg-gray-100 dark:bg-zinc-800/80 dark:border dark:border-zinc-700/50 rounded-2xl w-fit">
      <div className="flex space-x-1">
        <div className="h-2 w-2 bg-black/50 dark:bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-2 w-2 bg-black/50 dark:bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-2 w-2 bg-black/50 dark:bg-white/50 rounded-full animate-bounce"></div>
      </div>
      <span className="text-sm font-medium text-black/70 dark:text-white/70">AI is thinking...</span>
    </div>
  );
}
