import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import toast from 'react-hot-toast';
import IncomeOverview from '../../components/Income/IncomeOverview';
import IncomeList from '../../components/Income/IncomeList';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import DeleteAlert from '../../components/DeleteAlert';

export default function Income() {
  const initialized = useUserAuth();
  const [incomeData, setIncomeData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editingIncome, setEditingIncome] = useState(null);
  const [openDelete, setOpenDelete] = useState({ show: false, id: null });

  useEffect(() => {
    axiosInstance
      .get(API_PATHS.INCOME.GET_ALL_INCOME)
      .then(res => setIncomeData(res.data || []))
      .catch(() => toast.error('Failed to load income'));
  }, []);

  if (!initialized) return null;

  const handleAddIncome = async inc => {
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, inc);
      toast.success('Added');
      setOpenAdd(false);
      const { data } = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomeData(data || []);
    } catch {
      toast.error('Fill in all details');
    }
  };

  const handleUpdateIncome = async updated => {
    try {
      const url = API_PATHS.INCOME.UPDATE_INCOME(editingIncome._id);
      console.log('➡️ PATCH INCOME', url, updated);

      const payload = {
        icon:   updated.icon,
        source: updated.source,
        amount: Number(updated.amount),
        date:   updated.date
      };

      const resp = await axiosInstance.patch(url, payload);
      console.log('✅ PATCH INCOME resp', resp.data);

      toast.success('Updated');
      setOpenAdd(false);
      setEditingIncome(null);
      const { data } = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomeData(data || []);
    } catch (err) {
      console.error('❌ Update income error:', err.response || err);
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const startEdit = inc => {
    setEditingIncome(inc);
    setOpenAdd(true);
  };

  const handleDelete = async id => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      toast.success('Deleted');
      setOpenDelete({ show: false, id: null });
      const { data } = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomeData(data || []);
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto max-w-4xl space-y-6">
        <IncomeOverview
          transactions={incomeData}
          onAddIncome={() => {
            setEditingIncome(null);
            setOpenAdd(true);
          }}
        />

        <IncomeList
          transactions={incomeData}
          onDelete={id => setOpenDelete({ show: true, id })}
          onEdit={startEdit}          // ← wire up
          onDownload={async () => {
            try {
              const resp = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
                { responseType: 'blob' }
              );
              const url = URL.createObjectURL(new Blob([resp.data]));
              const link = document.createElement('a');
              link.href = url;
              link.download = 'income.xlsx';
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

      <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}>
        <AddIncomeForm
          key={editingIncome?._id || 'new'}
          initialIncome={editingIncome}
          onAddIncome={handleAddIncome}
          onUpdateIncome={handleUpdateIncome}
        />
      </Modal>

 
      <Modal
        isOpen={openDelete.show}
        onClose={() => setOpenDelete({ show: false, id: null })}
      >
        <DeleteAlert
          content="Delete this income?"
          onDelete={() => handleDelete(openDelete.id)}
          onCancel={() => setOpenDelete({ show: false, id: null })}
        />
      </Modal>
    </DashboardLayout>
  );
}
