const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"

export async function PATCH(request, { params }) {
   const rawBody = await request.text()
   const data = JSON.parse(rawBody)
   const shiftId = Number(params.shiftId)

   console.log(data)
   // Hazards
   // get hazards category id
   const { id: hazardControlsId } =
      await prisma.category.findFirst({
         where: {
            name: "hazard controls"
         },
         select: { id: true }
      })


   // Iterate over each option and update 'checked' value
   // Handles each standard hazard control option
   for (let control of data.hazardControls) {
      const { id: hazardControlId } =
         await prisma.categoryOption.findFirst({
            where: {
               name: control.name,
               categoryId: hazardControlsId
            },
            select: {
               id: true
            }
         })

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: hazardControlsId,
               categoryOptionId: hazardControlId
            }
         },
         data: {
            checked:
               control.shiftCategoryOptions[0]
                  .checked
         }
      })
   }

   // Shift Personnel Assignments
   
}
