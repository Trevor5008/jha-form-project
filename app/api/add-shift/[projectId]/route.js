const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const projectId = Number(params['projectId'])

   const shift = await prisma.shift.create({
      data: {
         projectId,
         startDateTime: data.shiftDateTime,
         description: data.taskDescription     
      }
   })
   
   const categoryOptions = await prisma.categoryOption.findMany({})
   for (let option of categoryOptions) {
      await prisma.shiftCategoryOption.create({
         data: {
            shiftId: shift.id,
            categoryId: option.categoryId,
            categoryOptionId: option.id,
            checked: false
         }
      })
   }

   return NextResponse.json({ shiftId: shift.id })
}
