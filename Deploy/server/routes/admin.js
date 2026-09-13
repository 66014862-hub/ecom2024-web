const express = require('express')
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const router = express.Router()

const { getOrderAdmin, changeOrderStatus } = require('../controllers/admin')

// เติม adminCheck เพื่อป้องกันไม่ให้ User ทั่วไปเข้าถึง
router.put('/admin/order-status', authCheck, adminCheck, changeOrderStatus);
router.get('/admin/orders', authCheck, adminCheck, getOrderAdmin);

module.exports = router