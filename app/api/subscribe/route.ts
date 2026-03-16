import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Google Sheets integration for email collection.
// Setup instructions:
// 1. Go to Google Cloud Console → APIs & Services → Credentials
// 2. Create a Service Account, download the JSON key
// 3. Copy the client_email and private_key into .env.local
// 4. Create a Google Sheet and share it with the service account email (Editor access)
// 5. Copy the Sheet ID from the URL into .env.local
//    (the Sheet ID is the long string between /d/ and /edit in the URL)

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
}

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

    const sheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheetId) {
      console.error("GOOGLE_SHEET_ID not configured");
      return NextResponse.json(
        { error: "Email signup is not configured yet." },
        { status: 500 }
      );
    }

    const sheets = await getSheets();

    // Check for duplicates
    const existing = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Sheet1!A:A",
    });

    const emails = existing.data.values?.flat() || [];
    if (emails.includes(email)) {
      return NextResponse.json(
        { error: "You're already subscribed!" },
        { status: 409 }
      );
    }

    // Append new subscriber
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[firstName, lastName, email, new Date().toISOString()]],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
