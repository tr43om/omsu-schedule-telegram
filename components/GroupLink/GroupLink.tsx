"use client";

import { useSearchStore } from "@/zustandStore";
import { UserIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

type GroupLinkProps = {
  id: number;
  name: string;
  // course: number;
};

const GroupLink = ({ id, name }: GroupLinkProps) => {
  const { addToRecents } = useSearchStore((state) => state);
  return (
    <div
      // href={`groups/${id}`}
      // onClick={() => addToRecents({ id, name, course }, "group")}
      className="btn-link btn-xs btn flex items-center justify-start gap-1.5 justify-self-start p-0 text-primary"
    >
      <UserIcon width={15} height={15} className="text-primary" />
      <p className="lg:text-md text-sm">{name}</p>
    </div>
  );
};

export default GroupLink;
