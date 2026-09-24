import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    // Only increment views for published articles
    const article = await prisma.article.findFirst({
      where: { slug, status: "PUBLISHED" },
      select: { id: true, views: true },
    });

    if (!article) {
      return NextResponse.json(
        { success: false, message: "Published article not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.article.update({
      where: { id: article.id },
      data: {
        views: {
          increment: 1,
        },
      },
      select: {
        id: true,
        views: true,
      },
    });

    return NextResponse.json({
      success: true,
      views: updated.views,
    });
  } catch (err) {
    console.error("Error incrementing article view:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
