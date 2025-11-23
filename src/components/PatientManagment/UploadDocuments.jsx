// src/components/UploadDocuments.jsx
import React, { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import {
  useUploadDocumentsMutation,
  useGetUploadedDocumentsQuery,
  useDeleteDocumentMutation,
} from "../../features/patient/api/patientApi";
import PDFViewerModal from "./PDFViewerModal";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
// fallback url for quick dev testing (your uploaded file in container)
const FALLBACK_TEST_URL = "/mnt/data/6b058d51-1dd9-4bdd-a55f-f59721adc092.png";

export default function UploadDocuments({ patientId /* this is tempSessionId */ }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]); // list from server
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const [uploadFiles, { isLoading: isUploading }] = useUploadDocumentsMutation();
  const [deleteDocument] = useDeleteDocumentMutation();

  // fetch uploaded docs for this tempSessionId (optional)
  const { data: serverFiles } = useGetUploadedDocumentsQuery(patientId, {
    skip: !patientId,
  });

  // sync serverFiles into state when available
  React.useEffect(() => {
    if (Array.isArray(serverFiles)) {
      setUploadedFiles(
        serverFiles.map((f) => ({
          id: f.id || f.uuid || f.fileId || Math.random().toString(36).slice(2),
          name: f.fileName || f.name || "file",
          url: f.fileUrl || f.url || f.path || FALLBACK_TEST_URL,
          raw: f,
        }))
      );
    }
  }, [serverFiles]);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    // validation: count
    if (files.length + uploadedFiles.length > MAX_FILES) {
      alert(`Max ${MAX_FILES} files allowed total (already uploaded: ${uploadedFiles.length}).`);
      return;
    }

    // validate each file
    const invalid = files.find((f) => f.size > MAX_FILE_SIZE);
    if (invalid) {
      alert(`${invalid.name} is too large. Max file size is 10MB.`);
      return;
    }

    const formatted = files.map((file) => ({
      name: file.name,
      type: file.type,
      file,
    }));

    setSelectedFiles(formatted);

    // auto upload Immediately
    uploadNow(formatted);
  };

  const uploadNow = async (filesArr) => {
    if (!filesArr || filesArr.length === 0) return;
    if (!patientId) {
      // If user hasn't created patient yet, we still send tempSessionId (patientId holds UUID from modal)
      // show a warning but still proceed if patientId exists
      console.warn("No patientId (tempSessionId) provided; sending null. Backend expects tempSessionId.");
    }

    const formData = new FormData();
    filesArr.forEach((item) => {
      formData.append("file", item.file);
    });

    // formData.append(
    //   "metadata",
    //   JSON.stringify({
    //     moduleType: "PATIENT",
    //     tempSessionId: patientId || null,
    //     description: "patient document",
    //   })
    // );
const metadata = {
  moduleType: "PATIENT",
  formUuid: patientId,
  description: "patient document",
};

formData.append(
  "metadata",
  new Blob([JSON.stringify(metadata)], {
    type: "application/json",
  })
);




    try {
      const res = await uploadFiles(formData).unwrap();

      // Backend response formats vary. Try to map reasonably:
      // common shapes: { fileUrl, fileName, id } or { data: {...} } or { files: [...] }
      let newFiles = [];
      if (Array.isArray(res?.files)) {
        newFiles = res.files.map((f) => ({
          id: f.id || f.uuid || f.fileId,
          name: f.fileName || f.name,
          url: f.fileUrl || f.url || f.path || FALLBACK_TEST_URL,
          raw: f,
        }));
      } else if (res?.fileUrl || res?.fileName) {
        newFiles = [
          {
            id: res.id || res.uuid || Math.random().toString(36).slice(2),
            name: res.fileName || selectedFiles[0]?.name || "file",
            url: res.fileUrl || res.url || FALLBACK_TEST_URL,
            raw: res,
          },
        ];
      } else if (res?.data && Array.isArray(res.data)) {
        newFiles = res.data.map((f) => ({
          id: f.id || f.uuid,
          name: f.fileName || f.name,
          url: f.fileUrl || FALLBACK_TEST_URL,
          raw: f,
        }));
      } else {
        // fallback: map selected files with fallback url for dev
        newFiles = filesArr.map((f, idx) => ({
          id: Math.random().toString(36).slice(2) + idx,
          name: f.name,
          url: FALLBACK_TEST_URL,
          raw: res,
        }));
      }

      setUploadedFiles((prev) => [...newFiles, ...prev]);
      setSelectedFiles([]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console for details.");
    }
  };

  const handleRemoveUploaded = async (fileId) => {
    if (!fileId) return;
   const confirmed = window.confirm("Delete?");
if (!confirmed) return;


    try {
      await deleteDocument(fileId).unwrap();
      setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Delete failed.");
    }
  };

  const openPreview = (url) => {
    setPreviewUrl(url);
  };

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-700">
        Upload Documents <span className="text-red-500">*</span>
      </label>

      <div
        onClick={() => fileInputRef.current.click()}
        className="mt-2 border-2 border-gray-300 border-dashed rounded-xl p-6 
        flex flex-col items-center justify-center text-gray-500 cursor-pointer
        hover:bg-gray-50 transition"
      >
        {isUploading ? (
          <Loader2 size={28} className="mb-2 text-blue-500 animate-spin" />
        ) : (
          <Upload size={28} className="mb-2 text-gray-400" />
        )}

        <p className="text-sm font-medium">
          {isUploading ? "Uploading..." : uploadedFiles.length > 0 ? `${uploadedFiles.length} files uploaded` : "Click to upload or drag & drop"}
        </p>

        <p className="text-xs text-gray-400 mt-1">PDF, DOC, JPG - up to 10MB each (max 5)</p>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={handleFileSelect}
        />
      </div>

      {/* Selected (queued) previews */}
      {selectedFiles.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="relative bg-white shadow-md border rounded-lg p-2 w-24 h-28 flex flex-col items-center">
              <button
                onClick={() => setSelectedFiles((prev) => prev.filter((_, i) => i !== index))}
                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                title="Remove"
              >
                <X size={12} />
              </button>
              <div className="mt-6 text-[10px] text-center truncate w-full">{file.name}</div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded files list */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Uploaded Documents</h4>
          <div className="flex flex-wrap gap-3">
            {uploadedFiles.map((f) => (
              <div key={f.id} className="relative bg-white border rounded p-2 w-40">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <div className="text-[12px] font-medium truncate">{f.name}</div>
                    <div className="text-xs text-gray-500 truncate">{f.raw?.fileType || ""}</div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <button onClick={() => openPreview(f.url)} className="text-xs underline">Preview</button>
                    <button onClick={() => handleRemoveUploaded(f.id)} className="text-xs text-red-600">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PDF Preview Modal */}
      {previewUrl && <PDFViewerModal url={previewUrl} onClose={() => setPreviewUrl(null)} />}
    </div>
  );
}
