import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type CalendarControlsProps = {
  prev: () => void;
  next: () => void;
};

const CalendarControls = ({ next, prev }: CalendarControlsProps) => {
  return (
    <div className="btn-group  flex h-10 justify-end print:hidden ">
      <button
        className="btn-outline  btn  btn-sm border-none lg:btn-md"
        onClick={prev}
      >
        <ChevronLeftIcon width={20} height={20} className="lg:h-6 lg:w-6" />
      </button>
      <button
        className="btn-outline btn  btn-sm border-none lg:btn-md"
        onClick={next}
      >
        <ChevronRightIcon width={20} height={20} className="lg:h-6 lg:w-6" />
      </button>
    </div>
  );
};

export default CalendarControls;
