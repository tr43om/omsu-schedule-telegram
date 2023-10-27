"use client";

import React from "react";
import { TransformedScheduleDto } from "@/types";
import { useDateStore } from "@/zustandStore";
import { ScheduleCard, NoSchedule } from "@/components";

import { find } from "lodash";
import { isSameDay } from "date-fns";
import { useSearchParams } from "next/navigation";

type ScheduleListProps = {
  schedule: TransformedScheduleDto;
};

const ScheduleList = ({ schedule }: ScheduleListProps) => {
  const selectedDate = useDateStore((state) => state.selectedDate);
  const currentWeek = useDateStore((state) => state.currentWeek);
  const searchParams = useSearchParams();
  const selected_date = searchParams.get("date") as string;

  const scheduleOfSelectedDay = find(schedule.data, (day) => {
    return isSameDay(new Date(selected_date), day.timestamp);
  });

  if (scheduleOfSelectedDay === undefined) {
    return (
      <div className="w-full max-w-lg items-center ">
        <NoSchedule
          label={
            currentWeek === 0
              ? "Наслаждайся каникулами"
              : "Сегодня у тебя выходной"
          }
        />
      </div>
    );
  }

  return (
    <ul className=" mt-5 grid w-full max-w-lg gap-10 lg:gap-5">
      {scheduleOfSelectedDay?.lessons?.map((day) => (
        <ScheduleCard schedule={day} key={day.id} type={schedule.type} />
      ))}
    </ul>
  );
};

export default ScheduleList;
