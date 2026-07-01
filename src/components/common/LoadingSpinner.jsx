export default function LoadingSpinner({ text = 'Loading...' }) {
  return (
    <div className="py-24 flex flex-col items-center justify-center gap-4">
      <div className="w-8 h-8 border-2 border-[#3fb950] border-t-transparent rounded-full animate-spin" />
      <p className="text-[#3fb950] text-sm font-mono">{text}</p>
    </div>
  );
}