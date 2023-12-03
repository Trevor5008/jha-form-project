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
   console.log(projectName)
   await prisma.project.create({
      data: {
         name: projectName,
         Shifts: {
            create: [
               {
                  startDateTime: shiftDateTime,
                  endDateTime: null,
                  description: taskDescription
               }
            ]
         }
      }
   })
}
