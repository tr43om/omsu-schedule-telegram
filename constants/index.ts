export const BASE_URL = "https://eservice.omsu.ru/schedule/backend";

type TimetableType = Array<{
  start: string;
  end: string;
}>;
export const OMSU_TIMETABLE: TimetableType = [
  { start: "8:45", end: "10:20" },
  { start: "10:30", end: "12:05" },
  { start: "12:45", end: "14:20" },
  { start: "14:30", end: "16:05" },
  { start: "16:15", end: "17:50" },
  { start: "18:00", end: "19:35" },
  { start: "19:45", end: "21:20" },
  { start: "21:30", end: "23:05" },
];

export const FRENCH_PROFESSORS = [
  "Белая Елена Николаевна",
  "Квашнина Ольга Михайловна",
  "Зеленская Ольга Валентиновна",
];
export const GERMAN_PROFESSORS = [
  "Евтугова Наталья Николаевна",
  "Осипчук Ольга Сергеевна",
  "Баах Юлия Владимировна",
  "Смирнова Татьяна Анатольевна",
];
export const SPANISH_PROFESSORS = [
  "Ронина Елена Анатольевна",
  "Иванова Ольга Анатольевна",
];
export const CHINESE_PROFESSORS = [
  "Елисеева Ксения Сергеевна",
  "Михелис Елена Игоревна",
  "Хрипля Татьяна Сергеевна",
  "Федорцов Никита Сергеевич",
  "Рогова Ирина Вячеславовна",
  "Мунгалова Вероника Алексеевна",
];

export const OMSU_SECOND_LANGUAGES = [
  "французский",
  "китайский",
  "немецкий",
  "испанский",
];
