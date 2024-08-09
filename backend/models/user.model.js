import mongoose from 'mongoose'

// schema 
const userSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true,
    unique: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
  },
}, {timestamps: true}) // automatically add created at & updated at timestamp to all transactions

// model 
const User = mongoose.model('User', userSchema)

export default User