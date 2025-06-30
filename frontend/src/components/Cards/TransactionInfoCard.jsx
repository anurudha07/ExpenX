import React, { useState, useRef, useEffect } from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
  LuPen
} from 'react-icons/lu';

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
  onEdit
}) => {
  const [showActions, setShowActions] = useState(false);
  const cardRef = useRef(null);

  const getAmountStyles = () =>
    type === 'income' ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500';


  const handleToggleActions = () => {
    if (window.innerWidth < 768) {
      setShowActions(prev => !prev);
    }
  };


  useEffect(() => {
    if (!showActions) return;

    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowActions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showActions]);

  return (
    <div
      ref={cardRef}
      onClick={handleToggleActions}
      className="group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 cursor-pointer"
    >

      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full shrink-0">
        {icon && !icon.includes('cdn.jsdelivr.net') ? (
          <span className="text-xl">{icon}</span>
        ) : (
          <LuUtensils />
        )}
      </div>

      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 font-medium truncate">{title}</p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 mt-1">{date}</p>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs ${getAmountStyles()}`}
          >
            <span className="whitespace-nowrap">
              {type === 'income' ? '+' : '-'}₹{amount}
            </span>
            {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>


      {!hideDeleteBtn && (
        <div
          className={`flex gap-2 ml-2 transition-opacity ${
            showActions ? 'opacity-100' : 'opacity-0'
          } sm:opacity-0 sm:group-hover:opacity-100`}
        >
          <button
            className="text-gray-400 hover:text-blue-500"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            <LuPen size={18} />
          </button>
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <LuTrash2 size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionInfoCard;
