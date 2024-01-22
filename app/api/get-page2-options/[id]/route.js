const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    const shiftId = Number(params['id'])
    // Permits Category Id
   const { id: permitId } = await prisma.category.findFirst({
    where: {
        name: "permits"
    },
    select: { id: true }
   })

   // Permit Category Options (Ids)
   const permitMisc = await prisma.miscOption.findFirst({
    where: {
        shiftId,
        categoryId: permitId
    }
   })

   // Atmospheric Monitoring
   const { id: atmMonitorId } = await prisma.category.findFirst({
    where: {
        name: "atmospheric monitoring"
    },
    select: { id: true }
   })

   const permitOpts = await prisma.categoryOption.findMany({
    where: {
        categoryId: permitId
    },
    select: { 
        name: true, 
        shiftCategoryOptions: {
            where: { 
                shiftId
            },
            select: { checked: true }
        }
    },
   })

   const atmMonitorOpts = await prisma.categoryOption.findMany({
    where: {
        categoryId: atmMonitorId
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

   return NextResponse.json({ permitOpts, permitMisc, atmMonitorOpts })
}
