import Link from 'next/link';
import { ArrowLeft, Home, Search } from 'lucide-react';

type ErrorStateProps = {
  title: string;
  message: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  showHomeButton?: boolean;
};

export default function ErrorState({
  title,
  message,
  showBackButton = true,
  backButtonText = 'Back to Projects',
  backButtonHref = '/projects',
  showHomeButton = true,
}: ErrorStateProps) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-primary-yellow/10 p-8 text-center">
          <div className="w-20 h-20 bg-primary-yellow/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-primary-yellow/30 rounded-full flex items-center justify-center">
              <Search className="w-6 h-6 text-primary-yellow" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="p-6 bg-white">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {showBackButton && (
              <Link 
                href={backButtonHref}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary-yellow hover:bg-opacity-90 transition-all duration-300 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {backButtonText}
              </Link>
            )}
            
            {showHomeButton && (
              <Link 
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-3">Or try searching for what you're looking for</p>
            <div className="relative max-w-xs mx-auto">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Specific component for Project Not Found
type ProjectNotFoundProps = Omit<ErrorStateProps, 'title' | 'message'> & {
  customMessage?: string;
};

export function ProjectNotFound({ customMessage, ...props }: ProjectNotFoundProps) {
  return (
    <ErrorState
      title="Project Not Found"
      message={customMessage || "The project you're looking for doesn't exist or may have been moved."}
      showBackButton={true}
      backButtonText="Back to Projects"
      backButtonHref="/projects"
      showHomeButton={true}
      {...props}
    />
  );
}
