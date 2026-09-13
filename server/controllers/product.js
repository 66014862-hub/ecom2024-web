const cloudinary = require('cloudinary').v2;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.create = async (req, res) => {
  try {
    const { title, description, price, quantity, categoryId, images } = req.body;
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        quantity: Number(quantity),
        categoryId: Number(categoryId),
        images: {
          create: Array.isArray(images) && images.length > 0
            ? images.map((item) => ({
                asset_id: item.asset_id || "",
                public_id: item.public_id || "",
                url: item.url || "",
                secure_url: item.secure_url || "",
              }))
            : [],
        },
      },
    });
    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.list = async (req, res) => {
  try {
    const { count } = req.params;
    const products = await prisma.product.findMany({
      take: parseInt(count),
      orderBy: { createdAt: 'desc' },
      include: { category: true, images: true }
    });
    return res.send(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: { category: true, images: true }
    });
    return res.send(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity, categoryId, images } = req.body;
    const catId = Number(categoryId);

    const categoryExist = await prisma.category.findUnique({ where: { id: catId } });
    if (!categoryExist) {
      return res.status(400).json({ message: "ไม่พบหมวดหมู่นี้ในระบบ" });
    }

    await prisma.image.deleteMany({ where: { productId: Number(id) } });

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        price: Number(price),
        quantity: Number(quantity),
        categoryId: catId,
        images: images && images.length > 0 ? {
          create: images.map((item) => ({
            asset_id: item.asset_id,
            public_id: item.public_id,
            url: item.url,
            secure_url: item.secure_url
          }))
        } : undefined
      }
    });

    return res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = Number(id);

    const product = await prisma.product.findFirst({
      where: { id: productId },
      include: { images: true },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.images && product.images.length > 0) {
      const deleteImagePromises = product.images.map((img) => {
        if (img.public_id) {
          return cloudinary.uploader.destroy(img.public_id);
        }
      });
      await Promise.all(deleteImagePromises);
    }

    await prisma.image.deleteMany({ where: { productId } });
    await prisma.product.delete({ where: { id: productId } });

    return res.send("Delete Product and Images Success");
  } catch (err) {
    console.log("Remove Product Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.listBy = async (req, res) => {
  try {
    const { sort, order, limit } = req.body;
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { [sort]: order },
      include: { category: true }
    });
    return res.send(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// รวมการค้นหาด้วย Query, Category และ Price ด้วย Prisma
exports.searchFilters = async (req, res) => {
  try {
    const { query, category, price } = req.body;
    let whereClause = {};

    if (query && query.trim() !== "") {
      whereClause.title = { contains: query };
    }

    if (category && Array.isArray(category) && category.length > 0) {
      whereClause.categoryId = {
        in: category.map((id) => Number(id))
      };
    }

    if (price && Array.isArray(price) && price.length === 2) {
      whereClause.price = {
        gte: Number(price[0]),
        lte: Number(price[1])
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
        images: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return res.json(products);
  } catch (err) {
    console.log("Search Filters Error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.createImages = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `Roitai${Date.now()}`,
      resource_type: 'auto',
      folder: 'Ecom2024'
    });
    return res.send(result);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.removeImages = async (req, res) => {
  try {
    const { public_id } = req.body;
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        return res.status(500).json({ message: "Cloudinary Error" });
      }
      return res.json({ message: 'Remove Image Success' });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};