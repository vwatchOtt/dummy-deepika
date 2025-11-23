import React, { useEffect, useState } from "react";
import { Search, Download, Trash2, Filter } from "lucide-react";
// RTK Query Hook
import { useGetStudiesQuery } from "../../features/studyManagement/api/studyManagementApi";
import StudyList from "./StudyList";  // Desktop + Mobile merged component
import AddStudyModal from "./AddStudyModal";
import EditStudyModal from "./EditStudyModal";
import ViewStudyModal from "./ViewStudyModal";
import DeleteStudyModal from "./DeleteStudyModal";
import FilterStudyModal from "./FilterStudyModal";



export default function StudyManagement() {
  const rowsPerPage = 10
  const [studies, setStudies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  // Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [showDelete, setShowDelete] = useState(null); // id or array
  const [showFilter, setShowFilter] = useState(false);


  const {
    data: apiData,
    isLoading,
    isError,
    refetch,
  } = useGetStudiesQuery({ page: Math.max(0, currentPage - 1), limit: rowsPerPage });


  useEffect(() => {
    if (!apiData?.content?.length) return
    const studiesData = apiData.content?.map((item, idx) => ({
      serial: item.serial || ((apiData?.number || 0) * rowsPerPage + idx + 1), // fallback computed serial
      ...item
    })) || [];
    setStudies(studiesData || []);
    setTotalPages(apiData.totalPages || 0);
  }, [apiData])


  // Selection Handlers
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === studies.length) setSelected([]);
    else setSelected(studies.map((s) => s.id));
  };





  // add study handler
  const handleAddStudy = (data) => {
    // setStudies((prev) => [...prev, { id: Date.now(), ...data }]);
    refetch();
  };
  // Update study handler
  const handleUpdateStudy = (updated) => {
    refetch();
    // setStudies((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load studies!
      </div>
    );

  // const [selectedPatient, setSelectedPatient] = useState(null);



  return (
    <div className="min-h-screen bg-gray-100 p-4 overflow-x-hidden w-full max-w-full">
      {/* Header */}
      {/* <div className="flex  items-center mb-4"> */}
      {/* <h1 className="text-lg font-semibold text-gray-800">Patients Management</h1> */}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className=" text-[14px]  bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          + Add Study
        </button>
      </div>

      {/* </div> */}

      {/* Main Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden w-full max-w-full">
        {/* Title */}
        <div className="bg-blue-600 text-white px-4 py-2 font-semibold">
          Patient Management
        </div>

        {/* Search + Actions */}
        <div className="p-4 border-b flex flex-col md:flex-row gap-3 justify-between w-full max-w-full">
          <div className="relative md:w-100 w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Patient ID..."
              className="pl-10 pr-3 py-1 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-blue-400"

            />
          </div>

          {/* <div className="flex gap-2">
          <button className=" text-[14px] flex items-center gap-1 border border-gray-300 px-3 py-1 rounded-md">
            <Download size={16} /> Export
          </button> */}


          <div className="flex gap-2">

            {/* Export Button */}
            <button
              disabled={selected.length === 0}
              className={`text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border 
      ${selected.length > 0
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
            >
              <Download size={16} /> Export
            </button>

            {/* Delete Button */}
            <button
              disabled={selected.length === 0}
              onClick={() => selected.length > 0 && setShowDelete(selected)}
              className={`text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border
      ${selected.length > 0
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                }`}
            >
              <Trash2 size={16} /> Delete
            </button>

            {/* Filter Button */}
            {/* <button
    disabled={selected.length === 0}
    className={`text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border 
      ${selected.length > 0 
        ? "bg-blue-600 text-white border-blue-600" 
        : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
      }`}
  >
    <Filter size={16} /> Filters
  </button> */}
            <div className="relative inline-block">
              <button
                className="text-[14px] flex items-center gap-1 px-3 py-1 rounded-md border 
      bg-blue-600 text-white "
                onClick={() => setShowFilter(!showFilter)}
              >
                <Filter size={16} /> Filters
              </button>

              {showFilter && (
                <FilterStudyModal onClose={() => setShowFilter(false)} />
              )}
            </div>

          </div>

        </div>

        {/* Patient List Wrapper (scroll removed) */}
        <div className="w-full max-w-full overflow-x-hidden">
          <StudyList
            studies={studies}
            selected={selected}
            toggleSelect={toggleSelect}
            toggleSelectAll={toggleSelectAll}
            setShowAdd={setShowAdd}
            setShowView={setShowView}
            setShowEdit={setShowEdit}
            setShowDelete={setShowDelete}
            setShowFilter={setShowFilter}
          />
        </div>
      </div>

      {/* Modals */}
      {/* {showAdd && <AddPatientModal onClose={() => setShowAdd(false)} />} */}
      {showAdd && <AddStudyModal onClose={() => setShowAdd(false)} onAdd={handleAddStudy} />}
      {showView && (
        <ViewStudyModal
          id={showView}
          data={studies.find((s) => s.id === showView)}
          onClose={() => setShowView(null)}
        />
      )}


      {/* {showView && (
        <ViewStudyModal
          patient={patients.find((p) => p.id === showView)}
          onClose={() => setShowView(null)}
        />
      )} */}

      {/* {showEdit && (
      <EditPatientModal
        patient={patients.find((p) => p.id === showEdit)}
        onClose={() => setShowEdit(null)}
      />
    )} */}

      {/* {showEdit && (
        <EditStudyModal
          patient={selectedPatient}
          onClose={() => setShowEdit(false)}
          onUpdate={handleUpdatePatient}
        />
      )} */}


      {showEdit && (
        <EditStudyModal
          id={showEdit}
          data={studies.find((s) => s.id === showEdit)}
          onClose={() => setShowEdit(null)}
          onUpdate={handleUpdateStudy}
        />
      )}
      {showDelete && <DeleteStudyModal ids={selected} onClose={() => setShowDelete(false)} />}
      {showFilter && <FilterStudyModal onClose={() => setShowFilter(false)} />}

      {/* {showDelete && (
        <DeleteStudyModal
          ids={showDelete}
          onClose={() => setShowDelete(null)}
          onConfirm={(idsToDelete) => {
            setPatients((prev) =>
              prev.filter((p) => !idsToDelete.includes(p.id))
            );
          }}
        />
      )} */}
    </div>
  );
}
