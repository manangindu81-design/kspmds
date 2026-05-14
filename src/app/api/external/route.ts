import { NextRequest, NextResponse } from "next/server";

const EXTERNAL_API_BASE = process.env.EXTERNAL_API_URL || "https://api.example.com";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const endpoint = searchParams.get("endpoint") || "";

  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint parameter required" }, { status: 400 });
  }

  const apiKey = process.env.EXTERNAL_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: "External API key not configured" }, { status: 500 });
  }

  try {
    const response = await fetch(`${EXTERNAL_API_BASE}/${endpoint}`, {
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch external data" }, { status: 500 });
  }
}