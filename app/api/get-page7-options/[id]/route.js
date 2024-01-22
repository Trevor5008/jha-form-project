const prisma = new PrismaClient();
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
   const shiftId = Number(params["id"]);

   const { situationsId, hazardsId, hazardControlsId, ppeId } =
      await gatherCategoryIds();

   const situations = await getSituationOps(shiftId, situationsId);
   const hazards = await getHazardOpts(shiftId, hazardsId);
   const hazardControls = await getHazardControlOpts(shiftId, hazardControlsId);
   const ppe = await getPpeOpts(shiftId, ppeId);

   return NextResponse.json({ situations, hazards, hazardControls, ppe });
}

const getSituationOps = async (shiftId, situationsId) => {
   const situationOpts = await prisma.categoryOption.findMany({
      where: { categoryId: situationsId },
      include: {
         shiftCategoryOptions: {
            where: { shiftId, checked: true },
         },
      },
   });

   const situations = situationOpts.filter((control) => {
      return control.shiftCategoryOptions.length > 0;
   });

   return situations;
};

const getHazardOpts = async (shiftId, hazardsId) => {
   const hazardOpts = await prisma.categoryOption.findMany({
      where: { categoryId: hazardsId },
      include: {
         shiftCategoryOptions: {
            where: { shiftId, checked: true },
         },
      },
   });

   const hazards = hazardOpts.filter((control) => {
      return control.shiftCategoryOptions.length > 0;
   });
   return hazards;
};

const getHazardControlOpts = async (shiftId, hazardControlsId) => {
   const hazardControlOpts = await prisma.categoryOption.findMany({
      where: { categoryId: hazardControlsId },
      include: {
         shiftCategoryOptions: {
            where: { shiftId, checked: true },
         },
      },
   });

   const hazardControls = hazardControlOpts.filter((control) => {
      return control.shiftCategoryOptions.length > 0;
   });
   return hazardControls;
};

const getPpeOpts = async (shiftId, ppeId) => {
   const ppeOpts = await prisma.categoryOption.findMany({
      where: { categoryId: ppeId },
      include: {
         shiftCategoryOptions: {
            where: { shiftId, checked: true },
         },
      },
   });

   const ppe = ppeOpts.filter((control) => {
      return control.shiftCategoryOptions.length > 0;
   });
   return ppe;
};

const gatherCategoryIds = async () => {
   // Situations Id
   const { id: situationsId } = await prisma.category.findFirst({
      where: {
         name: "situations",
      },
      select: { id: true },
   });

   // Hazards Id
   const { id: hazardsId } = await prisma.category.findFirst({
      where: {
         name: "hazards",
      },
      select: { id: true },
   });

   // Hazard Controls Id
   const { id: hazardControlsId } = await prisma.category.findFirst({
      where: {
         name: "hazard controls",
      },
      select: { id: true },
   });

   // PPE Id
   const { id: ppeId } = await prisma.category.findFirst({
      where: {
         name: "ppe",
      },
      select: { id: true },
   });

   return { situationsId, hazardsId, hazardControlsId, ppeId };
};
