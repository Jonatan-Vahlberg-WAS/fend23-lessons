import { NextResponse } from "next/server";
import books from "@/data/books";
import { object404Respsonse, validateBookData } from "@/utils/helpers/apiHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, options){
    const id = options.params.id

    try {
        const book = await prisma.book.findUniqueOrThrow({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json(book)
    }catch(error) {
        console.log(error)
        return object404Respsonse(NextResponse, "Book")
    }
}

export async function PUT(req, options) {
    const id = options.params.id;
    
    let body;

    try {
        body = await req.json()
    }
    catch(error) {
        return NextResponse.json({
            message: "A valid JSON object has to be sent"
        }, {
            status: 400
        })
    }

    const [hasErrors, errors] = validateBookData(body)
    if(hasErrors) {
        return NextResponse.json({
            message: errors
        }, {
            status: 400
        })
    }

    try {
        const updatedBook = await prisma.book.update({
            where: {
                id: Number(id)
            },
            data: {
                title: body.title,
                author: body.author
            }
        })

        return NextResponse.json(updatedBook)
    } catch(error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}

export async function DELETE(req, options) {
    const id = options.params.id
    
    const bookIndex = books.findIndex(b => b.id == id)
    if(bookIndex === -1) {
        return object404Respsonse(NextResponse, "Book")
    }
    
    books.splice(bookIndex,1) // Database call simulation

    return new Response(null, {
        status: 204
    })
}