import { NextRequest, NextResponse } from "next/server";

// Kit (ConvertKit) integration for email collection.
// Uses the Kit V3 API to subscribe users to a form.

const KIT_API_URL = "https://api.convertkit.com/v3";

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
    const formId = process.env.KIT_FORM_ID;
    if (!apiKey || !formId) {
      console.error("KIT_API_KEY or KIT_FORM_ID not configured");
      return NextResponse.json(
        { error: "Email signup is not configured yet." },
        { status: 500 }
      );
    }

    // Subscribe to form via Kit V3 API (state: "active" skips confirmation email)
    const res = await fetch(`${KIT_API_URL}/forms/${formId}/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: apiKey,
        email,
        first_name: firstName,
        state: "active",
        fields: {
          last_name: lastName,
        },
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
