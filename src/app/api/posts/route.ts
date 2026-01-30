import { auth } from "@/lib/auth";
import slugify from "slugify";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  CloudinaryUploadResult,
  uploadToCloudinary,
} from "@/services/cloudinary";

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const FormData = await req.formData();
    const title = FormData.get("title") as string;
    const content = FormData.get("content") as string;
    const excerpt = FormData.get("excerpt") as string;
    const coverImage = FormData.get("coverImage") as File;

    if (!title || !content || !coverImage || !excerpt) {
      return NextResponse.json(
        { error: "Failed to create post" },
        { status: 500 },
      );
    }

    //generate slug
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // ensure slug is unique
    let slug = baseSlug;
    let counter = 1;
    // first-post-1, first-post-2, ....
    while (await prisma.post.findUnique({ where: { slug } })) {
      slug = `${slug}-${counter}`;
      counter++;
    }

    // upload coverimage
    const imageData: CloudinaryUploadResult =
      await uploadToCloudinary(coverImage);

    const post = await prisma.post.create({
      data: {
        title,
        excerpt,
        slug,
        content,
        coverImageURL: imageData.secure_url,
        coverImagePublicId: imageData.public_id,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("CRAETE_POST_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const DEFAULT_LIMIT = 3;

    const cursor = searchParams.get("cursor");

    const limit = Number(searchParams.get("limit")) || DEFAULT_LIMIT;

    const posts = await prisma.post.findMany({
      take: limit + 1,

      orderBy: {
        createdAt: "desc",
      },

      cursor: cursor ? { id: cursor } : undefined,

      skip: cursor ? 1 : 0,

      select: {
        id: true,
        excerpt: true,
        title: true,
        slug: true,
        createdAt: true,
        coverImageURL: true,
      },
    });

    // Determine the pagination states
    const hasMore = posts.length > limit;

    const items = hasMore ? posts.slice(0, limit) : posts;

    const nextCursor = hasMore ? items[items.length - 1].id : null;

    return NextResponse.json({
      posts: items,
      nextCursor,
    });

    
  } catch (error) {
    console.error("FETCH_POST_ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}
