import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

// signup controller 
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body 
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ username, email, password: hashedPassword })
  try {
    await newUser.save()
    res.status(201).json({ message: 'user created successfully' })
  } catch (err) {
    next(err)
  }
}

// signin controller 
export const signin = async (req, res, next) => {
  const { email, password } = req.body 
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'User not found'))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(401, 'Worng credentials'))
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET) // add token to browser cookie 
    const { password: hashedPassword, ...rest } = validUser._doc // don't send password to client 
    const expiryDate = new Date(Date.now() + 3600000) // add cookie expiry time (1 hour) 
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest)
  } catch (err) {
    next(err)
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) { // user exists 
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: hashedPassword, ...rest } = user._doc 
      const expiryDate = new Date(Date.now() + 3600000) // add cookie expiry time (1 hour) 
      res
        .cookie('access_token', token, { 
        httpOnly: true, 
        expires: expiryDate 
        })
        .status(200)
        .json(rest)
    }
    else { // no user found, create one 
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) // 16 character pasword 
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10) // hash password, salt = 10
      const newUser = new User({
        username: req.body.name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8), // remove space between first & last name, add random # at end 
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo
      })
      await newUser.save() // save to database 
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: hashedPassword2, ...rest } = newUser._doc // destructor & remove password 
      const expiryDate = new Date(Date.now() + 3600000) // 1 hour 
      res.cookie('access_token', token, {
        httpOnly: true, 
        expires: expiryDate
      }).status(200).json(rest)
    }
  } catch (err) {
    next(err)
  }
}

export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};