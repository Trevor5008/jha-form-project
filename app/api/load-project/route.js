import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET() {
   const project = await prisma.project.findFirst({
      select: {
         id: true,
         name: true,
         // assc. tasks
         Tasks: {
            select: {
               id: true,
               name: true,
               supervisor: true,
               // assc. shifts
               Shifts: {
                  select: {
                     id: true,
                     startDateTime: true,
                     foreman: true,
                  },
               },
            },
         },
      },
   });
   return NextResponse.json({ project });
}
