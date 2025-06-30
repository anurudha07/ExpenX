import React, { useState, useEffect } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

export default function AddExpenseForm({
  initialExpense = null,
  onAddExpense,
  onUpdateExpense
}) {
  const [expense, setExpense] = useState({
    category: '',
    amount: '',
    date: '',
    icon: ''
  });

  useEffect(() => {
    if (initialExpense) {
      setExpense({
        category: initialExpense.category,
        amount: initialExpense.amount,
        date: initialExpense.date.split('T')[0],
        icon: initialExpense.icon
      });
    }
  }, [initialExpense]);

  const handleChange = (key, value) =>
    setExpense(prev => ({ ...prev, [key]: value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (initialExpense) {
      onUpdateExpense(expense);
    } else {
      onAddExpense(expense);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto bg-white bg-opacity-50 backdrop-blur-md p-4 rounded-lg shadow-sm space-y-4"
    >
      <div className="flex justify-center">
        <EmojiPickerPopup
          icon={expense.icon}
          onSelect={icon => handleChange('icon', icon)}
          className="text-2xl"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Category"
          placeholder="e.g. Groceries"
          type="text"
          value={expense.category}
          onChange={e => handleChange('category', e.target.value)}
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0 text-sm"
        />
        <Input
          label="Amount"
          type="number"
          value={expense.amount}
          onChange={e => handleChange('amount', e.target.value)}
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0 text-sm"
        />
        <Input
          label="Date"
          type="date"
          value={expense.date}
          onChange={e => handleChange('date', e.target.value)}
          className="border-b border-gray-300 bg-transparent focus:outline-none focus:ring-0 text-sm"
        />
      </div>

      <button
        type="submit"
        className={`w-full py-2 rounded-md text-white font-medium transition text-sm ${
          initialExpense
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {initialExpense ? 'Update Expense' : 'Add Expense'}
      </button>
    </form>
  );
}
