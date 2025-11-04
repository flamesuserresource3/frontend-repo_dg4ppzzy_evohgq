import React from 'react';
import { Wallet } from 'lucide-react';

function currencyFormat(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

const Header = ({ balance }) => {
  return (
    <header className="w-full border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-emerald-600 text-white">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">TabunganKu</h1>
            <p className="text-xs text-slate-500">Kelola tabungan dengan mudah</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500">Saldo saat ini</p>
          <p className="text-xl font-bold text-slate-900">{currencyFormat(balance)}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
