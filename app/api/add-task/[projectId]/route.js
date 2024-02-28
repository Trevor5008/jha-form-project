import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// Creates new task for a given project id
export async function POST(request, { params }) {
   const rawBody = await request.text();
   const data = JSON.parse(rawBody);
   const projectId = Number(params["projectId"]);
   const { supervisor, task } = data

   await prisma.task.create({
      data: {
         projectId,
         name: task,
         supervisor
      },
   });
   return NextResponse.json({ task });
}
