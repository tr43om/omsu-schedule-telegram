"use client";
import { ThemeProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

const ThemeProviders = (props: ThemeProviderProps) => {
  return <ThemeProvider {...props} />;
};

export default ThemeProviders;
