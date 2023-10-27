import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const HomeButton = () => {
  return (
    <Link
      href="/"
      className="btn-circle btn-lg btn sticky bottom-5 right-auto max-w-lg bg-primaryGradient"
    >
      <HomeIcon className="h-6 w-6 text-white" />
    </Link>
  );
};

export default HomeButton;
