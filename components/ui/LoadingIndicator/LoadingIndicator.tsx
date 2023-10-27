import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="h-4 w-4 animate-pulse rounded-full bg-primary"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-primary"></div>
      <div className="h-4 w-4 animate-pulse rounded-full bg-primary"></div>
    </div>
  );
};

export default LoadingIndicator;
