// const prisma = new PrismaClient()
// import { PrismaClient } from "@prisma/client"
// import { NextResponse } from "next/server"

// export async function GET(request) {
//    const payload = await request.json()

//    const shift = await prisma.shift.findAll({
//       data: {
//          name: projectName,
//          Shifts: {
//             create: [
//                {
//                   startDateTime: shiftDateTime,
//                   endDateTime: shiftDateTime,
//                   description: taskDescription
//                }
//             ]
//          }
//       }
//    })
//    const shift = await prisma.shift.findFirst({
//     where: {
//         projectId: project.id,
//         startDateTime: shiftDateTime
//     }
//    })
//    return NextResponse.json({ shift })
// }
