import React from 'react';
import { TrendingUp, BarChart3, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-white via-blue-50 to-indigo-50 shadow-lg border-b border-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="relative container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Content Analyzer
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Social Media Optimization Tool
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
            <BarChart3 className="w-4 h-4" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
