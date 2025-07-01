import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const BALANCE_COLOR = "#3B82F6"; 
const EXPENSE_COLOR = "#EF4444"; 
const INCOME_COLOR  = "rgb(249 115 22)"; 

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

  const balanceData = totalBalance < 0
    ? [
        { name: "Expenses", amount: totalExpense },
        { name: "Income",  amount: totalIncome },
      ]
    : [
        { name: "Balance", amount: totalBalance },
        { name: "Expenses", amount: totalExpense },
        { name: "Income",   amount: totalIncome },
      ];

  
  const COLORS = balanceData.map(entry => {
    if (entry.name === "Balance")  return BALANCE_COLOR;
    if (entry.name === "Expenses") return EXPENSE_COLOR;
    if (entry.name === "Income")   return INCOME_COLOR;
    return "#ccc"; 
  });

  // Center label and formatting
  const label = totalBalance < 0 ? "Net Loss" : "Total Balance";
  const formattedTotal = totalBalance < 0
    ? `-₹${Math.abs(totalBalance)}`
    : `₹${totalBalance}`;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5>Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label={label}
        totalAmount={formattedTotal}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
