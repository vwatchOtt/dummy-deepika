import React, { useState, useRef } from "react";
import { Upload, Trash2, Download } from "lucide-react";

export default function UploadDocuments() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    let updatedFiles = [...selectedFiles];

    for (let file of files) {
      if (updatedFiles.length >= 5) {
        alert("You can upload a maximum of 5 documents.");
        break;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert(`${file.name} is more than 2MB.`);
        continue;
      }

      const ext = file.name.split(".").pop().toLowerCase();
      if (!["pdf", "doc", "docx"].includes(ext)) {
        alert(`${file.name} is not a valid document format.`);
        continue;
      }

      updatedFiles.push({
        name: file.name,
        file,
      });
    }

    setSelectedFiles(updatedFiles);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const downloadFile = (fileObj) => {
    const url = URL.createObjectURL(fileObj.file);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileObj.name;
    a.click();
  };

  const getIcon = (name) => {
    const ext = name.split(".").pop().toLowerCase();
    if (ext === "pdf") {
      return "https://img.icons8.com/color/24/000000/pdf.png";
    }
    return "https://img.icons8.com/color/24/000000/ms-word.png";
  };

  return (
    <div className="w-full">

      {/* Title */}
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        Upload Documents
      </label>

      {/* Upload Box */}
      <div
        className="border-2 border-gray-300 border-dashed rounded-xl py-8 cursor-pointer 
                   text-center hover:border-blue-400 transition"
        onClick={() => fileInputRef.current.click()}
      >
        <Upload size={28} className="mx-auto text-gray-500" />
        <p className="text-gray-600 mt-2">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-gray-400">PDF, DOC up to 2MB</p>

        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          multiple
          onChange={handleFileUpload}
        />
      </div>

      {/* Document List Table */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-3 w-24 text-left">Serial No.</th>
                <th className="py-2 px-3 text-left">Document</th>
                <th className="py-2 px-3 w-32 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {selectedFiles.map((fileObj, index) => (
                <tr key={index} className="border-t">

                  {/* Serial No */}
                  <td className="py-3 px-3 align-middle">
                    {String(index + 1).padStart(2, "0")}
                  </td>

                  {/* Document Column */}
                  <td className="py-3 px-3 align-middle">
                    <div className="flex items-center gap-2">
                      <img
                        src={getIcon(fileObj.name)}
                        className="w-5 h-5 flex-shrink-0"
                      />
                      <span className="truncate">{fileObj.name}</span>
                    </div>
                  </td>

                  {/* ACTION COLUMN — FIXED! */}
                  <td className="py-3 px-3 align-middle">
                    <div className="flex items-center gap-4">
                      <Trash2
                        size={18}
                        className="text-red-500 cursor-pointer"
                        onClick={() => removeFile(index)}
                      />
                      <Download
                        size={18}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => downloadFile(fileObj)}
                      />
                    </div>
                  </td>

                </tr>
              ))}

            </tbody>
          </table>
        </div>

      )}
    </div>
  );
}
