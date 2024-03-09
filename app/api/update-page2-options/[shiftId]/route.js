const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"

export async function PATCH(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const shiftId = Number(params.shiftId)

   // Permits
   // get permit category id
   const { id: permitsId } =
      await prisma.category.findFirst({
         where: {
            name: "permits"
         },
         select: { id: true }
      })

   const permitMisc =
      await prisma.miscOption.findFirst({
         where: {
            shiftId,
            categoryId: permitsId
         }
      })

   if (!permitMisc && data.permitMisc) {
      await prisma.miscOption.create({
         data: {
            shiftId,
            categoryId: permitsId,
            details: data.permitMisc
         }
      })
   } else if (data.permitMisc) {
      await prisma.miscOption.update({
         where: {
            shiftId_categoryId: {
               shiftId,
               categoryId: permitsId
            }
         },
         data: { details: data.permitMisc }
      })
   }
   // Iterate over each option and update 'checked' value
   for (let permit of data.permits) {
      const { id: permitId } =
         await prisma.categoryOption.findFirst({
            where: {
               name: permit.name
            },
            select: {
               id: true
            }
         })

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryOptionId: permitId,
               categoryId: permitsId
            }
         },
         data: {
            checked:
               permit.shiftCategoryOptions[0]
                  .checked
         }
      })
   }

   // Atmospheric Monitoring
   // Get atm monitor id
   const { id: atmsId } =
      await prisma.category.findFirst({
         where: {
            name: "atmospheric monitoring"
         },
         select: { id: true }
      })
   // Iterate over each option and update 'checked' value
   for (let atm of data.atmMonitoring) {
      const { id: atmId } =
         await prisma.categoryOption.findFirst({
            where: {
               name: atm.name
            },
            select: {
               id: true
            }
         })

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryOptionId: atmId,
               categoryId: atmsId
            }
         },
         data: {
            checked:
               atm.shiftCategoryOptions[0].checked
         }
      })
   }
}
