import { NextResponse } from "next/server";

import { signJWT } from "@/utils/helpers/authHelpers";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export async function POST(req) {
    let body;
    try {
      body = await req.json();
     if(!body.email || !body.passwordxw){
      throw new Error()
     } 
    } catch (error) {
      return NextResponse.json(
        {
          message: "A valid new user object has to be provided",
        },
        {
          status: 400,
        }
      );
    }

    try {
      //TODO: get user 
      //TODO: generate token
      //TODO: return token and user
    } catch (error) {
      console.log(error)
      return NextResponse.json({
        error: error.message
      }, {
        status: 400
      })
    }
}