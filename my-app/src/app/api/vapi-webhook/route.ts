// app/api/vapi-webhook/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const event = body.event;
  const data = body.data;

  if (event === "call.updated") {
    console.log("Call status changed:", data.callId, data.status);

  }

  return NextResponse.json({ received: true });
}
