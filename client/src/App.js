import React, { useState, useEffect, useRef } from 'react';
import FileUpload from './components/FileUpload.js';
import AnalysisResults from './components/AnalysisResults.js';
import Header from './components/Header.js';

function App() {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentFeature, setCurrentFeature] = useState(0);
  const uploadRef = useRef(null);

  const features = [
    "AI-Powered OCR Technology",
    "Advanced Content Analytics",
    "Smart Engagement Suggestions",
    "Real-time Processing"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleAnalysisComplete = (data) => {
    setAnalysisData(data);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setAnalysisData(null);
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setError(null);
  };

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        {!analysisData && (
          <div className="text-center mb-16">
            {/* Animated Hero Section */}
            <div className="relative mb-12">
              {/* Floating Background Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-float"></div>
                <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-float" style={{animationDelay: '0.5s'}}></div>
              </div>

              {/* Main Title with Dynamic Text */}
              <div className="relative z-10">
                <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6 leading-tight">
                  Social Media
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Content Analyzer
                  </span>
                </h1>
                
                {/* Animated Feature Text */}
                <div className="h-16 mb-6 flex items-center justify-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-700 transition-all duration-500 transform">
                    <span className="inline-block animate-fade-in">
                      {features[currentFeature]}
                    </span>
                  </div>
                </div>

                {/* Subtitle with Typewriter Effect */}
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
                  Transform your content with 
                  <span className="font-bold text-blue-600 mx-2">AI-powered analysis</span>
                  and get 
                  <span className="font-bold text-purple-600 mx-2">data-driven insights</span>
                  for maximum social media engagement
                </p>

                {/* CTA Button */}
                <div className="flex justify-center items-center mb-8">
                  <button 
                    onClick={scrollToUpload}
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                  >
                    <span className="flex items-center space-x-2">
                      <span>🚀</span>
                      <span>Start Analyzing</span>
                      <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!analysisData && (
          <div ref={uploadRef}>
            <FileUpload
              onAnalysisComplete={handleAnalysisComplete}
              onError={handleError}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 shadow-xl border border-red-200">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
              </div>
              
              <div className="relative p-8 text-center">
                <div className="text-red-500 text-6xl mb-4 animate-pulse">⚠️</div>
                <h3 className="text-2xl font-bold text-red-800 mb-3">
                  Error Processing File
                </h3>
                <p className="text-red-700 mb-6 text-lg">{error}</p>
                <button
                  onClick={resetAnalysis}
                  className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {analysisData && (
          <AnalysisResults
            data={analysisData}
            onReset={resetAnalysis}
          />
        )}

        {!analysisData && (
          <div className="mt-24 text-center">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Choose Our Analyzer?</h2>
              
              {/* Enhanced Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  {
                    icon: "📊",
                    title: "Advanced Analytics",
                    description: "Get detailed insights into your content's readability, structure, and engagement potential",
                    gradient: "from-blue-500 to-indigo-600",
                    delay: "0s"
                  },
                  {
                    icon: "🤖",
                    title: "AI-Powered OCR",
                    description: "Extract text from any image or PDF with industry-leading accuracy using Tesseract.js",
                    gradient: "from-green-500 to-emerald-600",
                    delay: "0.1s"
                  },
                  {
                    icon: "💡",
                    title: "Smart Suggestions",
                    description: "Receive actionable recommendations to improve your social media content performance",
                    gradient: "from-yellow-400 to-orange-500",
                    delay: "0.2s"
                  },
                  {
                    icon: "⚡",
                    title: "Lightning Fast",
                    description: "Process documents in seconds with our optimized algorithms and cloud infrastructure",
                    gradient: "from-purple-500 to-pink-600",
                    delay: "0.3s"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200 hover:shadow-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-4"
                    style={{animationDelay: feature.delay}}
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500`}>
                        <span className="text-white text-3xl">{feature.icon}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technology Stack */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 border border-blue-200">
                <h3 className="text-3xl font-bold text-gray-800 mb-8">Built with Cutting-Edge Technology</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    { name: "React 18", icon: "⚛️", color: "from-blue-500 to-cyan-500" },
                    { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
                    { name: "Tesseract.js", icon: "🔍", color: "from-purple-500 to-pink-500" },
                    { name: "Tailwind CSS", icon: "🎨", color: "from-indigo-500 to-blue-500" }
                  ].map((tech, index) => (
                    <div key={index} className="text-center group">
                      <div className={`w-16 h-16 bg-gradient-to-br ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <span className="text-white text-2xl">{tech.icon}</span>
                      </div>
                      <h4 className="font-semibold text-gray-800">{tech.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white py-16 mt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <span className="text-white text-3xl">🚀</span>
            </div>
            <h3 className="text-3xl font-bold mb-3">Built for the Future</h3>
            <p className="text-blue-200 text-lg">React, Node.js, and Tesseract.js</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-blue-200 mb-3 text-lg">File Support</h4>
              <p className="text-gray-300">PDF, PNG, JPG, JPEG, GIF</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-200 mb-3 text-lg">Security</h4>
              <p className="text-gray-300">Files processed securely and deleted after analysis</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-200 mb-3 text-lg">Performance</h4>
              <p className="text-gray-300">Fast processing with real-time results</p>
            </div>
          </div>
          
          <div className="border-t border-blue-800 pt-8">
            <p className="text-gray-400">
              © 2025 Social Media Content Analyzer. Built for technical assessment excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
