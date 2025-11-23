import React, { useEffect, useState } from "react";
import { Search, Download, Trash2, Filter } from "lucide-react";
// RTK Query Hook
import { useGetStudiesQuery, useDeleteManyStudiesMutation, useAddStudyMutation, useUpdateStudyMutation } from "../../features/studyManagement/api/studyManagementApi";
import StudyList from "./StudyList";  // Desktop + Mobile merged component
import AddStudyModal from "./AddStudyModal";
import EditStudyModal from "./EditStudyModal";
import ViewStudyModal from "./ViewStudyModal";
import DeleteStudyModal from "./DeleteStudyModal";
import FilterStudyModal from "./FilterStudyModal";

export default function StudyManagement() {
  const rowsPerPage = 10;
  const [studies, setStudies] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  // Modal states
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(null);
  const [showEdit, setShowEdit] = useState(null);
  const [showDelete, setShowDelete] = useState(null); // id or array
  const [showFilter, setShowFilter] = useState(false);

  const {
    data: apiData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetStudiesQuery({ page: Math.max(0, currentPage - 1), limit: rowsPerPage });

  useEffect(() => {
    if (apiData) {
      const studiesData = apiData.content?.map((item, idx) => ({
        serial: item.serial || ((apiData?.number || 0) * rowsPerPage + idx + 1),
        ...item
      })) || [];
      setStudies(studiesData);
      setTotalPages(apiData.totalPages || 0);
      setTotalElements(apiData.totalElements || 0);
    }
  }, [apiData]);

  const [deleteManyStudies] = useDeleteManyStudiesMutation();
  const [addStudy] = useAddStudyMutation();
  const [updateStudy] = useUpdateStudyMutation();

  const handleDeleteStudies = async (studyIds) => {
    try {
      await deleteManyStudies({ studyIds }).unwrap();
      setSelected([]);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

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
  const handleAddStudy = async (studyData) => {
    try {
      await addStudy(studyData).unwrap();
    } catch (err) {
      console.error("Failed to add study: ", err);
    }
  };
  // Update study handler
  const handleUpdateStudy = async (studyData) => {
    try {
      await updateStudy({ id: studyData.id, body: studyData }).unwrap();
    } catch (err) {
      console.error("Failed to update study: ", err);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > Math.max(1, totalPages)) return;
    setCurrentPage(page);
    setSelected([]);
  };

  const loading = isLoading || isFetching;

  if (isError)
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load studies!
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 overflow-x-hidden w-full max-w-full relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10">
          <div className="bg-white px-6 py-4 rounded-md shadow flex items-center gap-3">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
            <span className="font-medium">Loading studies...</span>
          </div>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowAdd(true)}
          className=" text-[14px]  bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
        >
          + Add Study
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden w-full max-w-full">
        <div className="bg-blue-600 text-white px-4 py-2 font-semibold">
          Study Management
        </div>

        <div className="p-4 border-b flex flex-col md:flex-row gap-3 justify-between w-full max-w-full">
          <div className="relative md:w-100 w-full">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Study ID..."
              className="pl-10 pr-3 py-1 border border-gray-300 rounded-md w-full focus:ring-1 focus:ring-blue-400"
            />
          </div>

          <div className="flex gap-2">
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

        <div className="flex flex-wrap justify-center sm:justify-end items-center p-3 border-t text-sm gap-1">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
          >
            &laquo;
          </button>

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

      {showAdd && <AddStudyModal onClose={() => setShowAdd(false)} onAdd={handleAddStudy} />}
      {showView && (
        <ViewStudyModal
          id={showView}
          data={studies.find((s) => s.id === showView)}
          onClose={() => setShowView(null)}
        />
      )}
      {showEdit && (
        <EditStudyModal
          id={showEdit}
          data={studies.find((s) => s.id === showEdit)}
          onClose={() => setShowEdit(null)}
          onUpdate={handleUpdateStudy}
        />
      )}
      {showDelete && (
        <DeleteStudyModal
          ids={showDelete}
          onClose={() => setShowDelete(null)}
          onConfirm={handleDeleteStudies}
        />
      )}
      {showFilter && <FilterStudyModal onClose={() => setShowFilter(false)} />}
    </div>
  );
}
