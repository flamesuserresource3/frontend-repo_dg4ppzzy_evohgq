import { useEffect, useMemo, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Hero3D from './components/Hero3D';
import SummaryCards from './components/SummaryCards';
import Transactions from './components/Transactions';

function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [goal, setGoal] = useState(50000000);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1400);
    return () => clearTimeout(t);
  }, []);

  const { income, expense, balance } = useMemo(() => {
    const inc = transactions.filter((t) => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);
    const exp = transactions.filter((t) => t.type === 'withdraw').reduce((s, t) => s + t.amount, 0);
    return { income: inc, expense: exp, balance: inc - exp };
  }, [transactions]);

  function addTransaction({ type, amount, note, date }) {
    const tx = {
      id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      amount,
      note,
      date,
    };
    setTransactions((prev) => [tx, ...prev]);
  }

  function deleteTransaction(id) {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white selection:bg-cyan-400/30 selection:text-white">
      <SplashScreen show={showSplash} />

      {/* Top hero with 3D spline */}
      <Hero3D />

      {/* Floating backdrop accents */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute top-20 left-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Main content */}
      <main className="relative -mt-10 md:-mt-16 space-y-8 md:space-y-10">
        <SummaryCards
          income={income}
          expense={expense}
          balance={balance}
          goal={goal}
          onGoalChange={setGoal}
        />

        <Transactions items={transactions} onAdd={addTransaction} onDelete={deleteTransaction} />

        <footer className="w-full max-w-6xl mx-auto px-4 py-10 text-center text-white/40">
          <div>Saldo saat ini: <span className="text-white/80 font-semibold">{formatIDR(balance)}</span></div>
          <div className="text-xs mt-2">Dibuat dengan rasa futuristik • Dark mode • Animasi halus</div>
        </footer>
      </main>
    </div>
  );
}
