// import React from "react";
// import { Edit, Trash2, FileText } from "lucide-react";
// import PDFViewerModal from "./PDFViewerModal";
// import axios from "axios";


// export default function PatientList({
//     patients,
//     selected,
//     toggleSelect,
//     toggleSelectAll,
//     onView,
//     onEdit,
//     onDelete,
// }) {
//     const statusColors = {
//         Active: "bg-green-100 text-green-600",
//         Inactive: "bg-gray-100 text-gray-600",
//         Admitted: "bg-blue-100 text-blue-600",
//         Completed: "bg-teal-100 text-teal-600",
//     };


//     // pagination logic 

//     const [currentPage, setCurrentPage] = React.useState(1);
//     const rowsPerPage = 10;

//     const totalPages = Math.ceil(patients.length / rowsPerPage);
//     const startIndex = (currentPage - 1) * rowsPerPage;
//     const endIndex = startIndex + rowsPerPage;

//     const currentRows = patients.slice(startIndex, endIndex);

//     const goToPage = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             setCurrentPage(page);
//         }
//     };


//     const [showPDF, setShowPDF] = React.useState(false);
//     const [pdfUrl, setPdfUrl] = React.useState(null);

//     const openDocuments = async (patient) => {
//         try {
//             // const token = localStorage.getItem("accessToken");

//             // const response = await axios.get(
//             //     `https://oncology-api.itrtechsystems.com/api/admin/file/uploaded?formUuid=${patient.tempSessionId}`,
//             //     { headers: { Authorization: `Bearer ${token}` } }
//             // );
//             // console.log(patient, response);

//             // if (!response.data || response.data.length === 0) {
//             //     alert("No documents uploaded!");
//             //     return;
//             // }
//             if (!patient.documents || patient.documents.length === 0) {
//                 alert("No documents uploaded!");
//                 return;
//             }   
            
//             setPdfUrl(patient.documents?.[0].fileUrl || "/sample.pdf");
//             setShowPDF(true);
//             // window.open(patient.documents?.[0].fileUrl, "_blank");

//         } catch (error) {
//             alert("Unable to load documents!");
//         }
//     };


//     return (
//         <>
//             {/* ===========================
//           DESKTOP TABLE VIEW
//       ============================ */}
//             <div className="hidden md:block w-full">
//                 <table className="w-full text-[12px] border-collapse table-auto">
//                     <thead className="bg-gray-50 text-gray-600">
//                         <tr>
//                             <th className="p-3 text-left">
//                                 <input
//                                     type="checkbox"
//                                     checked={selected.length === patients.length}
//                                     onChange={toggleSelectAll}
//                                 />
//                             </th>

//                             <th className="p-1 text-left">S.No</th>
//                             <th className="p-1 text-left">Pt. Name</th>
//                             <th className="p-1 text-left">Age</th>
//                             <th className="p-1 text-left">Email</th>
//                             <th className="p-1 text-left">Address</th>
//                             <th className="p-1 text-left">Mobile No.</th>
//                             <th className="p-1 text-left">Documents</th>

//                             {/* ACTIONS COLUMN */}
//                             <th className="p-1 pl-4 text-left">Actions</th>

//                         </tr>
//                     </thead>

//                     <tbody>
//                         {currentRows.map((p, i) => (
//                             <tr
//                                 key={p.id}
//                                 className={`border-t hover:bg-gray-50 ${selected.includes(p.id) ? "bg-blue-50" : ""
//                                     }`}
//                             >
//                                 {/* 1. Checkbox */}
//                                 <td className="p-3">
//                                     <input
//                                         type="checkbox"
//                                         checked={selected.includes(p.id)}
//                                         onChange={() => toggleSelect(p.id)}
//                                     />
//                                 </td>

//                                 {/* 2. S.No */}
//                                 <td className="p-1">{p.serial}</td>

//                                 {/* 3. Name */}
//                                 <td className="p-1">{p.name}</td>

//                                 {/* 4. Age */}
//                                 <td className="p-1">{p.age}</td>

//                                 {/* 5. Email */}
//                                 <td className="p-1">{p.email}</td>

//                                 {/* 6. Address */}
//                                 <td className="p-1">{p.address}</td>

//                                 {/* 7. Phone */}
//                                 <td className="p-1">{p.phone}</td>

//                                 {/* 8. Documents */}
//                                 {/* <td className="p-3 w-20 ">
//                                     <FileText size={16} className="text-blue-600 mx-auto" />
//                                 </td> */}
//                                 <td className="p-3 w-20 ">
//                                     {/* <FileText
//                                         size={16}
//                                         className="text-blue-600 mx-auto cursor-pointer"
//                                         onClick={() => {
//                                             setPdfUrl(p.documentUrl || "/sample.pdf");
//                                             setShowPDF(true);
//                                         }}
//                                     /> */}
//                                     <FileText
//                                         size={16}
//                                         className="text-blue-600 mx-auto cursor-pointer"
//                                         onClick={() => openDocuments(p)}
//                                     />

//                                 </td>


