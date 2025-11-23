import React from "react";
import { X, FileText } from "lucide-react";

export default function ViewPatientModal({ patient, onClose }) {
  if (!patient) return null;

  const infoRow = (label, value) => (
    <p className="flex justify-between text-sm border-b pb-2">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-600 text-right ml-4">{value}</span>
    </p>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:max-w-xl max-h-[90vh] overflow-y-auto relative">

        {/* Header */}
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="text-lg font-semibold text-gray-800">View Patient</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">

          {/* Patient Info */}
          {infoRow("Patient ID", patient.id)}
          {infoRow("Name", patient.name)}
          {infoRow("Age", patient.age)}
          {infoRow("Email", patient.email)}
          {infoRow("Contact", patient.phone)}
          {infoRow("Address", patient.address)}
          {infoRow("Status", patient.status)}
          {infoRow("Gender", patient.gender || "—")}
          {infoRow("Notes", patient.notes || "—")}

          {/* Documents */}
          <div className="flex justify-between items-center border-b pb-3 pt-2">
            <span className="font-medium text-gray-700">Documents</span>
            <FileText size={20} className="text-blue-600" />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
