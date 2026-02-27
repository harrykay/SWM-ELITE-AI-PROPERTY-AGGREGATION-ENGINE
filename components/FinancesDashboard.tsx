import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PieChart, Plus } from 'lucide-react';

const financialData = {
  income: 12500,
  expenses: 4500,
  netProfit: 8000,
  transactions: [
    { id: 1, description: 'Rent SMW-001', amount: 2500, type: 'income', date: '2024-07-28' },
    { id: 2, description: 'Maintenance', amount: -500, type: 'expense', date: '2024-07-27' },
    { id: 3, description: 'Rent SMW-002', amount: 2000, type: 'income', date: '2024-07-26' },
    { id: 4, description: 'Utilities', amount: -300, type: 'expense', date: '2024-07-25' },
  ],
};

export const FinancesDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Financial Overview</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Plus className="mr-2" size={16} />
          Add Transaction
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
          <DollarSign size={32} className="text-green-400" />
          <div>
            <p className="text-gray-400">Total Income</p>
            <h4 className="text-2xl font-bold">${financialData.income.toLocaleString()}</h4>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
          <TrendingDown size={32} className="text-red-400" />
          <div>
            <p className="text-gray-400">Total Expenses</p>
            <h4 className="text-2xl font-bold">${financialData.expenses.toLocaleString()}</h4>
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
          <PieChart size={32} className="text-blue-400" />
          <div>
            <p className="text-gray-400">Net Profit</p>
            <h4 className="text-2xl font-bold">${financialData.netProfit.toLocaleString()}</h4>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg">
        <h4 className="text-xl font-bold mb-4">Recent Transactions</h4>
        <ul>
          {financialData.transactions.map(t => (
            <li key={t.id} className="flex justify-between items-center py-2 border-b border-gray-700">
              <span>{t.description}</span>
              <span className={`${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {t.type === 'expense' ? '-' : ''}${Math.abs(t.amount).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
