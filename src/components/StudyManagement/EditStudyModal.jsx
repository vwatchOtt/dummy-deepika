import React, { useState, useEffect } from "react";
import { X, Calendar } from "lucide-react";
import UploadDocuments from "./UploadDocuments";

export default function EditPatientModal({ patient, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    contact: "",
    status: "",
    gender: "",
    notes: "",
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || "",
        age: patient.age || "",
        email: patient.email || "",
        address: patient.address || "",
        contact: patient.phone || "",
        status: patient.status || "",
        gender: patient.gender || "",
        notes: patient.notes || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      ...patient,
      ...formData,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl relative max-h-[92vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Edit</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">

          {/* Grid Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-500">Patient Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="text-sm font-medium text-gray-500">Age</label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              >
                <option value="">Select Age</option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm font-medium text-gray-500">Contact Number</label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Admitted">Admitted</option>
                <option value="Completed">Completed</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Date */}
            <div className="relative">
              <label className="text-sm font-medium text-gray-500">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date || ""}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />

             
            </div>


          </div>

          {/* Upload Documents – Full Width */}
          <div className="w-full">
            {/* <label className="text-sm font-medium text-gray-500 mb-1 block">
              Upload Documents
            </label> */}
            <UploadDocuments />
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm font-medium text-gray-500">Notes</label>
            <textarea
              name="notes"
              rows={4}
              maxLength={250}
              value={formData.notes}
              onChange={handleChange}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Additional Notes..."
            />
            <p className="text-right text-xs text-gray-400 mt-1">
              {formData.notes?.length || 0} / 250
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
            >
              Clear
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
