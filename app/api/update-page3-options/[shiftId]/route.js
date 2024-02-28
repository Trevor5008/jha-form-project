const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function PATCH(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const shiftId = Number(params.shiftId)

   // Situations
   // get situations category id
   const { id: situationsId } =
      await prisma.category.findFirst({
         where: {
            name: "situations"
         },
         select: { id: true }
      })

   // const situationsMisc =
   //    await prisma.miscOption.findFirst({
   //       where: {
   //          shiftId,
   //          categoryId: situationsId
   //       }
   //    })

   // if (!situationsMisc) {
   //    await prisma.miscOption.create({
   //       data: {
   //          shiftId,
   //          categoryId: situationsId,
   //          details: data.situationsMisc
   //       }
   //    })
   // } else {
   //    await prisma.miscOption.update({
   //       where: {
   //          shiftId_categoryId: {
   //             shiftId,
   //             categoryId: situationsId
   //          }
   //       },
   //       data: { details: data.situationsMisc }
   //    })
   // }
   // Iterate over each option and update 'checked' value
   for (let situation of data.situations) {
      const { id: situationId } =
         await prisma.categoryOption.findFirst({
            where: {
               name: situation.name
            },
            select: {
               id: true
            }
         })

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryOptionId: situationId,
               categoryId: situationsId
            }
         },
         data: {
            checked:
               situation.shiftCategoryOptions[0]
                  .checked
         }
      })
   }
}
