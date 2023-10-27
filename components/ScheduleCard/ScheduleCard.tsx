import { ClockIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { OmsuScheduleDto } from "@/types";
import Link from "next/link";
import { Avatar, Badge, SecondLangFlag } from "../ui";
import GroupLink from "../GroupLink/GroupLink";
import ProfessorLink from "../ProfessorLink/ProfessorLink";

type ScheduleCardProps = {
  type: "group" | "professor";
  schedule: OmsuScheduleDto;
};

interface GroupsLayoutProps extends Pick<OmsuScheduleDto, "groups"> {
  auditory: string;
}

interface ProfessorsLayoutProps
  extends Pick<OmsuScheduleDto, "professors" | "auditories"> {}

const ProfessorLayout = ({ auditory, groups }: GroupsLayoutProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        {groups.map(({ id, name }) => (
          <GroupLink key={`group-${id}-link`} id={id} name={name} />
        ))}
      </div>
      <div className=" flex items-center gap-1.5">
        <MapPinIcon
          width={20}
          height={20}
          className="h-4 w-4 text-gray-600 dark:text-gray-300 lg:h-5 lg:w-5"
        />
        <p className="lg:text-md text-sm ">{auditory}</p>
      </div>
    </div>
  );
};

const GroupsLayout = ({ auditories, professors }: ProfessorsLayoutProps) => {
  return (
    <div className="grid gap-4">
      {professors.map(({ id, name, secondLanguage }, i) => (
        <div
          key={`professor-${id}-${name}`}
          className="grid gap-y-3 border-b-[1px]  border-neutral/30 py-2 last:border-none dark:border-neutral/60 lg:flex lg:flex-wrap lg:justify-between"
        >
          {name !== "_" && (
            <div className="flex items-center ">
              {secondLanguage ? (
                <SecondLangFlag lang={secondLanguage} size="md" />
              ) : (
                <Avatar name={name} />
              )}

              <ProfessorLink id={id} name={name} />
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <MapPinIcon
              width={16}
              height={16}
              className="h-4 w-4 text-gray-600 dark:text-gray-300 lg:h-5 lg:w-5"
            />
            <p className="lg:text-md text-sm ">{auditories[i].name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ScheduleCard = ({ schedule, type }: ScheduleCardProps) => {
  const {
    id: scheduleID,
    auditories,
    endsAt,
    startsAt,
    groups,
    lesson,
    lesson_id,
    professors,
    type: workType,
  } = schedule;
  return (
    <li
      className="card w-full rounded-lg border border-neutral border-opacity-50 p-6 dark:border-gray-600"
      key={scheduleID}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-1 bg-base-100 text-primary-content">
          <ClockIcon
            width={15}
            height={15}
            className="lg:h-4.5 lg:w-4.5 h-4 w-4 text-gray-600 dark:text-gray-300"
          />
          <p className="lg:text-md text-sm  text-gray-600 dark:text-gray-300">
            {startsAt} - {endsAt}
          </p>
        </div>
        <Badge label={workType} size="badge-md" />
      </div>

      <div className=" block  ">
        <div className="mb-3 ">
          <h3 className=" font-bold transition duration-300 ease-in-out sm:text-lg lg:text-xl">
            {lesson}
          </h3>
        </div>

        {type === "group" && (
          <GroupsLayout auditories={auditories} professors={professors} />
        )}

        {type === "professor" && (
          <ProfessorLayout groups={groups} auditory={auditories[0].name} />
        )}
      </div>
    </li>
  );
};

export default ScheduleCard;
