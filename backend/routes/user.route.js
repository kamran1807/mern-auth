import express from 'express' 
import { test, updateUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router() 

// API route
router.get('/', test)

// update profile 
router.post('/update/:id', verifyToken, updateUser)

export default router