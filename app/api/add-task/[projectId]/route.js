import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request, { params }) {
   const rawBody = await request.text();
   const data = JSON.parse(rawBody);
   const projectId = Number(params["projectId"]);

   await prisma.task.create({
      data: {
         id: true,
         name: true,
         Tasks: [],
      },
   });
   return NextResponse.json({ task });
}
