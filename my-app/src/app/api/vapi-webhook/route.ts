import { NextRequest, NextResponse } from "next/server";

let callStatuses: Record<string, string> = {};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { event, data } = body;

  if (event === "call.updated") {
    console.log("Call updated:", data.callId, data.status);
    callStatuses[data.callId] = data.status;
  }

  return NextResponse.json({ received: true });
}
export { callStatuses };
