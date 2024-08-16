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
  profilePicture: {
    type: String,
    default: 'https://img.freepik.com/vecteurs-premium/illustration-vectorielle-plate-echelle-gris-profil-utilisateur-avatar-image-profil-personne-icone-convient-pour-profils-medias-sociaux-icones-economiseurs-ecran-comme-modelex9xa_719432-1230.jpg'
  }
}, {timestamps: true}) // automatically add created at & updated at timestamp to all transactions

// model 
const User = mongoose.model('User', userSchema)

export default User