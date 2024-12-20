import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'

//  CHAMANDO CONFIGURAÇÕES DE ROTA
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'

import CartProvider from './context/CartContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
