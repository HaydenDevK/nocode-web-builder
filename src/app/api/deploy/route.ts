import { NextResponse } from "next/server";
import JSZip from "jszip";

export async function POST(req: Request) {
  try {
    const { html } = await req.json();

    const zip = new JSZip();
    zip.folder("site")?.file("index.html", html);
    const zipContent = await zip.generateAsync({ type: "blob" });

    const response = await fetch("https://api.netlify.com/api/v1/sites", {
      method: "POST",
      headers: {
        "Content-Type": "application/zip",
        Authorization: `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`,
      },
      body: zipContent,
    });

    const data = await response.json();

    console.log("Deployment response:", data);
    return NextResponse.json({
      id: data.id,
      url: data.url,
      status: data.state,
    });
  } catch (error) {
    console.error("Deployment error:", error);
    return NextResponse.json({ error: "Deployment failed" }, { status: 500 });
  }
}
