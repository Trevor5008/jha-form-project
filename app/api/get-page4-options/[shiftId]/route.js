const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const shiftId = Number(params['shiftId'])

    // Hazards Category Id
    const { id: hazardsId } = await prisma.category.findFirst({
        where: {
            name: "hazards"
        },
        select: { id: true }
    })

    // Hazards Category Options
    const hazardOpts = await prisma.categoryOption.findMany({
        where: { categoryId: hazardsId },
        select: {
            name: true,
            shiftCategoryOptions: {
                where: { shiftId },
                select: { checked: true}
            }
        }
    })

    return NextResponse.json({ hazardOpts })
}