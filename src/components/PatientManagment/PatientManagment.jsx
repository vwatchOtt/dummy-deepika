import React, { useEffect, useState } from "react";
import { Search, Download, Trash2, Filter } from "lucide-react";

import PatientList from "./PatientList";
import AddPatientModal from "./AddPatientModal";
import EditPatientModal from "./EditPatientModal";
import ViewPatientModal from "./ViewPatientModal";
import DeleteModal from "./DeleteModal";
import FilterModal from "./FilterModel";

// RTK IMPORTS - make sure these hooks exist in your slice
import {
  useGetPatientsQuery,
  useDeletePatientMutation,
} from "../../features/patient/api/patientApi";

export default function PatientsManagement() {
  const rowsPerPage = 10; // frontend and backend page size

  // UI state
  const [selected, setSelected] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Pagination state (1-based for UI)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  // ---------- RTK Query: fetch patients with pagination ----------
  // We pass page (0-based) and size — adjust param names if your API expects different names
  const {
    data: patientsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetPatientsQuery({
    page: Math.max(0, currentPage - 1),
    size: rowsPerPage,
  });

  // console for debugging
  console.log("GET /api/patients response:", patientsResponse);

  // ---------- Map server response to frontend `patients` array ----------
  // Backend returns { content: [...], totalPages, totalElements, number }
  const rawList = patientsResponse?.content || [];

  const patients =
    rawList?.map((item, idx) => ({
      id: item.id,
      serial: item.serial || ( (patientsResponse?.number || 0) * rowsPerPage + idx + 1 ), // fallback computed serial
      name: item.patientName,
      age: item.age,
      email: item.email,
      address: item.address || "",
      phone: item.contactNumber || "",
      tempSessionId: item.tempSessionId || item.tempSession || null,
      documents: item.documents || [],
      raw: item,
    })) || [];

  // update pagination metadata from backend
  useEffect(() => {
    if (!patientsResponse) return;
    setTotalPages(patientsResponse.totalPages ?? 1);
    setTotalElements(patientsResponse.totalElements ?? (patientsResponse.content?.length ?? 0));
    // if backend returned page number, sync it (backend number is 0-based)
    if (typeof patientsResponse.number === "number") {
      setCurrentPage(patientsResponse.number + 1);
    }
  }, [patientsResponse]);

  // ---------- DELETE (RTK Mutation) ----------
  const [deletePatient] = useDeletePatientMutation();

  const handleDeletePatient = async (ids) => {
    try {
      
        await deletePatient(ids.join(",")).unwrap();
      
      setSelected([]); // clear selection
      refetch();
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // ---------- Selection helpers ----------
  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selected.length === patients.length) setSelected([]);
    else setSelected(patients.map((p) => p.id));
  };

  // ---------- Add/Update handlers ----------
  const handleAddPatient = () => {
    // after add modal uses API to create --> refetch list
    refetch();
  };
  const handleUpdatePatient = () => {
    refetch();
  };

  // ---------- Pagination controls ----------
  const goToPage = (page) => {
    if (page < 1 || page > Math.max(1, totalPages)) return;
    setCurrentPage(page);
    // RTK Query will re-run because hook args changed
    // clear current selection when page changes
    setSelected([]);
    // no need to call refetch manually — the query hook will re-fetch automatically
  };

  // ---------- Loading / Error UI ----------
  const loading = isLoading || isFetching;

  if (isError) {
    return (
      <div className="p-6 text-center text-lg font-semibold text-red-600">
        Error loading patients. Try refreshing or check your network.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 overflow-x-hidden w-full max-w-full relative">
      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10">
          <div className="bg-white px-6 py-4 rounded-md shadow flex items-center gap-3">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
            <span className="font-medium">Loading patients...</span>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className="text-[14px] bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          + Add Patient
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden w-full max-w-full">
        <div className="bg-blue-600 text-white px-4 py-2 font-semibold">Patient Management</div>

        {/* Search + Actions */}
        <div className="p-4 border-b flex flex-col md:flex-row gap-3 justify-between">
          <div className="relative md:w-100 w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Patient ID..."
              className="pl-10 pr-3 py-1 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              disabled={selected.length === 0}
              className={`text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border 
                ${selected.length > 0 ? "bg-blue-600 text-white border-blue-600" : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"}`}
            >
              <Download size={16} /> Export
            </button>

            <button
              disabled={selected.length === 0}
              onClick={() => setShowDelete([...selected])}
              className={`text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border 
                ${selected.length > 0 ? "bg-red-600 text-white border-red-600" : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"}`}
            >
              <Trash2 size={16} /> Delete
            </button>

            <div className="relative inline-block">
              <button
                onClick={() => setShowFilter(true)}
                className="text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border bg-blue-600 text-white"
              >
                <Filter size={16} /> Filters
              </button>

              {showFilter && <FilterModal onClose={() => setShowFilter(false)} />}
            </div>
          </div>
        </div>

        {/* Patient List (uses your existing PatientList.jsx) */}
        <PatientList
          patients={patients}
          selected={selected}
          toggleSelect={toggleSelect}
          toggleSelectAll={toggleSelectAll}
          onView={setShowView}
          onEdit={(id) => {
            setSelectedPatient(patients.find((p) => p.id === id));
            setShowEdit(id);
          }}
          onDelete={(id) => setShowDelete([id])}
        />

        {/* Server-driven Pagination controls (keeps UI look consistent with your PatientList pagination) */}
        <div className="flex flex-wrap justify-center sm:justify-end items-center p-3 border-t text-sm gap-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            &laquo;
          </button>

          {/* Render page numbers up to totalPages (if totalPages large, you can add truncation later) */}
          {[...Array(Math.max(1, totalPages))].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`px-3 py-1 border ${currentPage === index + 1 ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            &raquo;
          </button>

          <div className="ml-3 text-gray-600">
            Page {currentPage} of {totalPages} • {totalElements} items
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAdd && <AddPatientModal onClose={() => setShowAdd(false)} onAddPatient={handleAddPatient} />}

      {showView && (
        <ViewPatientModal
          patient={patients.find((p) => p.id === showView)}
          onClose={() => setShowView(null)}
        />
      )}

      {showEdit && (
        <EditPatientModal
          patientData={selectedPatient}
          onClose={() => setShowEdit(false)}
          onUpdate={handleUpdatePatient}
        />
      )}

      {showDelete && (
        <DeleteModal
          ids={showDelete}
          onClose={() => setShowDelete(null)}
          onConfirm={(idsToDelete) => {
            handleDeletePatient(idsToDelete);
            setShowDelete(null);
          }}
        />
      )}

      {/* PDF Viewer fallback sample url: (local uploaded file path from this session) */}
      {/* Your environment will transform the sandbox path to a usable URL. */}
      {/* Example fallback URL used by PatientList / PDF viewer if needed: */}
      {/* sandbox:/mnt/data/86160671-f861-4be4-8474-b1f0e628708f.png */}
    </div>
  );
}
