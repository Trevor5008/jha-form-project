const prisma = new PrismaClient()
import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const projects = await prisma.project.findMany({
        select: {
            id: true,
            name: true,
            Shifts: []
        }
    })
    
    return NextResponse.json({ projects })
}