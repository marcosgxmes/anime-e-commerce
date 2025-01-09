
import { createBrowserRouter } from 'react-router-dom'

//PAGINAS
import { Home } from './pages/home'
import { ProductDetail } from './pages/detail'

//COMPONENTES
import { Layout } from './components/layout'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Cart } from './pages/cart'

// ROTAS (REACT ROUTER DOM)
const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/product/:id",
        element: <ProductDetail />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {path: "/cart",
        element: <Cart />
      }
    
    ]
  }
])

export { router };
