const { PrismaClient } = require("@prisma/client")
const { 
    categories,
    permits,
    atmosphericMonitoring,
    situations,
    hazards,
    hazardControls,
    properPpe,
    emergencyResponse
    } = require("../lib/options")

const prisma = new PrismaClient()

const options = ["permits"]

async function main() {
    // Populate categories
    let categoriesArr = []
    for (let category of categories) {
        const cat = await prisma.category.create({
            data: {
                name: category
            }
        })
        categoriesArr.push(cat)
    }

    for (let permit of permits) {
        await prisma.categoryOption.create({
            data: {
                name: permit,
                categoryId: categoriesArr[0].id
            }
        })
    }
    categoriesArr.shift()

    for (let atmosphericCondition of atmosphericMonitoring) {
        await prisma.categoryOption.create({
            data: {
                name: atmosphericCondition,
                categoryId: categoriesArr[0].id
            }
        })
    }

    categoriesArr.shift()

    for (let situation of situations) {
        await prisma.categoryOption.create({
            data: {
                name: situation,
                categoryId: categoriesArr[0].id
            }
        })
    }
    categoriesArr.shift()

    for (let hazard of hazards) {
        await prisma.categoryOption.create({
            data: {
                name: hazard,
                categoryId: categoriesArr[0].id
            }
        })
    }
    categoriesArr.shift()

    for (let hazardControl of hazardControls) {
        await prisma.categoryOption.create({
            data: {
                name: hazardControl,
                categoryId: categoriesArr[0].id
            }
        })
    }
    categoriesArr.shift()

    for (let ppe of properPpe) {
        await prisma.categoryOption.create({
            data: {
                name: ppe,
                categoryId: categoriesArr[0].id
            }
        })
    }
    categoriesArr.shift()

    for (let response of emergencyResponse) {
        await prisma.categoryOption.create({
            data: {
                name: response,
                categoryId: categoriesArr[0].id
            }
        })
    }
    categoriesArr.shift()
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
