import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'

//  CHAMANDO CONFIGURAÇÕES DE ROTA
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'

import CartProvider from './context/CartContext.tsx'
import { CarrinhoProvider } from './context/CarrinhoContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <CarrinhoProvider>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
        <RouterProvider router={router} />
      </CarrinhoProvider>
    </CartProvider>
  </StrictMode>,
)
