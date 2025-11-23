// import { X } from "lucide-react";

// export default function PDFViewerModal({ url, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl border-2 border-blue-400 relative w-full max-w-4xl h-[85vh] overflow-hidden">

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
//         >
//           <X size={20} />
//         </button>

//         {/* PDF VIEWER */}
//         <iframe
//           src={url}
//           title="PDF Viewer"
//           className="w-full h-full rounded-lg"
//           style={{ border: "0" }}
//         />
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import { X } from "lucide-react";

// export default function PDFViewerModal({ url, onClose }) {
//   if (!url) return null;
// const docUrl =
//   "https://file-examples.com/wp-content/storage/2017/02/file-sample_100kB.doc";
//   // If server returns a blob or requires token, you may need to fetch and createObjectURL.
//   // For public URLs or direct links this iframe will work.
//   return (
//     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
//       <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl h-[85vh] overflow-hidden">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 z-10"
//         >
//           <X size={16} />
//         </button>

//         {/* <iframe
//           src={url}
//           title="PDF Preview"
//           className="w-full h-full border-0"
//         /> */}
//       <iframe
//   src={`https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
//     docUrl
//   )}`}
//   className="w-full h-full border-0"
//   title="DOCX Preview"
// />;
//       </div>
//     </div>
//   );
// }


import React from "react";
import { X, Download, FileText } from "lucide-react";

export default function PDFViewerModal({ url, onClose }) {
  if (!url) return null;

  // Check file extension to determine the type
  const getFileType = (fileUrl) => {
    const extension = fileUrl?.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'docx';
    return 'unknown';
  };

  const fileType = getFileType(url);

  // For DOCX files, we'll use Microsoft Office Online Viewer
  const getViewerUrl = () => {
    if (fileType === 'pdf') {
      return url;
    } else if (fileType === 'docx') {
      // Microsoft Office Online Viewer for DOCX files
      return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    }
    return url;
  };

  const viewerUrl = getViewerUrl();

  // Handle download
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl h-[85vh] overflow-hidden">
        {/* Header with controls */}
        <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <FileText size={20} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {fileType === 'pdf' ? 'PDF Preview' : 'Document Preview'}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              <Download size={16} />
              Download
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* File Preview */}
        <div className="pt-12 h-full">
          {fileType === 'pdf' ? (
            <iframe
              src={viewerUrl}
              className="w-full h-full border-0"
              title="PDF Preview"
              onError={(e) => {
                console.error('Failed to load PDF');
                // Fallback to download
                handleDownload();
              }}
            />
          ) : fileType === 'docx' ? (
            <iframe
              src={viewerUrl}
              className="w-full h-full border-0"
              title="Document Preview"
              onError={(e) => {
                console.error('Failed to load document');
                // Fallback to download
                handleDownload();
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <FileText size={64} className="mb-4" />
              <p className="text-lg mb-2">Unsupported file type</p>
              <p className="text-sm mb-4">This file type cannot be previewed</p>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                <Download size={16} />
                Download File
              </button>
            </div>
          )}
        </div>

        {/* Loading/Error State */}
        <div className="absolute inset-0 flex items-center justify-center bg-white hidden" id="loadingState">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading document...</p>
          </div>
        </div>
      </div>
    </div>
  );
}