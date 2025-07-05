import React from "react";

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] dark:bg-[#0a0a0a] light:bg-gray-50 flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-[#30bdee] dark:text-[#30bdee] light:text-blue-600 text-4xl font-bold font-['Rajdhani',Helvetica] tracking-wider mb-4 transition-colors duration-300">
            THE UNNAMED
          </h1>
        </div>

        {/* Loading Spinner */}
        <div className="mb-6">
          <div className="w-16 h-16 border-4 border-[#333333] dark:border-[#333333] light:border-gray-300 border-t-[#30bdee] dark:border-t-[#30bdee] light:border-t-blue-600 rounded-full animate-spin mx-auto transition-colors duration-300" />
        </div>

        {/* Loading Message */}
        <p className="text-[#ffffffb2] dark:text-[#ffffffb2] light:text-gray-600 text-lg font-medium transition-colors duration-300">
          {message}
        </p>

        {/* Loading Dots Animation */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-[#30bdee] dark:bg-[#30bdee] light:bg-blue-600 rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#30bdee] dark:bg-[#30bdee] light:bg-blue-600 rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#30bdee] dark:bg-[#30bdee] light:bg-blue-600 rounded-full animate-bounce transition-colors duration-300" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};