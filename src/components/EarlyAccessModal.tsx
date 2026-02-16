import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface EarlyAccessModalProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export const EarlyAccessModal: React.FC<EarlyAccessModalProps> = ({ open, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setName('');
      setEmail('');
      setExperience('');
      setSubmitted(false);
      setLoading(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !experience) return;
    setLoading(true);
    try {
      await fetch('https://cryptoprism-api-963362833537.us-central1.run.app/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), experience }),
      });
    } catch {
      // Silently proceed — still show success UI
    }
    setLoading(false);
    setSubmitted(true);
    setTimeout(onClose, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="early-access-title"
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0f0d]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {/* Green top accent */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-neon-green to-transparent" />

            <div className="p-5 md:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-neon-green">rocket_launch</span>
                      </div>
                      <h3 id="early-access-title" className="text-xl font-bold text-white">Early Access</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mb-5 md:mb-8">
                      Be among the first to experience Crypto Prism. We'll reach out when your spot is ready.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
                      <div>
                        <label htmlFor="early-access-name" className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
                          Full Name
                        </label>
                        <input
                          id="early-access-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm font-medium focus:outline-none focus:border-neon-green/40 focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="early-access-email" className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
                          Email Address
                        </label>
                        <input
                          id="early-access-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-gray-600 text-sm font-medium focus:outline-none focus:border-neon-green/40 focus:ring-1 focus:ring-neon-green/20 transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="early-access-experience" className="block text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
                          Trading Experience
                        </label>
                        <select
                          id="early-access-experience"
                          value={experience}
                          onChange={(e) => setExperience(e.target.value)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm font-medium focus:outline-none focus:border-neon-green/40 focus:ring-1 focus:ring-neon-green/20 transition-all appearance-none"
                        >
                          <option value="" disabled className="bg-[#0a0f0d] text-gray-500">Select your experience level</option>
                          <option value="beginner" className="bg-[#0a0f0d]">Beginner — Just getting started</option>
                          <option value="intermediate" className="bg-[#0a0f0d]">Intermediate — 1-3 years trading</option>
                          <option value="advanced" className="bg-[#0a0f0d]">Advanced — 3+ years, active trader</option>
                          <option value="professional" className="bg-[#0a0f0d]">Professional — Institutional / Quant</option>
                        </select>
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 rounded-xl bg-neon-green text-cyber-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 disabled:opacity-60"
                        whileHover={loading ? {} : { scale: 1.02, boxShadow: '0 0 25px rgba(14, 203, 129, 0.3)' }}
                        whileTap={loading ? {} : { scale: 0.98 }}
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Reserving...
                          </>
                        ) : (
                          <>
                            Reserve My Spot
                            <span className="material-symbols-outlined text-lg">arrow_forward</span>
                          </>
                        )}
                      </motion.button>
                    </form>

                    <p className="text-[10px] text-gray-600 text-center mt-4">
                      No spam. We only notify when your access is ready.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    className="flex flex-col items-center text-center py-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mb-5"
                      animate={{
                        boxShadow: [
                          '0 0 0px rgba(14, 203, 129, 0)',
                          '0 0 30px rgba(14, 203, 129, 0.3)',
                          '0 0 0px rgba(14, 203, 129, 0)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <span className="material-symbols-outlined text-neon-green text-3xl">check_circle</span>
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">You're on the list!</h3>
                    <p className="text-sm text-gray-400">
                      We'll reach out to <span className="text-white font-medium">{name}</span> as soon as your early access is ready.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EarlyAccessModal;
