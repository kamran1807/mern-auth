import express from 'express'

// create instance of Express application
const app = express() 

// listen to port 
app.listen(3000, () => {
  console.log('server listening on port 3000')
})

