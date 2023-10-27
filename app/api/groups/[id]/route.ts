import { transformSchedule } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const searchParams = request.nextUrl.searchParams;
    console.log(searchParams);
    const date_query = searchParams.get("date") || Date.now();
    const timestamp = new Date(date_query).getTime();

    const response = await fetch(
      `https://eservice.omsu.ru/schedule/backend/schedule/group/${id}`,
      { next: { revalidate: 180 } }
    );

    const { data } = await response.json();

    const shedule = transformSchedule(data, timestamp, "group");

    return NextResponse.json(shedule);
  } catch (error) {
    console.error("ERRPR", error);
  }
}
