import React from 'react';
import { LuDownload } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment';

const IncomeList = ({ transactions, onDelete, onEdit, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions?.map(inc => (
          <TransactionInfoCard
            key={inc._id}
            title={inc.source}
            icon={inc.icon}
            date={moment(inc.date).format('Do MM YYYY')}
            amount={inc.amount}
            type="income"
            onDelete={() => onDelete(inc._id)}
            onEdit={() => onEdit(inc)}       
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
