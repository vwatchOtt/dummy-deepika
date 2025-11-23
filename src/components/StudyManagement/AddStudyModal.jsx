import React, { useState, useRef } from "react";
import { X } from "lucide-react";
import UploadDocuments from "./UploadDocuments";

/* ---------------------------------------------
   NOTES EDITOR
--------------------------------------------- */
function NotesEditor({ formData, setFormData, CHAR_LIMIT = 250 }) {
  return (
    <div className="sm:col-span-3">
      <label className="text-sm font-medium text-slate-700">
        Notes <span className="text-red-500">*</span>
      </label>

      <textarea
        value={formData.notes}
        onChange={(e) =>
          setFormData({
            ...formData,
            notes: e.target.value.slice(0, CHAR_LIMIT),
          })
        }
        placeholder="Write notes here..."
        className="w-full mt-2 border rounded-lg shadow bg-white p-3 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
      />

      <div className="flex justify-between mt-1 text-xs text-slate-500">
        <span></span>
        <span>
          {(formData.notes || "").length} / {CHAR_LIMIT}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------
   MAIN MODAL
--------------------------------------------- */
export default function AddPatientModal({ onClose, onAddPatient }) {
  const CHAR_LIMIT = 250;

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    address: "",
    phone: "",
    status: "",
    gender: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    notes: "",
  });

  // 🔄 AUTO UPDATE ADDRESS BASED ON 4 FIELDS
  React.useEffect(() => {
    const { city, zip, state, country } = formData;

    const fullAddress = [city, zip, state, country]
      .filter(Boolean)
      .join(", ");

    setFormData((prev) => ({
      ...prev,
      address: fullAddress,
    }));
  }, [formData.city, formData.zip, formData.state, formData.country]);

  const countries = [
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Dubai (UAE)", code: "+971", flag: "🇦🇪" },
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleClear = () => {
    setFormData({
      name: "",
      age: "",
      email: "",
      address: "",
      phone: "",
      status: "",
      gender: "",
      city: "",
      zip: "",
      state: "",
      country: "",
      notes: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please fill required fields (name & email).");
      return;
    }
    onAddPatient(formData);
    onClose();
  };

  const inputClass =
    "w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl overflow-auto bg-white rounded-lg shadow-lg max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">Add Patient</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Patient Name *
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Age *</label>
              <select
                name="age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                required
                className={inputClass}
              >
                <option value="">Select age</option>
                {Array.from({ length: 100 }).map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
                className={inputClass}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Mobile No. *
              </label>

              <div className="flex items-center gap-2 mt-2 border rounded-md px-3 py-2 bg-white">
                <select
                  className="bg-transparent outline-none text-sm"
                  value={selectedCountry.code}
                  onChange={(e) => {
                    const ct = countries.find(
                      (c) => c.code === e.target.value
                    );
                    setSelectedCountry(ct);
                  }}
                >
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  className="flex-1 outline-none text-sm bg-transparent"
                  placeholder="Enter number"
                  value={formData.phone.replace(selectedCountry.code, "")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: `${selectedCountry.code}${e.target.value}`,
                    }))
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">City*</label>
              <input
                type="text"
                className={inputClass}
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">ZIP Code*</label>
              <input
                type="text"
                className={inputClass}
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">State*</label>
              <input
                type="text"
                className={inputClass}
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium">Country*</label>
              <div className="flex items-center border mt-2 rounded-md px-3 py-2 bg-white">
                <select
                  className="w-full outline-none bg-transparent"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  {countries.map((c) => (
                    <option key={c.name}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <UploadDocuments />
            </div>

            <NotesEditor
              formData={formData}
              setFormData={setFormData}
              CHAR_LIMIT={CHAR_LIMIT}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 py-2 bg-blue-600 text-white rounded-md"
            >
              Create Patient
            </button>

            <button
              type="button"
              onClick={handleClear}
              className="flex-1 py-2 bg-red-500 text-white rounded-md"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
