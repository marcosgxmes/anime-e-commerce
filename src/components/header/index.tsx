// LINK PARA NAVEGAÇÃO
import { Link } from 'react-router-dom'
import img from '../../../public/dc_logo_white.png'
// ICONES DO REACT
import { FiShoppingCart } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'

// CONTEXT
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'

export function Header() {
  const { cartAmount } = useContext(CartContext)

  return (
    <header className='w-full p-1 bg-footer'>
      <nav className='w-full max-w-7xl h-16 flex items-center justify-between px-3 mx-auto'>
        <Link to='/'>
          <img src={img} className='h-14 object-contain' alt="DC logo" />
        </Link>

        <section className='p-3 rounded-full  w-full max-w-3xl mx-auto flex justify-center items-center gap-2 relative border-none'>
          <input 
          className='w-full border-2 rounded-full h-8 px-3 outline-none border-none'
            placeholder='Pesquisar'
          />

          <button className='absolute h-8 right-0 px-8'>
              <FiSearch size={22} color='#333' />
          </button>
        </section>

        <Link className='relative' to='/cart'>
        <FiShoppingCart size={24} color="#fff" />
          {cartAmount > 0 && (
            <span className='absolute -top-3 -right-3 px-2.5 bg-red-600/100 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs'>
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  )
}