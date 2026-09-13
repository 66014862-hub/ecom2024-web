// ต้องอยู่บรรทัดแรกสุดเสมอ!
require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

const authRouter = require('./routes/auth')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const stripeRouter = require('./routes/stripe')

app.use(morgan('dev'))
app.use(express.json({ limit: '20mb' }))
app.use(cors())

app.use('/api', authRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.use('/api', userRouter)
app.use('/api', adminRouter)
app.use('/api', stripeRouter)

app.listen(5001, () => console.log('Server is running on port 5001'))