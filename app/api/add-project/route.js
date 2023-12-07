const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request) {
   const payload = await request.json()
   const {
      projectName,
      shiftDateTime,
      taskDescription
   } = payload.obj

   const project = await prisma.project.create({
      data: {
         name: projectName,
         Shifts: {
            create: [
               {
                  startDateTime: shiftDateTime,
                  endDateTime: shiftDateTime,
                  description: taskDescription
               }
            ]
         }
      }
   })
   const shift = await prisma.shift.findFirst({
    where: {
        projectId: project.id,
        startDateTime: shiftDateTime
    }
   })
   return NextResponse.json({ shift })
}
