import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(request, { params }) {
   const rawBody = await request.text();
   const data = JSON.parse(rawBody);
   const projectId = Number(params["projectId"]);
   const { supervisor, task } = data
   console.log(supervisor, task)

   await prisma.task.create({
      data: {
         projectId,
         name: task,
         supervisor
      },
   });
   return NextResponse.json({ task });
}
