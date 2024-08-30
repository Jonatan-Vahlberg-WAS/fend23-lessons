import { NextResponse } from "next/server";

import authors from "@/data/authors";
import { PrismaClient } from "@prisma/client";
import {
  validateAuthorData,
  validateJSONData,
} from "@/utils/helpers/apiHelpers";

const prisma = new PrismaClient();

export async function GET(req, options) {
  // get authors from database
  let authors = await prisma.author.findMany();

  //? optional filter authors

  // return authors
  return NextResponse.json(authors, {
    status: 200,
  });
}

export async function POST(req, options) {
  const [bodyHasErrors, body] = await validateJSONData(req);
  if (bodyHasErrors) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      { status: 400 }
    );
  }

  //? optional validate incoming data
  const [hasErrors, errors] = validateAuthorData(body);
  if (hasErrors) {
    return NextResponse.json(
      {
        message: errors,
      },
      { status: 400 }
    );
  }

  try {
    const author = await prisma.author.create({
      data: {
        name: body.name,
        yearOfBirth: body.yearOfBirth,
      },
    });
    return NextResponse.json(author, { status: 201 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Invalid data sent for author creation",
      },
      {
        status: 400,
      }
    );
  }
}
