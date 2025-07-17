import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// GET ALL ARTICLES
export async function GET() {
  try {
    const articles = await prisma.artikel.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE ARTICLE
export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get("title");
  const content = formData.get("content");
  const tag = formData.get("tag");
  const files = formData.getAll("image");

  if (!files || files.length === 0) {
    return NextResponse.json(
      { error: "Minimal 1 gambar harus dikirim" },
      { status: 400 }
    );
  }

  try {
    const uploadedUrls = [];

    for (const file of files) {
      if (typeof file === "string") continue;

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataUrl = `data:${file.type};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataUrl, {
        folder: "artikel",
      });

      uploadedUrls.push(result.secure_url);
    }

    const newArticle = await prisma.artikel.create({
      data: {
        title,
        content,
        tag,
        image: uploadedUrls.join(","), // Jika di schema image: String
      },
    });

    return NextResponse.json(newArticle);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
