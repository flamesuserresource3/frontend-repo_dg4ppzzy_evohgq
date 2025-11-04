import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function SummaryCards({ income, expense, balance, goal, onGoalChange }) {
  const progress = Math.max(0, Math.min(100, (balance / (goal || 1)) * 100));

  const cards = [
    {
      title: 'Saldo',
      value: formatIDR(balance),
      icon: Wallet,
      accent: 'from-cyan-400 to-indigo-400',
    },
    {
      title: 'Pemasukan',
      value: formatIDR(income),
      icon: ArrowUpRight,
      accent: 'from-emerald-400 to-teal-400',
    },
    {
      title: 'Pengeluaran',
      value: formatIDR(expense),
      icon: ArrowDownRight,
      accent: 'from-rose-400 to-orange-400',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
          >
            <div className={`absolute -inset-1 opacity-20 bg-gradient-to-br ${c.accent} blur-2xl`} />
            <div className="relative p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">{c.title}</span>
                <div className="p-2 rounded-xl bg-white/10 border border-white/10 text-white">
                  <c.icon size={18} />
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold text-white">{c.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="mt-6 md:mt-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
      >
        <div className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <div className="p-2 rounded-xl bg-white/10 border border-white/10"><Target size={18} className="text-cyan-300" /></div>
              <span className="text-sm">Target Tabungan</span>
            </div>
            <div className="text-sm text-white/70">{formatIDR(goal)}</div>
          </div>
          <div className="mt-3 h-3 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-white/60">
            <span>Tercapai</span>
            <span>{progress.toFixed(0)}%</span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={200000000}
              step={1000000}
              value={goal}
              onChange={(e) => onGoalChange(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <input
              type="text"
              value={formatIDR(goal)}
              readOnly
              className="w-44 text-right px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white/90"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
