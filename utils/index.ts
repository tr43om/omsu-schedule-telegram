import {
  OmsuGroupType,
  OmsuProfessorType,
  OmsuScheduleDto,
  OmsuScheduleResponse,
  TransformedScheduleDto,
} from "@/types";
import {
  isAfter,
  getYear,
  differenceInWeeks,
  getWeek,
  getMonth,
  isWithinInterval,
  parse,
} from "date-fns";
import {
  CHINESE_PROFESSORS,
  FRENCH_PROFESSORS,
  GERMAN_PROFESSORS,
  OMSU_TIMETABLE,
  SPANISH_PROFESSORS,
} from "@/constants";

import { map, groupBy, sortBy } from "lodash";

export const twClassNames = (...classes: Array<string | boolean>) => {
  return classes.filter(Boolean).join(" ");
};

export const getCurrentWeek = (date: Date | number) => {
  const now = date || new Date();
  const year = new Date(date).getFullYear();
  const firstSemesterStart = new Date(year, 8, 3); // September 3
  const firstSemesterEnd = new Date(year + 1, 0, 1); // January 1 +1 year because first semester ends in new year
  const secondSemesterStart = new Date(year, 1, 11); // February 11
  const secondSemesterEnd = new Date(year, 6, 1); // July 1

  const isFirstSemester = now >= firstSemesterStart && now <= firstSemesterEnd;
  const isSecondSemester =
    now >= secondSemesterStart && now <= secondSemesterEnd;

  console.log(isFirstSemester, isSecondSemester);

  let currentWeek = isFirstSemester
    ? differenceInWeeks(now, firstSemesterStart) + 1
    : isSecondSemester
    ? differenceInWeeks(now, secondSemesterStart) + 1
    : 0;

  return currentWeek;
};

export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url).then((res) => res.json());

const lessonsStartAt = (time: number) => {
  switch (time) {
    case 1:
      return OMSU_TIMETABLE[0].start;
    case 2:
      return OMSU_TIMETABLE[1].start;
    case 3:
      return OMSU_TIMETABLE[2].start;
    case 4:
      return OMSU_TIMETABLE[3].start;
    case 5:
      return OMSU_TIMETABLE[4].start;
    case 6:
      return OMSU_TIMETABLE[5].start;
    case 7:
      return OMSU_TIMETABLE[6].start;
    case 8:
      return OMSU_TIMETABLE[7].start;
    default:
      return "";
  }
};

const lessonsEndAt = (time: number) => {
  switch (time) {
    case 1:
      return OMSU_TIMETABLE[0].end;
    case 2:
      return OMSU_TIMETABLE[1].end;
    case 3:
      return OMSU_TIMETABLE[2].end;
    case 4:
      return OMSU_TIMETABLE[3].end;
    case 5:
      return OMSU_TIMETABLE[4].end;
    case 6:
      return OMSU_TIMETABLE[5].end;
    case 7:
      return OMSU_TIMETABLE[6].end;
    case 8:
      return OMSU_TIMETABLE[7].end;
    default:
      return "";
  }
};

export const transformProfessorsCollection = (data: OmsuProfessorType[]) => {
  const professors = sortBy(data, "name");

  return professors;
};

export const transformGroupsCollection = (data: OmsuGroupType[]) => {
  const transformedData = map(data, (group) => {
    if (group.name !== "Резерв") {
      return { ...group };
    }

    return group;
  });

  const groups = transformedData
    .sort((a, b) => {
      if (Number(a.name.split("-")[3]) && Number(b.name.split("-")[3])) {
        return Number(b.name.split("-")[3]) - Number(a.name.split("-")[3]);
      }
      return 1;
    })
    .sort((a, b) => a.course - b.course);

  return groups;
};

const getFullType = (type: string) => {
  switch (type) {
    case "Лаб":
      return "Лабораторная";
    case "Лек":
      return "Лекция";
    case "Прак":
      return "Практика";
    default:
      return type;
  }
};

const formatWorkType = (type: string) => {
  const formatted = type.slice(0, 3).toLowerCase();
  if (type.toLowerCase() === "прак") return type;
  if (formatted === "прк") return "Прак";
  return type.slice(0, 3);
};

export const transformSchedule = (
  data: OmsuScheduleResponse[],
  date: number,
  type: "group" | "professor"
) => {
  const scheduleFor =
    type === "group" ? data[0].lessons[0].group : data[0].lessons[0].teacher;

  const schedule = map(data, ({ lessons, day }) => {
    const [date, month, year] = day.split(".");
    const timestamp = new Date(`${year}/${month}/${date}`).getTime();
    const groupedSchedule = groupBy(lessons, "time");

    const formattedLessons = map(groupedSchedule, (course) => {
      const { lesson, lesson_id, type_work: type, id, time } = course[0];

      const formatLessonName = (lesson: string) => {
        const formatted = lesson
          .split(" ")
          .splice(0, lesson.split(" ").length - 1)
          .join(" ");

        return formatted.replace(/ *\([^)]*\) */g, "");
      };
      const formattedLessonName = formatLessonName(lesson);

      const getProfessorSecondLanguage = (professor: string) => {
        if (!lesson.toLowerCase().includes("второго иностранного")) return;

        if (GERMAN_PROFESSORS.some((grProfessor) => grProfessor === professor))
          return "немецкий";
        if (SPANISH_PROFESSORS.some((grProfessor) => grProfessor === professor))
          return "испанский";
        if (FRENCH_PROFESSORS.some((grProfessor) => grProfessor === professor))
          return "французский";
        if (CHINESE_PROFESSORS.some((grProfessor) => grProfessor === professor))
          return "китайский";
      };

      const getShortName = (name: string) => {
        const dividedName = name.split(" ");
        if (dividedName.length <= 1) return name;
        const firstname = name.split(" ")[1][0];
        const surname = name.split(" ")[0];
        const patronym = dividedName.length >= 3 ? name.split(" ")[2][0] : "";

        return `${surname} ${firstname}.${patronym}.`;
      };

      const professors = map(course, ({ teacher, teacher_id }) => ({
        name: teacher,
        id: teacher_id,
        shortname: getShortName(teacher),
        secondLanguage: getProfessorSecondLanguage(teacher),
      }));

      const auditories = map(course, ({ auditCorps, auditory_id }) => ({
        name: auditCorps,
        id: auditory_id,
      }));

      const groups = map(course, ({ group, group_id }) => ({
        name: group,
        id: group_id,
      }));

      return {
        lesson: formattedLessonName,
        groups,
        professors,
        auditories,
        id,
        typeFull: getFullType(type),
        type: formatWorkType(type),
        lesson_id,
        startsAt: lessonsStartAt(time),
        endsAt: lessonsEndAt(time),
      };
    });

    return { lessons: formattedLessons, timestamp };
  });

  return { data: schedule, scheduleFor, type, date };
};
