const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const shiftId = Number(params['shiftId'])

    // Hazard Controls Category Id
    const { id: hazardControlsId } = await prisma.category.findFirst({
        where: {
            name: "hazard controls"
        },
        select: { id: true }
    })

    // Hazard Controls Category Options
    const hazardControlOpts = await prisma.categoryOption.findMany({
        where: { categoryId: hazardControlsId },
        select: {
            name: true,
            shiftCategoryOptions: {
                where: { shiftId },
                select: { checked: true}
            }
        }
    })

    // Gather all personnel for possible assignment
    const personnel = await prisma.personnel.findMany({
         select: {
               name: true,
               id: true,
         }
      })

      // Find all shift personnel data and return it, shift personnel name's are found in the personnel table
      const shiftPersonnel = await prisma.shiftPersonnel.findMany({
         where: {
               shiftId,
               personnelId: {
                  in: personnel.map(p => p.id)
               }
         },
         select: {
               id: true,
               assignment: true,
               personnelId: true,
               personnel: {
                  select: {
                     name: true
                  }
               }
         }
      })

    return NextResponse.json({ hazardControlOpts, personnel, shiftPersonnel })
}