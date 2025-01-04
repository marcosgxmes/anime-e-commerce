import { Outlet } from 'react-router-dom'
import { Footer } from '../footer'
import { Cart } from '../cart'

export function Layout(){
  return(
    <>
      <Cart />
      <Outlet /> 
      <Footer />
    </>
  )
}