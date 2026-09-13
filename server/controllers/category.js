const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// สร้าง Category
exports.create = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' })
    }

    const category = await prisma.category.create({
      data: {
        name: name
      }
    })

    res.json(category)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// ดึงรายการ Category ทั้งหมด
exports.list = async (req, res) => {
  try {
    const category = await prisma.category.findMany()
    res.json(category)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}

// ลบ Category
exports.remove = async (req, res) => {
  try {
    const { id } = req.params
    const category = await prisma.category.delete({
      where: {
        id: Number(id)
      }
    })
    res.json(category)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server Error' })
  }
}