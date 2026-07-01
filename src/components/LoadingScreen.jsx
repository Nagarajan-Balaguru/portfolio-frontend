import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShow(false), 400);
          return 100;
        }
        return prev + 4;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0d1117' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#1f2d1f] border border-[#3fb950]/30 flex items-center justify-center mb-4 mx-auto">
              <span className="text-[#3fb950] text-2xl font-bold">NB</span>
            </div>
            <h1 className="text-white text-xl font-bold">Nagarajan Balaguru</h1>
            <p className="text-[#8b949e] text-sm mt-1">Software Engineer</p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-48 bg-[#21262d] rounded-full h-1 mb-3">
            <motion.div
              className="h-1 rounded-full bg-[#3fb950]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <p className="text-[#484f58] text-xs font-mono">{progress}%</p>

          {/* Dots */}
          <div className="flex gap-1.5 mt-6">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 rounded-full bg-[#3fb950]"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}