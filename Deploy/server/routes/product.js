const express = require('express')
const router = express.Router()

// 1. Import ทุกฟังก์ชันจาก controllers/product.js (ใช้ removeImages มี s)
const { 
  create,
  list,
  read,
  update,
  remove,
  listBy,
  searchFilters,
  createImages,
  removeImages
} = require('../controllers/product')

// 2. Import Middlewares
const { authCheck, adminCheck } = require('../middlewares/authCheck')

// Product Routes
router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.put('/product/:id', update)
router.delete('/product/:id', remove)
router.post('/productby', listBy)
router.post('/search/filters', searchFilters)

// Image Routes (ใส่ authCheck, adminCheck ด้วย หรือจะถอดออกก่อนก็ได้ครับ)
router.post('/images', createImages)
router.post('/removeimages', removeImages)

module.exports = router