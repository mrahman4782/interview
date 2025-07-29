import { NextResponse } from "next/server";
import { callStatuses } from "../vapi-webhook/route";

export async function GET() {
  return NextResponse.json(callStatuses);
}