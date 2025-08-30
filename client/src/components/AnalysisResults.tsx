import React, { useState } from 'react';
import { BarChart3, FileText, Lightbulb, TrendingUp, RotateCcw } from 'lucide-react';
import { AnalysisResultsProps } from '../types';

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'text' | 'suggestions'>('overview');

  const getReadabilityColor = (score: number) => {
    if (score >= 70) return 'text-success-600 bg-success-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getReadabilityLabel = (score: number) => {
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
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Analysis Complete!
            </h2>
            <p className="text-gray-600">
              File: <span className="font-medium">{data.originalName}</span>
            </p>
          </div>
          <button
            onClick={onReset}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Analyze Another File</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="card">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistics Grid */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Content Statistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {data.analysis.statistics.wordCount}
                  </div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {data.analysis.statistics.sentenceCount}
                  </div>
                  <div className="text-sm text-gray-600">Sentences</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {data.analysis.statistics.paragraphCount}
                  </div>
                  <div className="text-sm text-gray-600">Paragraphs</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary-600">
                    {data.analysis.statistics.avgWordsPerSentence}
                  </div>
                  <div className="text-sm text-gray-600">Avg Words/Sentence</div>
                </div>
              </div>
            </div>

            {/* Readability Score */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Readability Analysis</h3>
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium text-gray-700">Flesch Reading Ease Score</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getReadabilityColor(data.analysis.statistics.readabilityScore)}`}>
                    {getReadabilityLabel(data.analysis.statistics.readabilityScore)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${data.analysis.statistics.readabilityScore}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>0 (Very Difficult)</span>
                  <span>100 (Very Easy)</span>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Score: <span className="font-medium">{data.analysis.statistics.readabilityScore}/100</span>
                </p>
              </div>
            </div>

            {/* Quick Suggestions Preview */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Key Suggestions
              </h3>
              <div className="space-y-3">
                {data.analysis.suggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-blue-800">{suggestion}</p>
                  </div>
                ))}
                {data.analysis.suggestions.length > 3 && (
                  <p className="text-sm text-gray-600 text-center">
                    View all {data.analysis.suggestions.length} suggestions in the Suggestions tab
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'text' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Extracted Text
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="whitespace-pre-wrap text-sm text-gray-800 font-mono max-h-96 overflow-y-auto">
                {data.extractedText || 'No text was extracted from the file.'}
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Text extracted from: <span className="font-medium">{data.originalName}</span></p>
              <p>Character count: <span className="font-medium">{data.extractedText.length}</span></p>
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Engagement Suggestions
            </h3>
            <div className="space-y-4">
              {data.analysis.suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{suggestion}</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">💡</span>
                </div>
                <div>
                  <h4 className="font-medium text-green-800">Pro Tip</h4>
                  <p className="text-sm text-green-700 mt-1">
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
  );
};

export default AnalysisResults;
