"use client";

import React from "react";
import { random } from "lodash";
import { useDateStore } from "@/zustandStore";

const emojis = [
  127774, // 🌞
  128122, //  👺
  128079, //  👏
  128123, // 👻
  128148, // 💔
  128542, // 😞
  128546, // 😢
  128552, // 😨
  128557, // 😭
  128560, // 😰
  128575, // 😿
  128576, // 🙀
];
const NoSchedule = ({ label }: { label: string }) => {
  const currentWeek = useDateStore((state) => state.currentWeek);

  const randomEmoji = String.fromCodePoint(
    emojis[random(0, emojis.length - 1)] || 0
  );
  return (
    <div className="mt-16 flex flex-col items-center justify-center gap-5 ">
      <span role="img" className=" text-7xl text-primary ">
        {randomEmoji}
      </span>
      <h3 className="font-bold">
        {currentWeek === 0
          ? "Наслаждайся каникулами"
          : "Сегодня у тебя выходной"}
      </h3>
    </div>
  );
};

export default NoSchedule;
