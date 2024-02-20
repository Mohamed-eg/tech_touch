'use client'
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categoriesSlice';
import { wishListReducer } from './slices/wishListSlice';
import { searchReducer } from './slices/searchSlice';
import { cartReducer } from './slices/productsSlice';
import { userReduser } from './slices/userSlice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  // FLUSH,
  // REHYDRATE,
  // PAUSE,
  // PERSIST,
  // PURGE,
  // REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)
const persistedwishReducer = persistReducer(persistConfig, wishListReducer)
const persistedSearchReducer = persistReducer(persistConfig, searchReducer)
const persistedUser = persistReducer(persistConfig, userReduser)


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    wishList: persistedwishReducer,
    products: persistedReducer,
    searchList: persistedSearchReducer,
    user: persistedUser,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export const persistor = persistStore(store)