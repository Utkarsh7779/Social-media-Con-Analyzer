import React, { useState } from 'react';
import { BarChart3, FileText, Lightbulb, TrendingUp, RotateCcw } from 'lucide-react';

const AnalysisResults = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getReadabilityColor = (score) => {
    if (score >= 70) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getReadabilityLabel = (score) => {
    if (score >= 70) return 'Very Easy';
    if (score >= 50) return 'Moderate';
    if (score >= 30) return 'Difficult';
    return 'Very Difficult';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'text', label: 'Extracted Text', icon: FileText },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-2xl border border-blue-100 mb-8">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                🎉 Analysis Complete! 🎉
              </h2>
              <p className="text-xl text-gray-600">
                File: <span className="font-bold text-blue-600">{data.originalName}</span>
              </p>
            </div>
            <button
              onClick={onReset}
              className="group flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Analyze Another File</span>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-blue-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 py-3 px-1 border-b-2 font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 scale-105'
                        : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300 hover:scale-105'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-200">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Statistics Grid */}
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  Content Statistics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Words', value: data.analysis.statistics.wordCount, color: 'from-blue-500 to-blue-600', icon: '📝' },
                    { label: 'Sentences', value: data.analysis.statistics.sentenceCount, color: 'from-indigo-500 to-indigo-600', icon: '💬' },
                    { label: 'Paragraphs', value: data.analysis.statistics.paragraphCount, color: 'from-purple-500 to-purple-600', icon: '📄' },
                    { label: 'Avg Words/Sentence', value: data.analysis.statistics.avgWordsPerSentence, color: 'from-pink-500 to-pink-600', icon: '📊' }
                  ].map((stat, index) => (
                    <div key={index} className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center border border-gray-200 hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:-translate-y-2">
                      <div className="text-4xl mb-3">{stat.icon}</div>
                      <div className={`text-4xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Readability Score */}
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-8">Readability Analysis</h3>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-blue-200">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-gray-700">Flesch Reading Ease Score</span>
                    <span className={`px-6 py-3 rounded-full text-lg font-bold border ${getReadabilityColor(data.analysis.statistics.readabilityScore)}`}>
                      {getReadabilityLabel(data.analysis.statistics.readabilityScore)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-5 mb-6">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-5 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${data.analysis.statistics.readabilityScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-lg text-gray-600 mb-6">
                    <span>0 (Very Difficult)</span>
                    <span>100 (Very Easy)</span>
                  </div>
                  <p className="text-xl text-gray-700">
                    Score: <span className="font-black text-blue-600 text-2xl">{data.analysis.statistics.readabilityScore}/100</span>
                  </p>
                </div>
              </div>

              {/* Quick Suggestions Preview */}
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  Key Suggestions
                </h3>
                <div className="space-y-4">
                  {data.analysis.suggestions.slice(0, 3).map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-4 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200 hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
                      <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-gray-800 font-semibold text-lg">{suggestion}</p>
                    </div>
                  ))}
                  {data.analysis.suggestions.length > 3 && (
                    <p className="text-center text-gray-600 font-semibold text-lg">
                      View all {data.analysis.suggestions.length} suggestions in the Suggestions tab
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'text' && (
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                Extracted Text
              </h3>
              <div className="bg-gradient-to-r from-gray-50 to-green-50 rounded-2xl p-6 border border-green-200">
                <div className="whitespace-pre-wrap text-sm text-gray-800 font-mono max-h-96 overflow-y-auto leading-relaxed custom-scrollbar">
                  {data.extractedText || 'No text was extracted from the file.'}
                </div>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
                  <p className="text-gray-700">
                    <span className="font-bold">File:</span> {data.originalName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-bold">Character count:</span> {data.extractedText.length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mr-4 shadow-xl">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                Engagement Suggestions
              </h3>
              <div className="space-y-6">
                {data.analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="group flex items-start space-x-4 p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl border border-blue-200 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl">
                      <span className="text-white text-lg font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-xl font-semibold leading-relaxed">{suggestion}</p>
                    </div>
                    <TrendingUp className="w-7 h-7 text-blue-500 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                ))}
              </div>
              
              <div className="mt-10 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <span className="text-white text-2xl">💡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-green-800 text-xl mb-3">Pro Tip</h4>
                    <p className="text-green-700 leading-relaxed text-lg">
                      Use these suggestions to optimize your content for better social media engagement. 
                      Consider A/B testing different approaches to see what works best for your audience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;
