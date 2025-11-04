import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SplashScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F1A] text-white"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-5"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl rounded-full bg-gradient-to-tr from-indigo-500/40 via-cyan-400/40 to-fuchsia-500/40" />
                <motion.div
                  className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <Sparkles className="text-cyan-300" />
                  <span className="font-semibold tracking-wide">TabunganKu</span>
                </motion.div>
              </div>
              <motion.div
                className="text-sm text-white/70"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
              >
                Menyiapkan pengalaman modern...
              </motion.div>
              <motion.div
                className="h-1.5 w-52 overflow-hidden rounded-full bg-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
