import ChatBox from "@/components/ChatBox";

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center p-0 sm:p-4 md:p-8 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 dark:bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/20 dark:bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Main chat window container */}
      <div className="w-full max-w-5xl z-10 w-full">
        <ChatBox />
      </div>
    </main>
  );
}
