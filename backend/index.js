import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRoutes from './routes/user.route.js'

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

// listen to port 
app.listen(3000, () => {
  console.log('server listening on port 3000')
})


// user routes 
app.use('/api/user', userRoutes) // http://localhost:3000/api/user/