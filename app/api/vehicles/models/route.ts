import { NextResponse } from "next/server";
import { getModelsForMake } from "@/lib/nhtsa";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const makeId = searchParams.get("makeId");

  if (!makeId) {
    return NextResponse.json({ error: "makeId is required" }, { status: 400 });
  }

  const models = await getModelsForMake(parseInt(makeId));
  return NextResponse.json(models);
}
