import React, { useState, useEffect } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

export default function AddIncomeForm({
  initialIncome = null,
  onAddIncome,
  onUpdateIncome
}) {
  const [income, setIncome] = useState({
    source: '',
    amount: '',
    date: '',
    icon: ''
  });

  useEffect(() => {
    if (initialIncome) {
      setIncome({
        source: initialIncome.source,
        amount: initialIncome.amount,
        date: initialIncome.date.split('T')[0],
        icon: initialIncome.icon
      });
    }
  }, [initialIncome]);

  const handleChange = (key, value) =>
    setIncome(prev => ({ ...prev, [key]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (initialIncome) {
      onUpdateIncome(income);
    } else {
      onAddIncome(income);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-sm space-y-4"
    >
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={icon => handleChange('icon', icon)}
          className="text-2xl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Source"
          placeholder="e.g. Salary"
          type="text"
          value={income.source}
          onChange={e => handleChange('source', e.target.value)}
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0 text-sm"
        />
        <Input
          label="Amount"
          placeholder="0.00"
          type="number"
          value={income.amount}
          onChange={e => handleChange('amount', e.target.value)}
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0 text-sm"
        />
        <Input
          label="Date"
          type="date"
          value={income.date}
          onChange={e => handleChange('date', e.target.value)}
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0 text-sm"
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-md text-white font-medium transition text-sm ${
          initialIncome ? 'bg-blue-500 hover:bg-blue-600' : 'bg-primary hover:bg-primary-dark'
        }`}
      >
        {initialIncome ? 'Update Income' : 'Add Income'}
      </button>
    </form>
  );
}
