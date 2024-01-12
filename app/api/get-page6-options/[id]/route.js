const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const shiftId = Number(params['id'])

    // Hazards Category Id
    const { id: ppeId } = await prisma.category.findFirst({
        where: {
            name: "ppe"
        },
        select: { id: true }
    })

    // Hazards Category Options
    const ppeOpts = await prisma.categoryOption.findMany({
        where: { categoryId: ppeId },
        select: {
            name: true,
            shiftCategoryOptions: {
                where: { shiftId },
                select: { checked: true}
            }
        }
    })

    return NextResponse.json({ ppeOpts })
}