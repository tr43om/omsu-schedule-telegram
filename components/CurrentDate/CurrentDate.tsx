"use client";
import { getCurrentWeek } from "@/utils";
import { useDateStore } from "@/zustandStore";
import { getDate, format, differenceInWeeks, toDate } from "date-fns";
import { ru } from "date-fns/locale";
import { useSearchParams } from "next/navigation";
import React from "react";

const CurrentDate = () => {
  const searchParams = useSearchParams();

  const selected_date =
    searchParams.get("date") === "today"
      ? new Date()
      : (searchParams.get("date") as string);

  const selectedDay = getDate(new Date(selected_date));

  const selectedMonth = format(new Date(selected_date), "MMMM", {
    locale: ru,
  });

  const selectedWeekday = toDate(new Date(selected_date))
    .toLocaleDateString("ru-Ru", { weekday: "long" })
    .split(",")[0]
    .toLowerCase();

  const currentWeek = getCurrentWeek(new Date(selected_date));

  return (
    <div className="ml-4">
      <p className="text-lg font-bold lg:text-3xl">
        {selectedDay} {selectedMonth}, {selectedWeekday}
      </p>
      {currentWeek === 0 ? (
        <p className="text-sm text-gray-400 lg:text-lg">Выходной! 🥳</p>
      ) : (
        <p className="text-sm text-gray-400 lg:text-lg">
          {currentWeek} учебная неделя
        </p>
      )}
    </div>
  );
};

export default CurrentDate;
