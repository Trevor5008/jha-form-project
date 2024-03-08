const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const taskId = Number(params['taskId'])
   const { foreman, startDateTime } = data

   const shift = await prisma.shift.create({
      data: {
         taskId,
         foreman,
         startDateTime,
         status: 'in-progress'   
      }
   })
   
   const catOptions = await prisma.categoryOption.findMany({})
   for (let opt of catOptions) {
      await prisma.shiftCategoryOption.create({
         data: {
            shiftId: shift.id,
            categoryId: opt.categoryId,
            categoryOptionId: opt.id,
            checked: false,
            details: ''
         }
      })
   }

   return NextResponse.json({ shiftId: shift.id })
}
