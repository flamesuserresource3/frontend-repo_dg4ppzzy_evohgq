import React from 'react';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';

function currencyFormat(value) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
}

const TransactionList = ({ items, onDelete }) => {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        Belum ada transaksi. Tambahkan transaksi pertama Anda.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white divide-y">
      {items.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 grid place-items-center rounded-lg ${tx.type === 'deposit' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
              {tx.type === 'deposit' ? (
                <ArrowDownRight className="h-5 w-5" />
              ) : (
                <ArrowUpRight className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">
                {tx.type === 'deposit' ? 'Pemasukan' : 'Pengeluaran'}
                {tx.note ? ` • ${tx.note}` : ''}
              </p>
              <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleString('id-ID')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className={`text-sm font-semibold ${tx.type === 'deposit' ? 'text-emerald-700' : 'text-rose-700'}`}>
              {tx.type === 'deposit' ? '+' : '-'}{currencyFormat(tx.amount)}
            </p>
            <button
              onClick={() => onDelete(tx.id)}
              className="rounded-md p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              aria-label="Hapus transaksi"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
