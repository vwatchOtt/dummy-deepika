import React, { useState } from "react";
import { X } from "lucide-react";
import { useGetStudiesQuery } from "../../features/studyManagement/api/studyManagementApi";

export default function AddStudyModal({ onClose, onAdd }) {
  const { data: studiesData, isLoading: isLoadingStudies } = useGetStudiesQuery();

  const [formData, setFormData] = useState({
    studyName: "",
    sponsor: "",
    startDate: "",
    totalNumberCycles: 0,
    totalPricing: 0,
    status: "Active",
    notes: "",
    tempSessionId: "ZTRW-552-HOK", // As per example
    patientIds: [],
    studyIds: [],
  });

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "studyIds") {
      const selectedIds = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormData((prev) => ({
        ...prev,
        studyIds: selectedIds,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studyName || !formData.sponsor || !formData.startDate) {
      alert("Please fill all required fields.");
      return;
    }
    const payload = {
        ...formData,
        totalNumberCycles: parseInt(formData.totalNumberCycles, 10),
        totalPricing: parseFloat(formData.totalPricing),
        startDate: new Date(formData.startDate).toISOString(),
    }
    onAdd(payload);
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl overflow-auto bg-white rounded-lg shadow-lg max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">Add Study</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Study Name <span className="text-red-500">*</span>
              </label>
              <input
                name="studyName"
                value={formData.studyName}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Sponsor <span className="text-red-500">*</span>
              </label>
              <input
                name="sponsor"
                value={formData.sponsor}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Total Cycles
              </label>
              <input
                type="number"
                name="totalNumberCycles"
                value={formData.totalNumberCycles}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Total Pricing
              </label>
              <input
                type="number"
                name="totalPricing"
                value={formData.totalPricing}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Select Studies
              </label>
              <select
                multiple
                name="studyIds"
                value={formData.studyIds}
                onChange={handleChange}
                className={inputClass + " h-32"}
                disabled={isLoadingStudies}
              >
                {isLoadingStudies ? (
                  <option>Loading studies...</option>
                ) : (
                  studiesData?.content?.map((study) => (
                    <option key={study.id} value={study.id}>
                      {study.studyName}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="sm:col-span-2">
                 <label className="text-sm font-medium text-slate-700">
                    Notes
                </label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Write notes here..."
                    className="w-full mt-2 border rounded-lg shadow bg-white p-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Study
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}