"use client";

import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { themeChange } from "theme-change";

const ThemeSwitcher = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [th, setTh] = useState("");
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    themeChange(false);
    setIsMounted(true);
    if (theme) {
      setTh(theme);
    }
  }, [theme]);
  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === "dracula" ? "cmyk" : "dracula");
    }
  };

  return (
    <div
      className="group btn   ml-auto grid  w-auto lg:flex-grow-0"
      onClick={switchTheme}
    >
      <label
        className={`swap-rotate swap ${
          th === "dracula" && "swap-active"
        } group-hover:text-primary`}
      >
        <SunIcon
          className="swap-off h-6 w-6  text-white dark:text-white"
          width={20}
          height={20}
        />
        <MoonIcon
          className="swap-on h-6 w-6  text-white dark:text-white"
          width={20}
          height={20}
        />
      </label>
    </div>
  );
};

export default ThemeSwitcher;
