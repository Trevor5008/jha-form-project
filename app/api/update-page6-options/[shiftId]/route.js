const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"

export async function PATCH(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const shiftId = Number(params.shiftId)

   // PPE
    // Get PPE category ID
   const { id: ppeId } =
      await prisma.category.findFirst({
         where: {
            name: "ppe"
         },
         select: { id: true }
      })

   // Iterate over each option and update 'checked' value
   for (let control of data.ppe) {
      const { id: ppeControlId } =
         await prisma.categoryOption.findFirst({
            where: {
               name: control.name,
               categoryId: ppeId
            },
            select: {
               id: true
            }
         })

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: ppeId,
               categoryOptionId: ppeControlId
            }
         },
         data: {
            checked:
               control.shiftCategoryOptions[0]
                  .checked
         }
      })
   }
}
