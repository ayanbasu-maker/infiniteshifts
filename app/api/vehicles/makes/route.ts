import { NextResponse } from "next/server";
import { getAllMakes } from "@/lib/nhtsa";

export async function GET() {
  const makes = await getAllMakes();
  return NextResponse.json(makes);
}
