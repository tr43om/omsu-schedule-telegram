"use client";

import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import CN from "country-flag-icons/react/3x2/CN";
import ES from "country-flag-icons/react/3x2/ES";
import { twClassNames } from "@/utils";

type SecondLangFlagProps = {
  lang: string;
  size?: "sm" | "md" | "lg";
};

const SecondLangFlag = ({ lang, size = "sm" }: SecondLangFlagProps) => {
  return (
    <>
      {lang === "немецкий" && (
        <DE
          className={twClassNames(
            "h-5 w-5 rounded-xl opacity-70 lg:h-8 lg:w-8",
            size === "md" && "h-7 w-7",
            size === "lg" && "h-8 w-8"
          )}
        />
      )}
      {lang === "французский" && (
        <FR
          className={twClassNames(
            "h-5 w-5 rounded-xl opacity-70 lg:h-8 lg:w-8",
            size === "md" && "h-7 w-7",
            size === "lg" && "h-8 w-8"
          )}
        />
      )}
      {lang === "китайский" && (
        <CN
          className={twClassNames(
            "h-5 w-5 rounded-xl opacity-70 lg:h-8 lg:w-8",
            size === "md" && "h-7 w-7",
            size === "lg" && "h-8 w-8"
          )}
        />
      )}
      {lang === "испанский" && (
        <ES
          className={twClassNames(
            "h-5 w-5 rounded-xl opacity-70 lg:h-8 lg:w-8",
            size === "md" && "h-7 w-7",
            size === "lg" && "h-8 w-8"
          )}
        />
      )}
    </>
  );
};

export default SecondLangFlag;
