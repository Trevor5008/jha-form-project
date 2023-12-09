const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET(request) {
    // Permits
   const permit = await prisma["category"].findFirst({
    where: {
        name: "permits"
    },
    select: { id: true }
   })
   const permits = await prisma.categoryOption.findMany({
    where: {
        categoryId: permit.id
    }
   })
   // Atmospheric Monitoring
   const atmosphere = await prisma.category.findFirst({
    where: {
        name: "atmospheric monitoring"
    },
    select: { id: true }
   })
   const atmMonitoring = await prisma.categoryOption.findMany({
    where: {
        categoryId: atmosphere.id
    }
   })
   return NextResponse.json({ permits, atmMonitoring })
}
