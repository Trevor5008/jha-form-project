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

   const categoryOptions = await prisma.categoryOption.findMany()

   const project = await prisma.project.create({
      data: {
         name: projectName,
         Shifts: {
            create: [
               {
                  startDateTime: shiftDateTime,
                  endDateTime: shiftDateTime,
                  description: taskDescription,
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
   
   for (let catOption of categoryOptions) {
      await prisma.shift.update({
         where: { id: shift.id },
         data: {
            shiftCategoryOptions: {
               create: [
                  {
                     categoryId: catOption.categoryId,
                     categoryOptionId: catOption.id,
                     checked: false
                  }
               ]
            }
         }
      })
   }

   return NextResponse.json({ shift })
}
