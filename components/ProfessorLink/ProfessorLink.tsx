"use client";

import { useSearchStore } from "@/zustandStore";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type ProfessorLinkProps = {
  id: number;
  name: string;
};

const ProfessorLink = ({ id, name }: ProfessorLinkProps) => {
  const { addToRecents } = useSearchStore((state) => state);
  const searchParams = useSearchParams();
  const selected_date = searchParams.get("date") as string;
  return (
    <div
      // href={`professor/${id}?date=${selected_date}`}
      // replace={true}
      className=" btn-link btn-xs btn text-sm normal-case"
      // onClick={() => addToRecents({ id, name }, "professor")}
    >
      {name}
    </div>
  );
};

export default ProfessorLink;
