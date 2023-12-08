const { PrismaClient } = require("@prisma/client")
const {permits} = require('../lib/options')

const prisma = new PrismaClient()

async function main() {
    for (let permit of permits) {
        await prisma.CategoryOption.createMany({
            data: {
                name: permit,
                categoryId: 1
            }
        })
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
