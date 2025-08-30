import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import Header from './components/Header';
import { AnalysisData } from './types';

function App() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysisComplete = (data: AnalysisData) => {
    setAnalysisData(data);
    setError(null);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setAnalysisData(null);
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Social Media Content Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your PDF documents or images to analyze content and get engagement suggestions for social media
          </p>
        </div>

        {!analysisData && (
          <FileUpload
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        )}

        {error && (
          <div className="card max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Error Processing File
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={resetAnalysis}
                className="btn-primary"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {analysisData && (
          <AnalysisResults
            data={analysisData}
            onReset={resetAnalysis}
          />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Built with React, Node.js, and Tesseract.js</p>
          <p className="text-sm mt-2">
            Supports PDF and image files (JPEG, PNG, GIF)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
