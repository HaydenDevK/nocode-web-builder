import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Deployment ID is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`https://api.netlify.com/api/v1/sites/${id}`, {
      headers: {
        Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`,
      },
    });

    const data = await response.json();

    return NextResponse.json({
      status: data.state,
      url: data.url,
      claim_url: data.account_slug ? null : data.admin_url,
    });
  } catch (error) {
    console.error("Status check error:", error);
    return NextResponse.json(
      { error: "Failed to check deployment status" },
      { status: 500 }
    );
  }
}
