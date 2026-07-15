import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            id="modal-backdrop"
            className="fixed inset-0 bg-black z-50 cursor-pointer backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            id="modal-container"
            className="fixed top-0 right-0 h-full w-full sm:w-[600px] md:w-[700px] bg-[#1c1b1a] text-[#eae8e4] shadow-2xl z-50 overflow-hidden flex flex-col border-l border-[#2e2d2a]"
          >
            {/* Modal Header */}
            <div id="modal-header" className="p-6 md:p-8 flex items-center justify-between border-b border-[#2e2d2a]">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#8c8a82]">
                OSSAMA MAJID — {title}
              </span>
              <button
                onClick={onClose}
                id="modal-close-btn"
                className="p-2 rounded-full hover:bg-[#2e2d2a] text-[#eae8e4] transition-all cursor-pointer group"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Modal Body */}
            <div id="modal-body" className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              {children}
            </div>

            {/* Modal Footer */}
            <div id="modal-footer" className="p-6 border-t border-[#2e2d2a] flex items-center justify-between text-neutral-500 font-mono text-[10px]">
              <span>© {new Date().getFullYear()} OSSAMA MAJID</span>
              <span className="tracking-widest uppercase">AVAILABLE WORLDWIDE</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
