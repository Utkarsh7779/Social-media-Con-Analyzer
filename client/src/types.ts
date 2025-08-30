export interface AnalysisData {
  success: boolean;
  originalName: string;
  extractedText: string;
  analysis: {
    statistics: {
      wordCount: number;
      sentenceCount: number;
      paragraphCount: number;
      avgWordsPerSentence: number;
      readabilityScore: number;
    };
    suggestions: string[];
  };
}

export interface FileUploadProps {
  onAnalysisComplete: (data: AnalysisData) => void;
  onError: (error: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export interface AnalysisResultsProps {
  data: AnalysisData;
  onReset: () => void;
}

export interface HeaderProps {
  // Add props if needed in the future
}
