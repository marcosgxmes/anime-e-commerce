import { Outlet } from 'react-router-dom'
import { Header } from '../header'
import { Footer } from '../footer'
import { Cart } from '../cart'

export function Layout(){
  return(
    <>
      <Header />
      <Cart />
      <Outlet /> 
      <Footer />
    </>
  )
}