//                                 {/* 9. Actions — FIXED (center aligned, correct column width) */}
//                                 <td className="p-3 w-20 flex items-center justify-center gap-3">
//                                     <Edit
//                                         size={16}
//                                         className="cursor-pointer text-blue-600"
//                                         onClick={() => onEdit(p.id)}
//                                     />
//                                     <Trash2
//                                         size={16}
//                                         className="cursor-pointer text-red-600"
//                                         onClick={() => onDelete(p.id)}
//                                     />
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>


//                 </table>

//                 {/* Pagination */}
//                 <div className="flex flex-wrap justify-center sm:justify-end items-center p-3 border-t text-sm gap-1">
//                     <button
//                         onClick={() => goToPage(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
//                     >
//                         &laquo;
//                     </button>

//                     {[...Array(totalPages)].map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => goToPage(index + 1)}
//                             className={`px-3 py-1 border ${currentPage === index + 1
//                                 ? "bg-blue-600 text-white"
//                                 : "hover:bg-gray-100"
//                                 }`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}

//                     <button
//                         onClick={() => goToPage(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
//                     >
//                         &raquo;
//                     </button>
//                 </div>




//             </div>

//             {/* ===========================
//           MOBILE CARD VIEW
//       ============================ */}
//             <div className="block md:hidden p-3 space-y-3">
//                 {/* Select All */}
//                 <div className="flex items-center gap-2 mb-2">
//                     <input
//                         type="checkbox"
//                         checked={selected.length === patients.length}
//                         onChange={toggleSelectAll}
//                     />
//                     <label className="text-sm text-gray-700 font-medium">
//                         Select All
//                     </label>
//                 </div>

//                 {currentRows.map((p) => (
//                     <div
//                         key={p.id}
//                         className={`border rounded-lg p-3 shadow-sm ${selected.includes(p.id)
//                             ? "bg-blue-50 border-blue-300"
//                             : "bg-gray-50"
//                             }`}
//                     >
//                         <div className="flex justify-between items-start">
//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={selected.includes(p.id)}
//                                     onChange={() => toggleSelect(p.id)}
//                                 />
//                                 <h2 className="font-semibold text-gray-800">{p.name}</h2>
//                             </div>

//                             {/* <span
//                                 className={`px-2 py-1 text-xs rounded-full ${statusColors[p.status]
//                                     }`}
//                             >
//                                 {p.status}
//                             </span> */}
//                         </div>

//                         <div className="mt-2 text-sm text-gray-600 space-y-1">
//                             <p>
//                                 <span className="font-small">S.No:</span> {p.serial}
//                             </p>
//                             <p>
//                                 <span className="font-medium">Age:</span> {p.age}
//                             </p>
//                             <p>
//                                 <span className="font-medium">Email:</span> {p.email}
//                             </p>
//                             <p>
//                                 <span className="font-medium">Address:</span> {p.address}
//                             </p>
//                             <p>
//                                 <span className="font-medium">Phone:</span> {p.phone}
//                             </p>
//                             {/* <p className="flex items-center gap-1 text-blue-600">
//                                 <FileText size={14} /> Documents
//                             </p> */}
//                             <p
//                                 className="flex items-center gap-1 text-blue-600 cursor-pointer"
//                                 onClick={() => {
//                                     setPdfUrl(p.documentUrl || "/sample.pdf");
//                                     setShowPDF(true);
//                                 }}
//                             >
//                                 <FileText size={14} /> Documents
//                             </p>

//                         </div>

//                         {/* Actions */}
//                         <div className="mt-3 flex justify-end gap-3 text-gray-600">
//                             {/* <Eye
//                 size={16}
//                 className="cursor-pointer hover:text-blue-600"
//                 onClick={() => onView(p.id)}
//               /> */}

//                             <Edit
//                                 size={16}
//                                 className="cursor-pointer text-blue-600"
//                                 onClick={() => onEdit(p.id)}
//                             />

//                             <Trash2
//                                 size={16}
//                                 className="cursor-pointer text-red-600"
//                                 onClick={() => onDelete(p.id)}

//                             />
//                         </div>
//                     </div>
//                 ))}


//                 {/* Pagination */}
//                 <div className="flex flex-wrap justify-center sm:justify-end items-center p-3 border-t text-sm gap-1">
//                     <button
//                         onClick={() => goToPage(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
//                     >
//                         &laquo;
//                     </button>

//                     {[...Array(totalPages)].map((_, index) => (
//                         <button
//                             key={index}
//                             onClick={() => goToPage(index + 1)}
//                             className={`px-3 py-1 border ${currentPage === index + 1
//                                 ? "bg-blue-600 text-white"
//                                 : "hover:bg-gray-100"
//                                 }`}
//                         >
//                             {index + 1}
//                         </button>
//                     ))}

//                     <button
//                         onClick={() => goToPage(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
//                     >
//                         &raquo;
//                     </button>
//                 </div>


//             </div>
//             {showPDF && (
//                 <PDFViewerModal
//                     url={pdfUrl}
//                     onClose={() => setShowPDF(false)}
//                 />
//             )}

//         </>


//     );
// }

import React from "react";
import { Edit, Trash2, FileText } from "lucide-react";
import PDFViewerModal from "./PDFViewerModal";
import axios from "axios";

