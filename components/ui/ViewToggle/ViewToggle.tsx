"use client";

import React from "react";
import { CalendarIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import { useAppearanceStore } from "@/zustandStore";

const ViewToggle = () => {
  const { setView, view } = useAppearanceStore();

  return (
    <div className="  hidden justify-end gap-2 lg:flex">
      <div className="btn-group ">
        <button
          className={` btn btn-md  ${view === "day" && " btn-active  "}`}
          onClick={() => setView("day")}
        >
          <CalendarIcon width={23} height={23} />
        </button>
        <button
          className={` btn btn-md   ${view === "week" && " btn-primary"} `}
          onClick={() => setView("week")}
        >
          <CalendarDaysIcon width={23} height={23} />
        </button>
      </div>
    </div>
  );
};

export default ViewToggle;
