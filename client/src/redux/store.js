import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // for saving data in browser localStorage

// combine reducers 
const rootReducer = combineReducers({
  user: userReducer
})

// persist config & localStorage key
const persistConfig = {
  key: 'root',
  version: 1, 
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// setup redux store 
export const store = configureStore({ 
  reducer: persistedReducer, // define slice (piece of state) reducers 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
})

// export persisted store 
export const persistor = persistStore(store)