export default function PatientList({
    patients,
    selected,
    toggleSelect,
    toggleSelectAll,
    onView,
    onEdit,
    onDelete,
}) {
    const statusColors = {
        Active: "bg-green-100 text-green-600",
        Inactive: "bg-gray-100 text-gray-600",
        Admitted: "bg-blue-100 text-blue-600",
        Completed: "bg-teal-100 text-teal-600",
    };

    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(patients.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const currentRows = patients.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const [showPDF, setShowPDF] = React.useState(false);
    const [pdfUrl, setPdfUrl] = React.useState(null);

    const openDocuments = async (patient) => {
        try {
            if (!patient.documents || patient.documents.length === 0) {
                alert("No documents uploaded!");
                return;
            }   
            
            setPdfUrl(patient.documents?.[0].fileUrl || "/sample.pdf");
            setShowPDF(true);

        } catch (error) {
            alert("Unable to load documents!");
        }
    };

    return (
        <>
            <div className="hidden md:block w-full">
                <table className="w-full text-[12px] border-collapse table-auto">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3 text-left">
                                <input
                                    type="checkbox"
                                    checked={selected.length === patients.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-1 text-left">S.No</th>
                            <th className="p-1 text-left">Pt. Name</th>
                            <th className="p-1 text-left">Age</th>
                            <th className="p-1 text-left">Email</th>
                            <th className="p-1 text-left">Address</th>
                            <th className="p-1 text-left">Mobile No.</th>
                            <th className="p-1 text-left">Documents</th>
                            <th className="p-1 pl-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentRows.map((p, i) => (
                            <tr
                                key={p.id}
                                className={`border-t hover:bg-gray-50 ${selected.includes(p.id) ? "bg-blue-50" : ""
                                    }`}
                            >
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(p.id)}
                                        onChange={() => toggleSelect(p.id)}
                                    />
                                </td>
                                <td className="p-1">{p.serial}</td>
                                <td className="p-1">{p.name}</td>
                                <td className="p-1">{p.age}</td>
                                <td className="p-1">{p.email}</td>
                                <td className="p-1">{p.address}</td>
                                <td className="p-1">{p.phone}</td>
                                <td className="p-3 w-20 ">
                                    <FileText
                                        size={16}
                                        className="text-blue-600 mx-auto cursor-pointer"
                                        onClick={() => openDocuments(p)}
                                    />
                                </td>
                                <td className="p-3 w-20 flex items-center justify-center gap-3">
                                    <Edit
                                        size={16}
                                        className="cursor-pointer text-blue-600"
                                        onClick={() => { 
                                            onEdit(p.id)}}
                                    />
                                    <Trash2
                                        size={16}
                                        className="cursor-pointer text-red-600"
                                        onClick={() => onDelete(p.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex flex-wrap justify-center sm:justify-end items-center p-3 border-t text-sm gap-1">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        &laquo;
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`px-3 py-1 border ${currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                                }`}
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
                </div>
            </div>

            <div className="block md:hidden p-3 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        checked={selected.length === patients.length}
                        onChange={toggleSelectAll}
                    />
                    <label className="text-sm text-gray-700 font-medium">
                        Select All
                    </label>
                </div>

                {currentRows.map((p) => (
                    <div
                        key={p.id}
                        className={`border rounded-lg p-3 shadow-sm ${selected.includes(p.id)
                            ? "bg-blue-50 border-blue-300"
                            : "bg-gray-50"
                            }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(p.id)}
                                    onChange={() => toggleSelect(p.id)}
                                />
                                <h2 className="font-semibold text-gray-800">{p.name}</h2>
                            </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <p>
                                <span className="font-small">S.No:</span> {p.serial}
                            </p>
                            <p>
                                <span className="font-medium">Age:</span> {p.age}
                            </p>
                            <p>
                                <span className="font-medium">Email:</span> {p.email}
                            </p>
                            <p>
                                <span className="font-medium">Address:</span> {p.address}
                            </p>
                            <p>
                                <span className="font-medium">Phone:</span> {p.phone}
                            </p>
                            <p
                                className="flex items-center gap-1 text-blue-600 cursor-pointer"
                                onClick={() => openDocuments(p)}
                            >
                                <FileText size={14} /> Documents
                            </p>
                        </div>

                        <div className="mt-3 flex justify-end gap-3 text-gray-600">
                            <Edit
                                size={16}
                                className="cursor-pointer text-blue-600"
                                onClick={() => {
                                    onEdit(p.id)}}

                            />
                            <Trash2
                                size={16}
                                className="cursor-pointer text-red-600"
                                onClick={() => onDelete(p.id)}
                            />
                        </div>
                    </div>
                ))}

                <div className="flex flex-wrap justify-center sm:justify-end items-center p-3 border-t text-sm gap-1">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        &laquo;
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`px-3 py-1 border ${currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-100"
                                }`}
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
                </div>
            </div>
            
            {showPDF && (
                <PDFViewerModal
                    url={pdfUrl}
                    onClose={() => setShowPDF(false)}
                />
            )}
        </>
    );
}