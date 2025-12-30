"use client"
import { useState } from 'react';
import { X } from 'lucide-react';

const PDFViewerButton = () => {
  const [showPDF, setShowPDF] = useState(false);

  return (
    <>
      {/* Button to open PDF */}
      <button
        onClick={() => setShowPDF(true)}
        className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
      >
        View Company Profile
      </button>

      {/* PDF Modal */}
      {showPDF && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Close button */}
            <button
              onClick={() => setShowPDF(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* PDF Viewer */}
            <iframe
              src="/assets/documents/company-profile.pdf"
              className="w-full h-full border-0"
              title="Company Profile PDF"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PDFViewerButton;