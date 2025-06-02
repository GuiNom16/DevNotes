const FullScreenSpinner: React.FC = () => (
  <div className="fixed inset-0 z-50 bg-white/30 dark:bg-zinc-900/50 flex items-center justify-center">
    <div
      className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      aria-label="Loading"
    />
  </div>
);

export default FullScreenSpinner;
