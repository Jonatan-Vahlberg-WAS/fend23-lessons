import { NextResponse } from "next/server";

import { validateBookData } from "@/utils/helpers/apiHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options) {
  const url = new URL(req.url);
  const { genre } = options.params
  const search = url.searchParams.get("search");
  let books = [];
  if (search) {
    books = await prisma.book.findMany({
        where: {
            genre: {
              equals: genre,
              mode: "insensitive"
            },
            title: {
                contains: search,
                mode: 'insensitive',
            }
        }
    })
  } else {
    books = await prisma.book.findMany({
      where: {
        genre: {
          equals: genre,
          mode: "insensitive"
        }
    }
    });
  }

  return NextResponse.json(books);
}