import React from 'react';

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-8">
      {/* Animated spinner */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-1 border-4 border-pink-500 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
      </div>
      
      {/* Loading text with animation */}
      <div className="flex space-x-2">
        <span className="text-gray-600 font-medium animate-pulse">Loading</span>
        <span className="animate-bounce">.</span>
        <span className="animate-bounce animation-delay-100">.</span>
        <span className="animate-bounce animation-delay-200">.</span>
      </div>
    </div>
  );
}

export default Loader;