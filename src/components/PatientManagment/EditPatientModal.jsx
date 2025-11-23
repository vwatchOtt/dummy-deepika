import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import UploadDocuments from "./UploadDocuments";
import { useUpdatePatientMutation } from "../../features/patient/api/patientApi";


export default function EditPatientModal({ onClose, patientData }) {
  const CHAR_LIMIT = 250;

  const [uuid, setUuid] = useState(null);
  
    // Generate UUID when modal opens
    useEffect(() => {
      const id = crypto.randomUUID();
      setUuid(id);
      console.log("UUID Generated:", id);
    }, []);

  // HOOKS MUST ALWAYS RUN — cannot be inside condition
  const [updatePatient, { isLoading }] = useUpdatePatientMutation();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    gender: "",
    city: "",
    zip: "",
    state: "",
    country: "",
    notes: "",
  });

  // SAFE: useEffect always runs
  useEffect(() => {
    if (patientData) {
      setFormData({
        name: patientData.patientName || "",
        age: patientData.age || "",
        email: patientData.email || "",
        phone: patientData.contactNumber || "",
        gender: patientData.gender || "",
        city: patientData.city || "",
        zip: patientData.zipCode || "",
        state: patientData.state || "",
        country: patientData.country || "",
        notes: patientData.notes || "",
      });
    }
  }, [patientData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientData?.id) {
      alert("Invalid patient data");
      return;
    }

    try {
      const body = {
        patientName: formData.name,
        tempSessionId: uuid,
        age: formData.age,
        email: formData.email,
        contactNumber: formData.phone,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zip,
        country: formData.country,
        gender: formData.gender,
        notes: formData.notes,
      };

      await updatePatient({ id: patientData.id, body }).unwrap();

      alert("Patient updated successfully!");
      onClose();
    } catch (err) {
      console.log("UPDATE ERROR:", err);
      alert("Failed to update patient.");
    }
  };

  const inputClass =
    "w-full px-3 py-2 mt-2 border border-gray-300 rounded-md bg-white";

  // ❗ CONDITIONAL RETURN SAFE — HOOKS ALREADY EXECUTED ABOVE
  if (!patientData) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/40 p-4 z-50">
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-lg font-medium">Loading Patient...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Edit Patient</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* All fields same */}
            {/* NAME */}
            <div>
              <label>Patient Name *</label>
              <input
                className={inputClass}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            {/* Age */}
            <div>
              <label>Age *</label>
              <select
                className={inputClass}
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              >
                <option value="">Select</option>
                {Array.from({ length: 100 }).map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label>Gender *</label>
              <select
                className={inputClass}
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              >
                <option value="">Select</option>
                <option>MALE</option>
                <option>FEMALE</option>
                <option>OTHERS</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label>Email *</label>
              <input
                className={inputClass}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {/* Phone */}
            <div>
              <label>Phone *</label>
              <input
                className={inputClass}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            {/* City */}
            <div>
              <label>City *</label>
              <input
                className={inputClass}
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
            </div>

            {/* ZIP */}
            <div>
              <label>ZIP Code *</label>
              <input
                className={inputClass}
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
              />
            </div>

            {/* State */}
            <div>
              <label>State *</label>
              <input
                className={inputClass}
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
              />
            </div>

            {/* Country */}
            <div>
              <label>Country *</label>
              <input
                className={inputClass}
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
              />
            </div>

            {/* Upload */}
            <div className="sm:col-span-3">
              {patientData?.id && (
                <UploadDocuments patientId={ uuid} />
              )}
            </div>

            {/* Notes */}
            <div className="sm:col-span-3">
              <label>Notes *</label>
              <textarea
                className={inputClass}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          >
            {isLoading ? "Updating..." : "Update Patient"}
          </button>
        </form>
      </div>
    </div>
  );
}
