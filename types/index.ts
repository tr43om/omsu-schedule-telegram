export type GroupType = {
  course: number;
  degree: string;
  faculty: string;
  formOfEducation: string;
  id: string;
  name: string;
};

export type RecentType = {
  id: number;
  name: string;
  type?: string;
  course?: number;
};

export interface FavoriteType extends RecentType {}

export type TransformedScheduleDto = {
  type: "group" | "professor";
  scheduleFor: string;
  data: {
    lessons: OmsuScheduleDto[];
    timestamp: number;
  }[];
  date: number;
};

export type OmsuScheduleResponse = {
  lessons: OmsuLessonsResponse[];
  day: string;
};

export type OmsuLessonsResponse = {
  id: number;
  day: string;
  week: number;
  time: number;
  lesson: string;
  type_work: string;
  lesson_id: number;
  teacher: string;

  teacher_id: number;
  auditCorps: string;
  group: string;
  group_id: number;

  auditory_id: number;
};

export interface OmsuScheduleDto
  extends Pick<OmsuLessonsResponse, "lesson" | "lesson_id" | "id"> {
  professors: {
    name: string;
    id: number;
    shortname: string;
    secondLanguage?: string | undefined;
  }[];
  groups: {
    name: string;
    id: number;
  }[];
  auditories: {
    name: string;
    id: number;
  }[];
  startsAt: string;
  type: string;
  typeFull: string;
  endsAt: string;
}

export type OmsuGroupType = {
  id: number;
  name: string;
  course: number;
};

export type OmsuProfessorType = {
  id: number;
  name: string;
};
