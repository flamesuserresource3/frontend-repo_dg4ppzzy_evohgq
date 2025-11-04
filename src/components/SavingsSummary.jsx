import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

function currencyFormat(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

const SavingsSummary = ({ totalIn, totalOut, balance, goalAmount, onChangeGoal }) => {
  const progress = Math.min(100, Math.round((balance / Math.max(goalAmount, 1)) * 100));

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pemasukan</p>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="mt-2 text-xl font-semibold">{currencyFormat(totalIn)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pengeluaran</p>
            <TrendingDown className="h-4 w-4 text-rose-600" />
          </div>
          <p className="mt-2 text-xl font-semibold">{currencyFormat(totalOut)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Target Tabungan</p>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={goalAmount}
              onChange={(e) => onChangeGoal(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Masukkan target"
            />
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{currencyFormat(balance)} / {currencyFormat(goalAmount || 0)}</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-emerald-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsSummary;
