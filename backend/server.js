const express=require('express')
const dotenv=require('dotenv')
const colors =require('colors')
const connectDB =require('./config/db')
const router =require('./routes/productRoutes')
const notFound=require('./middleware/errorMiddleware')
const errorHandler=require('./middleware/errorMiddleware')
const userRoutes =require('./routes/userRouters')
const orderRoutes =require('./routes/orderRoutes')

dotenv.config()

connectDB()

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('API is running...')
})

app.use('/api/products',router)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT =process.env.PORT || 5000

app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))