import { Schedule } from "@/components";

const getGroup = async (groupID: string) => {
  const data = await fetch(
    `${
      process.env.VERCEL_URL ?? "http://localhost:3000"
    }/api/groups/${groupID}`,
    {
      next: { revalidate: 180 },
    }
  ).then((res) => res.json());

  return data;
};

const Group = async ({
  params,
  searchParams,
}: {
  params: { group: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const data = await getGroup(params.group);

  return <Schedule schedule={data} />;
};

export default Group;
