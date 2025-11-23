import { X, Calendar } from "lucide-react";
import { useState } from "react";
import Select from "react-select";

export default function FilterModal({ onClose }) {
  const [studyName, setStudyName] = useState("");
  const [sponsor, setSponsor] = useState(null);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(null);

  const sponsorOptions = [
    { label: "PharmaCorp", value: "pharma" },
    { label: "BioTech Labs", value: "biotech" },
  ];

  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 bg-white shadow-xl border rounded-xl w-[95vw] sm:w-[500px] md:w-[700px] p-4 z-50">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold">Filter</h2>

        <button
          onClick={onClose}
          className="w-7 h-7 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
        >
          <X size={16} className="sm:size-5" />
        </button>
      </div>

      {/* GRID Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">

        {/* Study Name */}
        <div>
          <label className="text-xs sm:text-sm text-gray-600">Study Name</label>
          <input
            type="text"
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
            placeholder="e.g. Ovarian Cancer"
            className="w-full mt-1 border rounded-md px-2 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Sponsors */}
        <div>
          <label className="text-xs sm:text-sm text-gray-600">Sponsors</label>
          <Select
            value={sponsor}
            onChange={setSponsor}
            options={sponsorOptions}
            placeholder="Select Sponsor"
            className="mt-1 text-xs sm:text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "38px",
                height: "38px",
                borderRadius: "8px",
                fontSize: "12px",
              }),
            }}
          />
        </div>

        {/* Date */}
        <div className="relative">
          <label className="text-xs sm:text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mt-1 border rounded-md px-2 py-2 pr-10 text-xs sm:text-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <Calendar
            size={18}
            className="absolute right-3 top-9 text-gray-400 pointer-events-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-xs sm:text-sm text-gray-600">Status</label>
          <Select
            value={status}
            onChange={setStatus}
            options={statusOptions}
            placeholder="Select"
            className="mt-1 text-xs sm:text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "38px",
                borderRadius: "8px",
                fontSize: "12px",
              }),
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-5">

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm sm:text-base hover:bg-blue-700">
          Apply
        </button>

        <button
          className="bg-red-500 text-white px-5 py-2 rounded-md text-sm sm:text-base hover:bg-red-600"
          onClick={() => {
            setStudyName("");
            setSponsor(null);
            setDate("");
            setStatus(null);
          }}
        >
          Clear Filters
        </button>

      </div>
    </div>
  );
}
