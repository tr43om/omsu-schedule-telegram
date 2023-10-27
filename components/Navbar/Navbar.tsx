import React from "react";
import { ThemeSwitcher } from "@/components";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="navbar  mt-10 bg-base-100 !p-0 lg:mb-16">
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;
