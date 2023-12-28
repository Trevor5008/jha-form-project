const { PrismaClient } = require("@prisma/client")
const {
   categories,
   permits,
   atmMonitoring,
   situations,
   hazards,
   hazardControls,
   properPpe,
   emergencyResponse
} = require("../lib/options")

const prisma = new PrismaClient()

const catOptions = [
   permits,
   atmMonitoring,
   situations,
   hazards,
   hazardControls,
   properPpe,
   emergencyResponse
]

async function main() {
   // Populate categories and options for each category
   for (let i = 0; i < catOptions.length; i++) {
      const cat = await prisma.category.create({
         data: {
            name: categories[i]
         }
      })
      for (let j = 0; j < catOptions[i].length; j++) {
            await prisma.categoryOption.create({
                data: {
                    categoryId: cat.id,
                    name: catOptions[i][j]
                }
            })
        }
   }
}

main()
   .then(async () => {
      await prisma.$disconnect()
   })
   .catch(async (e) => {
      console.error(e)
      await prisma.$disconnect()
      process.exit(1)
   })
