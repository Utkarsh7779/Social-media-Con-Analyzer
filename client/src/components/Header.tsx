import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Content Analyzer
              </h1>
              <p className="text-sm text-gray-600">
                Social Media Optimization Tool
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              About
            </a>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <BarChart3 className="w-4 h-4" />
              <span>Powered by AI</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
