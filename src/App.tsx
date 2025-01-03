
import { createBrowserRouter } from 'react-router-dom'

//PAGINAS
import { Home } from './pages/home'
import { ProductDetail } from './pages/detail'

//COMPONENTES
import { Layout } from './components/layout'

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
      }
    ]
  }
])

export { router };
