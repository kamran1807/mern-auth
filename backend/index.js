import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'

// initialize dotenv
dotenv.config()

// database connection string 
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

// create instance of Express application
const app = express() 

// allows parsing of incoming JSON requests
app.use(express.json())

// allows parsing of cookies 
app.use(cookieParser())

// listen to port 
app.listen(3000, () => {
  console.log('server listening on port 3000')
})


// routes 
app.use('/api/user', userRoutes) // http://localhost:3000/api/user/
app.use('/api/auth', authRoutes)


// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false, 
    message,
    statusCode
  })
})