import React, { ReactNode } from "react";

const Announcement = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative z-[2000] bg-primaryGradient px-4 py-3 text-white">
      <p className="lg:text-md text-center text-sm font-medium">{children}</p>
    </div>
  );
};

export default Announcement;
