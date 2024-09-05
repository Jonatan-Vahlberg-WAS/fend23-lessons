import { NextResponse } from "next/server";

import { validateBookData } from "@/utils/helpers/apiHelpers";

import { PrismaClient } from "@prisma/client";
import { verifyJWT } from "@/utils/helpers/authHelpers";

const prisma = new PrismaClient();

export async function GET(req) {
  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  let books = [];
  if (search) {
    books = await prisma.book.findMany({
        where: {
            title: {
                contains: search,
                mode: 'insensitive',
            }
        }
    })
  } else {
    books = await prisma.book.findMany();
  }

  return NextResponse.json(books);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      {
        status: 400,
      }
    );
  }
  const userId = req.headers.get('userId')
  console.log("User making the req: ", userId)

  const [hasErrors, errors] = validateBookData(body)
    if(hasErrors) {
        return NextResponse.json({
            message: errors
        }, {
            status: 400
        })
    }

  let newBook;
  try {
    newBook = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        genre: body.genre
      },
    });
  }catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Invalid data sent for book creation",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(newBook, {
    status: 201,
  });
}
