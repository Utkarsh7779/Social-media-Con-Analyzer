import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, AlertCircle, CheckCircle, Sparkles } from 'lucide-react';
import { apiBaseUrl } from '../config';

const FileUpload = ({
  onAnalysisComplete,
  onError,
  isLoading,
  setIsLoading
}) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${apiBaseUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      onAnalysisComplete(data);
    } catch (error) {
      console.error('Upload error:', error);
      onError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const getFileIcon = (file) => {
    if (file.type === 'application/pdf') {
      return <FileText className="w-10 h-10 text-red-500" />;
    }
    return <Image className="w-10 h-10 text-blue-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-xl border border-blue-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
              Upload Your Content
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Drag and drop your PDF or image file here, or click to browse
            </p>
          </div>

          {!selectedFile ? (
            <div
              {...getRootProps()}
              className={`group relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
            >
              <input {...getInputProps()} />
              <div className="relative">
                <Upload className={`w-16 h-16 mx-auto mb-4 transition-all duration-300 ${
                  isDragActive ? 'text-blue-500 scale-110' : 'text-gray-400 group-hover:text-blue-500'
                }`} />
                <div className={`absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-xl transition-all duration-300 ${
                  isDragActive ? 'scale-150' : 'scale-0'
                }`}></div>
              </div>
              <p className="text-xl font-semibold text-gray-900 mb-3 transition-colors duration-300">
                {isDragActive ? 'Drop your file here' : 'Choose a file or drag it here'}
              </p>
              <p className="text-gray-500 mb-4">
                Supports PDF, PNG, JPG, JPEG, and GIF files
              </p>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>Max 10MB</span>
              </div>
            </div>
          ) : (
            <div className="border border-gray-200 rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center space-x-4">
                {getFileIcon(selectedFile)}
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-lg">{selectedFile.name}</p>
                  <p className="text-gray-500">
                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                  </p>
                </div>
                <button
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                >
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {selectedFile && (
            <div className="mt-8 flex space-x-4">
              <button
                onClick={handleFileUpload}
                disabled={isLoading}
                className="group flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-3">
                    <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Analyze Content</span>
                  </div>
                )}
              </button>
              <button
                onClick={removeFile}
                disabled={isLoading}
                className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">ℹ</span>
              </div>
              <div>
                <p className="font-semibold text-blue-900 mb-3 text-lg">What happens next?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800">PDF files: Text extraction with formatting preservation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800">Image files: OCR processing to extract text</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800">Content analysis: Engagement metrics and suggestions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-800">Your files are processed securely and deleted after analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
