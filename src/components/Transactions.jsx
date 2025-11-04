import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatInputToIDR(raw) {
  const digits = (raw || '').toString().replace(/\D/g, '');
  const value = digits ? parseInt(digits, 10) : 0;
  return {
    text: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value),
    value,
  };
}

export default function Transactions({ items, onAdd, onDelete }) {
  const [type, setType] = useState('deposit');
  const [amountText, setAmountText] = useState('Rp 0');
  const [amountValue, setAmountValue] = useState(0);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [items]);

  function handleAmountChange(e) {
    const { text, value } = formatInputToIDR(e.target.value);
    setAmountText(text);
    setAmountValue(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!amountValue) return;
    onAdd({
      type,
      amount: amountValue,
      note: note.trim(),
      date,
    });
    setAmountText('Rp 0');
    setAmountValue(0);
    setNote('');
    setType('deposit');
    setDate(new Date().toISOString().slice(0, 10));
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:col-span-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white/90 font-semibold">Tambah Transaksi</h3>
          <div className="text-xs text-white/60">Form modern</div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setType('deposit')}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition ${
              type === 'deposit'
                ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <ArrowUpRight size={18} /> Pemasukan
          </button>
          <button
            type="button"
            onClick={() => setType('withdraw')}
            className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition ${
              type === 'withdraw'
                ? 'bg-rose-500/20 border-rose-400/30 text-rose-200'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            <ArrowDownRight size={18} /> Pengeluaran
          </button>
        </div>

        <label className="block mt-4 text-sm text-white/70">Nominal</label>
        <input
          type="text"
          inputMode="numeric"
          value={amountText}
          onChange={handleAmountChange}
          className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          placeholder="Rp 0"
        />

        <label className="block mt-4 text-sm text-white/70">Catatan</label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
          placeholder="Contoh: Gaji, Makan siang, Transport"
        />

        <label className="block mt-4 text-sm text-white/70">Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
        />

        <button
          type="submit"
          className="mt-5 w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 text-[#0B0F1A] font-semibold shadow-lg shadow-cyan-500/20 hover:brightness-110 transition"
        >
          Simpan Transaksi
        </button>
      </motion.form>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.5 }}
        className="lg:col-span-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white/90 font-semibold">Riwayat</h3>
          <div className="text-xs text-white/60">{items.length} transaksi</div>
        </div>
        <div className="divide-y divide-white/10">
          <AnimatePresence initial={false}>
            {sorted.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl border ${
                      t.type === 'deposit'
                        ? 'bg-emerald-500/15 border-emerald-400/20 text-emerald-200'
                        : 'bg-rose-500/15 border-rose-400/20 text-rose-200'
                    }`}
                  >
                    {t.type === 'deposit' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                  </div>
                  <div>
                    <div className="text-white/90 font-medium">
                      {t.note || (t.type === 'deposit' ? 'Pemasukan' : 'Pengeluaran')}
                    </div>
                    <div className="text-xs text-white/50">{new Date(t.date).toLocaleDateString('id-ID')}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className={`font-semibold ${
                      t.type === 'deposit' ? 'text-emerald-200' : 'text-rose-200'
                    }`}
                  >
                    {t.type === 'withdraw' ? '-' : '+'} {formatIDR(t.amount)}
                  </div>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition"
                    aria-label="Hapus"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {sorted.length === 0 && (
          <div className="text-center text-white/50 py-10">Belum ada transaksi</div>
        )}
      </motion.div>
    </div>
  );
}
