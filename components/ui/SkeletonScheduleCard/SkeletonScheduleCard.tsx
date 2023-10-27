import React from "react";

const SkeletonScheduleCard = () => {
  return (
    <div
      role="status"
      className=" max-w-md animate-pulse rounded border border-gray-200  p-6 shadow dark:border-gray-700"
    >
      <div className="mb-3 h-2.5 w-24 animate-pulse rounded-lg bg-gray-400"></div>

      <div className="card">
        <div className=" mb-5 flex animate-pulse justify-between">
          <div className="animate-pulse">
            <div className="mb-2 h-3 w-56  rounded-lg bg-gray-400"></div>
            <div className=" h-3 w-32 rounded-lg bg-gray-400"></div>
          </div>
          <div className="h-3.5 w-8  animate-pulse rounded-lg bg-gray-400"></div>
        </div>
      </div>

      <div className="mb-3 flex animate-pulse items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-gray-400 "></div>
        <div className="h-2.5 w-48 rounded-full bg-gray-400"></div>
      </div>

      <div className="h-2.5 w-16 animate-pulse rounded-lg bg-gray-400"></div>
    </div>
  );
};

export default SkeletonScheduleCard;
