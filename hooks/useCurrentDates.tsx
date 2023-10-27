import { useMemo, useEffect, useState } from "react";
import {
  getYear,
  addWeeks,
  eachWeekOfInterval,
  eachDayOfInterval,
  addDays,
  getMonth,
  differenceInWeeks,
} from "date-fns";
import { is } from "immer/dist/internal";

export const useCurrentDates = () => {
  // const firstSemesterStart = new Date(year, 7, 3); // September 3
  // const firstSemesterEnd = new Date(year + 1, 0, 1); // January 1 +1 year because first semester ends in new year
  // const secondSemesterStart = new Date(year, 1, 11); // February 11
  // const secondSemesterEnd = new Date(year, 6, 1); // July 1
  // const SEMESTER_START_DATE = isFirstSemester
  //   ? firstSemesterStart
  //   : isSecondSemester
  //   ? secondSemesterStart
  //   : 0;
  // const SEMESTER_END_DATE = isFirstSemester
  //   ? firstSemesterEnd
  //   : isSecondSemester
  //   ? secondSemesterEnd
  //   : 0;

  const STUDY_DAYS = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const SEMESTER_START_DATE = new Date(year, 7, 28);
    const SEMESTER_END_DATE = new Date(year + 1, 6, 1);
    return eachWeekOfInterval(
      {
        start: SEMESTER_START_DATE,
        end: SEMESTER_END_DATE,
      },
      { weekStartsOn: 1 }
    ).reduce((acc: Array<Date[]>, monday) => {
      acc.push(
        eachDayOfInterval({
          start: monday,
          end: addDays(monday, 5),
        })
      );

      return acc;
    }, []);
  }, []);

  return { studyDays: STUDY_DAYS };
};
