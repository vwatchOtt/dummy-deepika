import { X } from "lucide-react";

export default function PDFViewerModal({ url, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl border-2 border-blue-400 relative w-full max-w-4xl h-[85vh] overflow-hidden">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
        >
          <X size={20} />
        </button>

        {/* PDF VIEWER */}
        <iframe
          src={url}
          title="PDF Viewer"
          className="w-full h-full rounded-lg"
          style={{ border: "0" }}
        />
      </div>
    </div>
  );
}
