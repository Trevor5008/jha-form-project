const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const shiftId = Number(params['id'])

    // Situations Category Id
    const { id: situationsId } = await prisma.category.findFirst({
        where: {
            name: "situations"
        },
        select: { id: true }
    })

    // Situations Category Options
    const situationOpts = await prisma.categoryOption.findMany({
        where: {
            categoryId: situationsId
        },
        select: {
            name: true,
            shiftCategoryOptions: {
                where: {
                    shiftId
                },
                select: { checked: true }
            }
        }
    })

    const situationMisc = await prisma.miscOption.findFirst({
        where: {
            shiftId,
            categoryId: situationsId
        }
    })

    return NextResponse.json({ situationOpts, situationMisc })
}