import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"
const prisma = new PrismaClient()

export async function GET() {
    const project = await prisma.project.findFirst({
        select: {
            id: true,
            name: true,
            Tasks: []
        }
    })
    
    return NextResponse.json({ project })
}