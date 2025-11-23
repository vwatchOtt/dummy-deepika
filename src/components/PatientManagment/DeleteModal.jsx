import React from "react";
import { X, AlertTriangle } from "lucide-react";

export default function DeleteModal({ ids, onClose, onConfirm }) {
  const count = Array.isArray(ids) ? ids.length : 1;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm border border-blue-400 relative text-center">

        {/* Close Button (top-right) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={22} />
        </button>

        {/* Warning Icon */}
        <div className="flex justify-center mb-3">
          <AlertTriangle size={60} className="text-yellow-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Are you sure?
        </h2>

        {/* Message */}
        <p className="text-gray-600 mt-1 text-sm">
          {count === 1 ? (
            <>It will permanently be deleted!</>
          ) : (
            <>
              {count} patients will be permanently deleted!
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => {
              onConfirm?.(ids);
              onClose();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm"
          >
            Yes, Delete it!
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-10 rounded-md text-sm"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
