import React from "react";
import { Edit, Trash2, FileText } from "lucide-react";
import PDFViewerModal from "./PDFViewerModal";

export default function StudyList({
    studies,
    selected,
    toggleSelect,
    toggleSelectAll,
    onView,
    onEdit,
    onDelete,
}) {
    const [currentPage, setCurrentPage] = React.useState(1);
    const rowsPerPage = 10;

    const safeStudies = studies || [];

    const totalPages = Math.ceil(safeStudies.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    const currentRows = safeStudies.slice(startIndex, endIndex);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const [showPDF, setShowPDF] = React.useState(false);
    const [pdfUrl, setPdfUrl] = React.useState(null);

    return (
        <>
            {/* DESKTOP VIEW */}
            <div className="hidden md:block w-full">
                <table className="w-full text-[12px] border-collapse table-auto">
                    <thead className="bg-gray-50 text-gray-600">
                        <tr>
                            <th className="p-3">
                                <input
                                    type="checkbox"
                                    checked={selected.length === safeStudies.length}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th className="p-1 text-left">S.No</th>
                            <th className="p-1 text-left">Study Name</th>
                            <th className="p-1 text-left">Sponsor</th>
                            <th className="p-1 text-left">Start Date</th>
                            <th className="p-1 text-left">End Date</th>
                            <th className="p-1 text-left">Status</th>
                            <th className="p-1 text-left">Documents</th>
                            <th className="p-1 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentRows.map((s, i) => (
                            <tr
                                key={s.id}
                                className={`border-t hover:bg-gray-50 
                                   ${selected.includes(s.id) ? "bg-blue-50" : ""}`}
                            >
                                <td className="p-3">
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(s.id)}
                                        onChange={() => toggleSelect(s.id)}
                                    />
                                </td>

                                <td className="p-1">{startIndex + i + 1}</td>
                                <td className="p-1">{s.studyName}</td>
                                <td className="p-1">{s.sponsor}</td>

                                <td className="p-1">
                                    {s.startDate ? new Date(s.startDate).toLocaleDateString() : "—"}
                                </td>

                                <td className="p-1">
                                    {s.endDate ? new Date(s.endDate).toLocaleDateString() : "—"}
                                </td>

                                <td className="p-1">{s.status || "—"}</td>

                                {/* Documents */}
                                <td className="p-3 w-20 text-center">
                                    <FileText
                                        size={16}
                                        className="text-blue-600 cursor-pointer"
                                        onClick={() => {
                                            setPdfUrl("/sample.pdf");
                                            setShowPDF(true);
                                        }}
                                    />
                                </td>

                                {/* Actions */}
                                <td className="p-3 w-20 flex items-center gap-3">
                                    <Edit
                                        size={16}
                                        className="cursor-pointer text-blue-600"
                                        onClick={() => onEdit(s.id)}
                                    />
                                    <Trash2
                                        size={16}
                                        className="cursor-pointer text-red-600"
                                        onClick={() => onDelete(s.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-end items-center p-3 border-t text-sm gap-1">
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
                            className={`px-3 py-1 border ${
                                currentPage === index + 1
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

            {/* MOBILE VIEW */}
            <div className="block md:hidden p-3 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                    <input
                        type="checkbox"
                        checked={selected.length === safeStudies.length}
                        onChange={toggleSelectAll}
                    />
                    <label className="text-sm text-gray-700 font-medium">
                        Select All
                    </label>
                </div>

                {currentRows.map((s) => (
                    <div
                        key={s.id}
                        className={`border rounded-lg p-3 shadow-sm ${
                            selected.includes(s.id)
                                ? "bg-blue-50 border-blue-300"
                                : "bg-gray-50"
                        }`}
                    >
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={selected.includes(s.id)}
                                    onChange={() => toggleSelect(s.id)}
                                />
                                <h2 className="font-semibold text-gray-800">
                                    {s.studyName}
                                </h2>
                            </div>
                        </div>

                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <p><strong>Sponsor:</strong> {s.sponsor}</p>
                            <p><strong>Status:</strong> {s.status || "—"}</p>
                            <p>
                                <strong>Start:</strong>{" "}
                                {s.startDate ? new Date(s.startDate).toLocaleDateString() : "—"}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-3 flex justify-end gap-3">
                            <Edit
                                size={16}
                                className="cursor-pointer text-blue-600"
                                onClick={() => onEdit(s.id)}
                            />
                            <Trash2
                                size={16}
                                className="cursor-pointer text-red-600"
                                onClick={() => onDelete(s.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {showPDF && (
                <PDFViewerModal url={pdfUrl} onClose={() => setShowPDF(false)} />
            )}
        </>
    );
}
