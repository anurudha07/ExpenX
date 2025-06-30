import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import ExpenseList from '../../components/Expense/ExpenseList';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import DeleteAlert from '../../components/DeleteAlert';

export default function Expense() {
  const initialized = useUserAuth();
  const [expenseData, setExpenseData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [openDelete, setOpenDelete] = useState({ show: false, id: null });

  // Load all expenses on mount
  useEffect(() => {
    axiosInstance
      .get(API_PATHS.EXPENSE.GET_ALL_EXPENSE)
      .then(res => setExpenseData(res.data || []))
      .catch(() => toast.error('Failed to load expenses'));
  }, []);

  if (!initialized) return null;

  // Add new expense
  const handleAddExpense = async (exp) => {
    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, exp);
      toast.success('Added');
      setOpenAdd(false);
      const { data } = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenseData(data || []);
    } catch {
      toast.error('Fill in all details');
    }
  };

  // Update existing expense
  const handleUpdateExpense = async (updated) => {
    try {
      const url = API_PATHS.EXPENSE.UPDATE_EXPENSE(editingExpense._id);
      console.log('➡️ PATCH', url, updated);

      const payload = {
        icon:     updated.icon,
        category: updated.category,
        amount:   Number(updated.amount),
        date:     updated.date
      };

      const resp = await axiosInstance.patch(url, payload);
      console.log('✅ PATCH response:', resp.data);

      toast.success('Updated');
      setOpenAdd(false);
      setEditingExpense(null);

      const { data } = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenseData(data || []);
    } catch (err) {
      console.error('❌ Update error:', {
        status: err.response?.status,
        body:   err.response?.data,
        message: err.message
      });
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  // Open the edit modal
  const startEdit = (expense) => {
    setEditingExpense(expense);
    setOpenAdd(true);
  };

  // Delete expense
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      toast.success('Deleted');
      setOpenDelete({ show: false, id: null });
      const { data } = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      setExpenseData(data || []);
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto max-w-4xl space-y-6">
        <ExpenseOverview
          transactions={expenseData}
          onAddExpense={() => {
            setEditingExpense(null);
            setOpenAdd(true);
          }}
        />

        <ExpenseList
          transactions={expenseData}
          onDelete={id => setOpenDelete({ show: true, id })}
          onEdit={startEdit}
          onDownload={async () => {
            try {
              const resp = await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                { responseType: 'blob' }
              );
              const url = URL.createObjectURL(new Blob([resp.data]));
              const link = document.createElement('a');
              link.href = url;
              link.download = 'expense.xlsx';
              document.body.appendChild(link);
              link.click();
              link.remove();
              URL.revokeObjectURL(url);
              toast.success('Downloaded');
            } catch {
              toast.error('Download failed');
            }
          }}
        />
      </div>

      {/* Add / Edit Expense Modal */}
      <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}>
        <AddExpenseForm
          key={editingExpense?._id || 'new'}
          initialExpense={editingExpense}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
        />
      </Modal>

      {/* Delete Expense Modal */}
      <Modal
        isOpen={openDelete.show}
        onClose={() => setOpenDelete({ show: false, id: null })}
      >
        <DeleteAlert
          content="Delete this expense?"
          onDelete={() => handleDelete(openDelete.id)}
          onCancel={() => setOpenDelete({ show: false, id: null })}
        />
      </Modal>
    </DashboardLayout>
  );
}
