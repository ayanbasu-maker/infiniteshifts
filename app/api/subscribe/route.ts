import { NextRequest, NextResponse } from "next/server";

// Kit (ConvertKit) integration for email collection.
// Uses the Kit V4 API to add subscribers.

const KIT_API_URL = "https://api.kit.com/v4";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const firstName = body.firstName?.trim() || "";
    const lastName = body.lastName?.trim() || "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.KIT_API_KEY;
    if (!apiKey) {
      console.error("KIT_API_KEY not configured");
      return NextResponse.json(
        { error: "Email signup is not configured yet." },
        { status: 500 }
      );
    }

    // Add subscriber via Kit V4 API
    const res = await fetch(`${KIT_API_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Accept": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName,
        fields: {
          last_name: lastName,
        },
        state: "active",
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Kit API error:", res.status, errorData);

      if (res.status === 422) {
        return NextResponse.json(
          { error: "You're already subscribed!" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
