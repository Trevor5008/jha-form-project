const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"

export async function PATCH(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const shiftId = Number(params.id)

   // Hazards
   // get hazards category id
   const { id: hazardsId } =
      await prisma.category.findFirst({
         where: {
            name: "hazards"
         },
         select: { id: true }
      })

   //    const permitMisc =
   //       await prisma.miscOption.findFirst({
   //          where: {
   //             shiftId,
   //             categoryId: permitsId
   //          }
   //       })

   //    if (!permitMisc && data.permitMisc) {
   //       await prisma.miscOption.create({
   //          data: {
   //             shiftId,
   //             categoryId: permitsId,
   //             details: data.permitMisc
   //          }
   //       })
   //    } else if (data.permitMisc) {
   //       await prisma.miscOption.update({
   //          where: {
   //             shiftId_categoryId: {
   //                shiftId,
   //                categoryId: permitsId
   //             }
   //          },
   //          data: { details: data.permitMisc }
   //       })
   //    }
   // Iterate over each option and update 'checked' value
   for (let hazard of data.hazards) {
      const { id: hazardId } =
         await prisma.categoryOption.findFirst({
            where: {
               name: hazard.name,
               categoryId: hazardsId
            },
            select: {
               id: true
            }
         })

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: hazardsId,
               categoryOptionId: hazardId
            }
         },
         data: {
            checked:
               hazard.shiftCategoryOptions[0]
                  .checked
         }
      })
   }
}
