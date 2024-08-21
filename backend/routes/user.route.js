import express from 'express' 
import { test, updateUser, deleteUser } from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router() 

// API route
router.get('/', test)

// update profile 
router.post('/update/:id', verifyToken, updateUser)

// delete user
router.delete('/delete/:id', verifyToken, deleteUser)

export default router