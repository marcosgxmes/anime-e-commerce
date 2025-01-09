import { Outlet } from 'react-router-dom'
import { Footer } from '../footer'
import { Cart } from '../../pages/cart/index'

export function Layout(){
  return(
    <>
      <Cart />
      <Outlet /> 
      <Footer />
    </>
  )
}