import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'

// setup redux store 
export const store = configureStore({ 
  reducer: { // define slice (piece of state) reducers 
    user: userReducer 
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})