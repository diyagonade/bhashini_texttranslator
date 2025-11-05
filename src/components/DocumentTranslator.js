import { useState } from 'react';
import { Upload, FileText, Download, CheckCircle2, Loader2 } from 'lucide-react';

export function DocumentTranslator({ sourceLanguage, targetLanguage }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translatedText, setTranslatedText] = useState(''); 

  const handleFileChange = (file) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setSelectedFile(file);
      setIsComplete(false);
      setTranslatedText(''); 
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };
  
  // Drag and drop handlers (omitted for brevity)
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleTranslate = () => {
    if (!selectedFile || isTranslating || isComplete) return;

    setIsTranslating(true);
    setTranslatedText('');

    // Start the process of reading the file content
    const reader = new FileReader();
    
    // This function runs once the file has been fully read
    reader.onload = async (e) => {
      // THIS ONLY WORKS FOR SIMPLE TEXT FILES (.txt)
      const fileContent = e.target.result; 
      
      // 1. Simulate API Call
      await new Promise(resolve => setTimeout(resolve, 2500)); 

      // 2. Create the mock translated output, including the actual file content
      const mockTranslatedContent = `
--- Bhashini Mock Translation Complete: Full Content Conversion ---

Original File: ${selectedFile.name}
Translation Direction: ${sourceLanguage.nativeName} (${sourceLanguage.code}) -> ${targetLanguage.nativeName} (${targetLanguage.code})
Processing Time: 2.5 seconds (Simulated)

// (In a real application, the content below would be sent to an NMT API, and the Hindi result would be returned here.)

✅ Mock Translation of Document Start (in Hindi): 
नमस्ते! यह सफल फ़ाइल हैंडलिंग और डाउनलोड तंत्र को प्रदर्शित करने के लिए एक नमूना प्रतिक्रिया है।

------------------------------------------
[START OF UPLOADED DOCUMENT CONTENT (MOCK TRANSLATED)]
\n${fileContent}\n
[END OF UPLOADED DOCUMENT CONTENT]
------------------------------------------
`;
      
      // 3. Store the mock output in state
      setTranslatedText(mockTranslatedContent);
      setIsTranslating(false);
      setIsComplete(true);
    };

    // The FileReader is instructed to read the file as a text string
    reader.readAsText(selectedFile);
  };

  const handleDownload = () => {
    if (!translatedText) return;

    // Use the translatedText from state
    const blob = new Blob([translatedText], { type: 'text/plain' }); 
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // Correctly set the download file name to .txt
    const originalFileNameParts = selectedFile?.name.split('.') || [];
    const baseFileName = originalFileNameParts.length > 1 
                         ? originalFileNameParts.slice(0, -1).join('.') 
                         : originalFileNameParts[0] || 'document';
                         
    a.download = `translated_${baseFileName}.txt`;
    
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div
        className={`bg-white border-2 border-dashed rounded-xl p-8 transition-colors ${
          isDragging 
            ? 'border-orange-600 bg-orange-50' 
            : 'border-gray-300 hover:border-orange-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center gap-4">
          {!selectedFile ? (
            <>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-center">
                <label className="cursor-pointer">
                  <span className="text-orange-600 font-medium hover:text-orange-700">
                    Click to upload
                  </span>
                  <span className="text-gray-600"> or drag and drop</span>
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  PDF, DOC, DOCX, TXT (Max 10MB)
                </p>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <FileText className="w-10 h-10 text-orange-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                {isComplete && (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedFile && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleTranslate}
              disabled={isTranslating || isComplete}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {isTranslating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Translating...
                </>
              ) : isComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Translation Complete
                </>
              ) : (
                'Translate Document'
              )}
            </button>

            {isComplete && (
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-orange-600 border-2 border-orange-600 rounded-lg font-medium hover:bg-orange-50 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Translation
              </button>
            )}
          </div>

          {isTranslating && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Processing your document...</p>
                  <p className="text-blue-700">
                    Translating from {sourceLanguage.name} to {targetLanguage.name}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">22+</div>
            <div className="text-sm text-gray-600">Languages Supported</div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">&lt;200ms</div>
            <div className="text-sm text-gray-600">Translation Speed</div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">98%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
}