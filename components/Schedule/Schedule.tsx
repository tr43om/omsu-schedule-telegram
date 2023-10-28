"use client";
import { TransformedScheduleDto } from "@/types";
import { useUserStore } from "@/zustandStore";
import React, { Suspense } from "react";
import { ScheduleList } from "../ScheduleList";
import { Badge, ThemeSwitcher, ViewToggle } from "../ui";
import notFoundIllustration from "@/assets/404.svg";
import Image from "next/image";
import { CurrentDate } from "../CurrentDate";
import { StripeCalendar } from "../StripeCalendar";

type ScheduleProps = {
  schedule: TransformedScheduleDto | undefined;
};
const Schedule = ({ schedule }: ScheduleProps) => {
  const name = useUserStore((state) => state.name);

  if (schedule === undefined)
    return (
      <section className="mx-auto grid max-w-md justify-center">
        <Image src={notFoundIllustration} alt="not found" />
        <p className="text-center text-lg">
          К сожалению, расписания для &quot;{name}&quot; не существует
        </p>
      </section>
    );

  return (
    <main className="mt-24 mb-8">
      <div className="relative">
        <div className="fixed top-0 right-0 left-0  z-50 mx-auto w-full  bg-white/30   backdrop-blur-md dark:bg-base-100/30">
          <div className="  flex  items-center   justify-between  py-4 px-4">
            <Badge
              size="badge-md"
              label={schedule.scheduleFor}
              variant="primary"
            />
            <ThemeSwitcher />
          </div>
        </div>
        <StripeCalendar />

        <div className="relative grid items-start justify-center   ">
          <ScheduleList schedule={schedule} />
        </div>
      </div>
    </main>
  );
};

export default Schedule;
