import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, X, Sparkles } from 'lucide-react';
import { AIChatbot } from './AIChatbot';

interface IntelligenceLauncherProps {
  userProfile?: any;
}

export function IntelligenceLauncher({ userProfile }: IntelligenceLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 🤖 FLOATING INTELLIGENCE BUTTON */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 
                   bg-gradient-to-br from-blue-600 to-purple-600 
                   text-white w-16 h-16 rounded-full shadow-2xl 
                   hover:shadow-blue-500/50 hover:scale-110 
                   transition-all duration-300 
                   flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Bot className="w-8 h-8" />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        {/* Tooltip */}
        <div className="absolute right-20 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg 
                        opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          <Sparkles className="w-3 h-3 inline mr-1" />
          BIDA Intelligence
        </div>
      </motion.button>

      {/* 📊 SLIDING INTELLIGENCE PANEL */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Intelligence Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full md:w-[480px] 
                         bg-white shadow-2xl z-50 border-l border-gray-200 
                         flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 
                                    flex items-center justify-center">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">BIDA Intelligence</h2>
                      <p className="text-sm text-gray-600">Real-time operational insights</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-full hover:bg-white/80 
                               flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Intelligence Console Content */}
              <div className="flex-1 overflow-hidden">
                <AIChatbot userProfile={userProfile} />
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                <p className="text-xs text-gray-600 text-center">
                  🔒 Secure intelligence console • Always available
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}