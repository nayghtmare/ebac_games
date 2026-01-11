import { configureStore } from '@reduxjs/toolkit'
import carrinhoReducer from './storeCarrinho'
import favoritosReducer from './storeFavoritos'
import { produtosApi } from './services/produtosApi'

export const store = configureStore({
  reducer: {
    carrinho: carrinhoReducer,
    favoritos: favoritosReducer,
    [produtosApi.reducerPath]: produtosApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(produtosApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
