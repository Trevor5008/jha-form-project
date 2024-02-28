const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const shiftId = Number(params['shiftId'])

    // Hazards Category Id
    const { id: hazardControlsId } = await prisma.category.findFirst({
        where: {
            name: "hazard controls"
        },
        select: { id: true }
    })

    // Hazards Category Options
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

    return NextResponse.json({ hazardControlOpts })
}