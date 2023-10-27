import { Schedule } from "@/components";

const getProfessor = async (professorId: string) => {
  const data = await fetch(
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/professors/${professorId}`,
    {
      next: { revalidate: 180 },
    }
  ).then((res) => res.json());

  return data;
};

const Professor = async ({ params }: { params: { professor: string } }) => {
  const data = await getProfessor(params.professor);

  return <Schedule schedule={data} />;
};

export default Professor;
