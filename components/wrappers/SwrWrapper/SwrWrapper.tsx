"use client";
import React, { ReactNode, useRef } from "react";
import { SWRConfig } from "swr";

type SwrWrapperProps = {
  children: ReactNode;
  fallback: any;
  fallbackData: any;
};

const SwrWrapper = ({ children, fallback, fallbackData }: SwrWrapperProps) => {
  const m = useRef(new Map());
  return (
    <SWRConfig value={{ fallback, fallbackData, provider: () => m.current }}>
      {children}
    </SWRConfig>
  );
};

export default SwrWrapper;
