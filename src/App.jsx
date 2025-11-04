import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SavingsSummary from './components/SavingsSummary.jsx';
import AddTransactionForm from './components/AddTransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';

function App() {
  const [transactions, setTransactions] = useState([
    { id: crypto.randomUUID(), type: 'deposit', amount: 500000, note: 'Gaji mingguan', date: Date.now() - 1000 * 60 * 60 * 24 * 2 },
    { id: crypto.randomUUID(), type: 'withdraw', amount: 150000, note: 'Belanja', date: Date.now() - 1000 * 60 * 60 * 6 },
  ]);
  const [goalAmount, setGoalAmount] = useState(2000000);

  const totals = useMemo(() => {
    let totalIn = 0;
    let totalOut = 0;
    for (const t of transactions) {
      if (t.type === 'deposit') totalIn += t.amount;
      else totalOut += t.amount;
    }
    return { totalIn, totalOut, balance: totalIn - totalOut };
  }, [transactions]);

  const addTransaction = ({ type, amount, note }) => {
    setTransactions((prev) => [
      { id: crypto.randomUUID(), type, amount, note, date: Date.now() },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header balance={totals.balance} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <SavingsSummary
          totalIn={totals.totalIn}
          totalOut={totals.totalOut}
          balance={totals.balance}
          goalAmount={goalAmount}
          onChangeGoal={setGoalAmount}
        />

        <AddTransactionForm onAdd={addTransaction} />

        <section className="space-y-3">
          <h3 className="text-sm font-medium text-slate-700">Riwayat Transaksi</h3>
          <TransactionList items={transactions} onDelete={deleteTransaction} />
        </section>
      </main>

      <footer className="py-8 text-center text-xs text-slate-400">
        Dibuat dengan ❤️ untuk membantu kamu menabung lebih konsisten.
      </footer>
    </div>
  );
}

export default App;
