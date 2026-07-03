import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'

//  CHAMANDO CONFIGURAÇÕES DE ROTA
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'

import CartProvider from './context/CartContext.tsx'
import { CarrinhoProvider } from './context/CarrinhoContext.tsx'
import {SearchProvider} from './context/SeachContext.tsx'
import AuthProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
      <CarrinhoProvider>
        <SearchProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          {/* RouterProvider seria o children que esta dentro do AuthProvider */}
          <RouterProvider router={router} />
        </SearchProvider>
      </CarrinhoProvider>
    </CartProvider>
    </AuthProvider>
    
  </StrictMode>,

  //DEPOIS DAQUI TEM QUE PROTEGER AS ROUTAS, NA PASTA ROUTES DENTRO DE SRC
  
)


