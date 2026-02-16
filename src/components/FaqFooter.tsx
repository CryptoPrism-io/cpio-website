import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* ── FAQ data ────────────────────────────────────────────────────── */
interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'How is this different from a regular screener?',
    answer:
      'Unlike traditional screeners that rely on lagging indicators, Crypto Prism utilizes institutional-grade AI to process real-time order flows, sentiment data, and on-chain metrics, providing predictive insights rather than just historical summaries.',
  },
  {
    question: 'Do you execute trades for me?',
    answer:
      'Crypto Prism is an intelligence platform. While we provide the signals and execution infrastructure via API, we do not manage your funds or execute trades autonomously unless you specifically configure your trading bots through our Playground interface.',
  },
  {
    question: 'What markets do you support?',
    answer:
      'We currently support Spot and Perpetual markets for over 200 high-liquidity assets across major exchanges including Binance, OKX, and Bybit, with DEX aggregation coming in Q3 2026.',
  },
  {
    question: 'How accurate is the AI?',
    answer:
      'Our predictive models maintain a 74% precision rate on short-term trend reversals across major pairs. We provide full transparency into model confidence scores and historical backtesting for every signal generated.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'We utilize AES-256 encryption for all stored data and hardware security modules (HSM) for API key management. Your data never leaves our secure environment, and we undergo monthly third-party security audits.',
  },
] as const;

/* ── Footer link data ────────────────────────────────────────────── */
interface FooterLinkGroup {
  readonly title: string;
  readonly links: readonly { label: string; href: string }[];
}

const FOOTER_LINKS: readonly FooterLinkGroup[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Discovery', href: '#' },
      { label: 'Playground', href: '#' },
      { label: 'Market Buzz', href: '#' },
      { label: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
] as const;

/* ── Accordion item component ────────────────────────────────────── */
const AccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ item, isOpen, onToggle, index }) => (
  <motion.div
    className="faq-accordion-item"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{
      delay: index * 0.08,
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    }}
  >
    <button
      className={`faq-accordion-trigger ${isOpen ? 'faq-accordion-open' : ''}`}
      onClick={onToggle}
      aria-expanded={isOpen}
    >
      <span className="text-sm md:text-lg font-medium text-gray-200">{item.question}</span>
      <motion.span
        className="material-symbols-outlined text-neon-green"
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        expand_more
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          className="overflow-hidden"
        >
          <div className="px-4 py-3 md:px-6 md:py-4 text-xs md:text-base text-gray-400 leading-snug md:leading-relaxed border-x border-b border-neon-green/10 rounded-b-xl bg-cyber-forest/20">
            {item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ── Main component ──────────────────────────────────────────────── */
interface FaqFooterProps {
  readonly className?: string;
}

export const FaqFooter: React.FC<FaqFooterProps> = ({ className = '' }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      {/* ── FAQ Section ──────────────────────────────────────────── */}
      <section
        className={`relative min-h-[50vh] md:min-h-[70vh] flex flex-col items-center justify-center px-4 md:px-6 py-10 md:py-24 faq-particle-bg ${className}`}
        id="faq"
      >
        <div className="faq-particle-field" />

        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl md:text-5xl font-bold text-center mb-8 md:mb-16 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
          >
            Questions?{' '}
            <span className="text-neon-green">We've got answers.</span>
          </motion.h2>

          <div className="space-y-2 md:space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <AccordionItem
                key={item.question}
                item={item}
                isOpen={openIdx === idx}
                onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Detailed Footer ──────────────────────────────────────── */}
      <footer className="bg-[#020405] border-t border-zinc-800/50 pt-8 md:pt-16 pb-6 md:pb-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Footer grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8 mb-8 md:mb-12">
            {/* Brand column */}
            <motion.div
              className="lg:col-span-5 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neon-green rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,203,129,0.3)]">
                  <span className="material-symbols-outlined text-white text-xl">token</span>
                </div>
                <span className="text-xl font-mono font-bold tracking-tight text-white uppercase">
                  Crypto Prism
                </span>
              </div>
              <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                Institutional-grade AI quant trading infrastructure for everyone. Leverage
                professional-grade analytics to stay ahead of the market.
              </p>
            </motion.div>

            {/* Link columns */}
            {FOOTER_LINKS.map((group, groupIdx) => (
              <motion.div
                key={group.title}
                className={group.title === 'Legal' ? 'lg:col-span-3' : 'lg:col-span-2'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + groupIdx * 0.1, duration: 0.5 }}
              >
                <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-5">
                  {group.title}
                </h4>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-zinc-300 text-sm hover:text-neon-green transition-colors"
                        href={link.href}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-xs">
              © 2026 Crypto Prism. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {/* LinkedIn */}
              <motion.a
                className="text-zinc-500 hover:text-neon-green transition-colors"
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </motion.a>
              {/* YouTube */}
              <motion.a
                className="text-zinc-500 hover:text-neon-green transition-colors"
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </motion.a>
              {/* Twitter / X */}
              <motion.a
                className="text-zinc-500 hover:text-neon-green transition-colors"
                href="#"
                whileHover={{ scale: 1.2, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FaqFooter;
