import React from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

export default function DeleteAlert({ content = "Are you sure?", onDelete, onCancel }) {
  return (
    <div className="w-full max-w-xs mx-auto bg-white bg-opacity-30 backdrop-blur-sm rounded-lg p-3 text-center space-y-3">
      <FiAlertTriangle className="mx-auto text-red-400 text-5xl" />
      <p className="text-sm text-gray-800">{content}</p>
      <div className="flex gap-2">
        <button
          onClick={onDelete}
          className="flex-1 py-2 text-xs font-medium bg-red-500 bg-opacity-80 text-white rounded-lg hover:bg-opacity-100 transition"
        >
          Delete
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2 text-xs font-medium bg-gray-200 bg-opacity-60 text-gray-700 rounded-lg hover:bg-opacity-80 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
