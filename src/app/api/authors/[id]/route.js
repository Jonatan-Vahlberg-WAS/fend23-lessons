import { NextResponse } from "next/server";

import {
  object404Respsonse,
  validateAuthorData,
  validateJSONData,
} from "@/utils/helpers/apiHelpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options) {
  //! get id from request
  const id = options.params.id;

  try {
    const author = await prisma.author.findUniqueOrThrow({
      where: { id: Number(id) },
    });
    return NextResponse.json(author);
  } catch (error) {
    return object404Respsonse(NextResponse, "Author");
  }
}

export async function PUT(req, options) {
  //! get id from request
  const id = options.params.id;

  const [bodyHasErrors, body] = await validateJSONData(req);
  if (bodyHasErrors) {
    return NextResponse.json(
      {
        message: "A valid JSON object has to be sent",
      },
      { status: 400 }
    );
  }

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
    const updatedAuthor = await prisma.author.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        yearOfBirth: body.yearOfBirth,
      },
    });

    return NextResponse.json(updatedAuthor);
  } catch (error) {
    return object404Respsonse(NextResponse, "Author");
  }
}

export async function DELETE(req, options) {
  //! get id from request
  const id = options.params.id;

  try {
    await prisma.author.delete({ where: { id: Number(id) } });

    return new Response(null, { status: 204 });
  } catch (error) {
    return object404Respsonse(NextResponse, "Author");
  }
}
