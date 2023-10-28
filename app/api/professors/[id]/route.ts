import { transformSchedule } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const searchParams = request.nextUrl.searchParams;
    const date_query = searchParams.get("date") || Date.now();
    const timestamp =
      date_query === "today"
        ? new Date().getTime()
        : new Date(date_query).getTime();

    const response = await fetch(
      `https://eservice.omsu.ru/schedule/backend/schedule/tutor/${id}`,
      { next: { revalidate: 180 } }
    );

    const { data } = await response.json();

    console.log("DATAAAAAAAAAAAAAAAAAAAAAA PROFESSSOSOOSOSOSOSOOSR", data);
    const shedule = transformSchedule(data, timestamp, "professor");

    return NextResponse.json(shedule);
  } catch (error) {
    console.error(error);
  }
}
