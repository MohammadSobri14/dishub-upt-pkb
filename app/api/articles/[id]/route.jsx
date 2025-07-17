// app/api/articles/[id]/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ARTICLE BY ID
export async function GET(_, { params }) {
  const article = await prisma.artikel.findUnique({
    where: { id: Number(params.id) },
  });

  return article
    ? NextResponse.json(article)
    : NextResponse.json({ message: "Not Found" }, { status: 404 });
}

// UPDATE ARTICLE
export async function PUT(req, { params }) {
  const data = await req.json();
  const updated = await prisma.artikel.update({
    where: { id: Number(params.id) },
    data: {
      title: data.title,
      content: data.content,
      tag: data.tag,
      image: data.image,
    },
  });
  return NextResponse.json(updated);
}

// DELETE ARTICLE
export async function DELETE(_, { params }) {
  await prisma.artikel.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json({ message: "Artikel dihapus" });
}
