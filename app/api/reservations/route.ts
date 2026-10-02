import { NextResponse } from "next/server";

// Minimal server-side check. Wire this to your booking system (OpenTable,
// SevenRooms, a database, an email service) where the TODO is.
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const required = ["name", "phone", "location", "guests", "date", "time"];
  const missing = required.filter((k) => typeof body[k] !== "string" || !(body[k] as string).trim());
  if (missing.length) {
    return NextResponse.json({ error: "Missing fields", missing }, { status: 422 });
  }
  // TODO: persist the booking / notify the restaurant here.
  return NextResponse.json({ ok: true });
}
