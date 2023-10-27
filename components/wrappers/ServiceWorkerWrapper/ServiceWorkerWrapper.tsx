"use client";
import type { Workbox } from "workbox-window";
import { useEffect } from "react";

declare global {
  interface Window {
    workbox: Workbox;
  }
}

const ServiceWorkerWrapper = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator && window.workbox !== undefined) {
      const wb = window.workbox;
      wb.register();
    }
  }, []);
  return <></>;
};

export default ServiceWorkerWrapper;
