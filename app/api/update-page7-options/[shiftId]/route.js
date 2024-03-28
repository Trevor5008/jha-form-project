import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PATCH(request, { params }) {
   const rawBody = await request.text();
   const data = JSON.parse(rawBody);
   const shiftId = Number(params.shiftId);

   // Situations ID
   const { id: situationsId } = await prisma.category.findFirst({
      where: {
         name: "situations",
      },
      select: { id: true },
   });

   // Update each option w/ details provided
   for (let situation of data.situations) {
      const { id: situationId } = await prisma.categoryOption.findFirst({
         where: {
            name: situation.name,
            categoryId: situationsId,
         },
         select: {
            id: true,
         },
      });

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: situationsId,
               categoryOptionId: situationId,
            },
         },
         data: {
            details: situation.shiftCategoryOptions[0].details,
         },
      });
   }

   // Hazards ID
   const { id: hazardsId } = await prisma.category.findFirst({
      where: {
         name: "hazards",
      },
      select: { id: true },
   });

   // Update each option w/ details provided
   for (let hazard of data.hazards) {
      const { id: hazardId } = await prisma.categoryOption.findFirst({
         where: {
            name: hazard.name,
            categoryId: hazardsId,
         },
         select: {
            id: true,
         },
      });

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: hazardsId,
               categoryOptionId: hazardId,
            },
         },
         data: {
            details: hazard.shiftCategoryOptions[0].details,
         },
      });
   }

   // Hazard Controls Id
   const { id: hazardCtrlsId } = await prisma.category.findFirst({
      where: {
         name: "hazard controls",
      },
      select: { id: true },
   });

   // Update each option w/ details provided
   for (let ctrl of data.hazardControls) {
      const { id: hazardCtrlId } = await prisma.categoryOption.findFirst({
         where: {
            name: ctrl.name,
            categoryId: hazardCtrlsId,
         },
         select: {
            id: true,
         },
      });

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: hazardCtrlsId,
               categoryOptionId: hazardCtrlId,
            },
         },
         data: {
            details: ctrl.shiftCategoryOptions[0].details,
         },
      });
   }

   // PPE Id
   const { id: ppeId } = await prisma.category.findFirst({
      where: {
         name: "ppe",
      },
      select: { id: true },
   });

   // Update each option w/ details provided
   for (let item of data.ppe) {
      const { id: itemId } = await prisma.categoryOption.findFirst({
         where: {
            name: item.name,
            categoryId: ppeId,
         },
         select: {
            id: true,
         },
      });

      await prisma.shiftCategoryOption.update({
         where: {
            shiftId_categoryId_categoryOptionId: {
               shiftId,
               categoryId: ppeId,
               categoryOptionId: itemId,
            },
         },
         data: {
            details: item.shiftCategoryOptions[0].details,
         },
      });
   }
}
