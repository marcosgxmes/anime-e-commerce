import { Link } from 'react-router-dom'
import img from '../../../public/dc_circle.png'
import { FiShoppingCart } from 'react-icons/fi'
import { FiSearch, FiUser } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import { useCarrinho } from '../../context/CarrinhoContext';
import { useSearch } from '../../context/SeachContext'


export function Header() {
  const { abrirCarrinho } = useCarrinho();
  const { cartAmount } = useContext(CartContext);
  const { input, setInput, handleSearchItem } = useSearch();


  return (
    <header className='w-full z-10 sticky top-0 bg-footer shadow-black shadow-md'>
      <nav className='w-full max-w-7xl min-h-16 flex items-center justify-between mx-auto'>

        
        <div className='w-full flex items-center justify-between px-3'>

          {/* LOGO */}
          <Link to='/' className='flex gap-x-2'>
            <img src={img} className='max-w-12 w-full object-contain' alt="DC logo" />
          </Link>

          {/* INPUT */}
          {/* <section className='relative px-4 py-2 w-full max-w-3xl mx-auto flex justify-center items-center'>

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='w-full rounded-md h-9 px-3 outline-none border-none'
              placeholder='Pesquisar'
            />

            <button className='absolute h-8 right-0 pr-6' onClick={handleSearchItem}>
              <FiSearch size={22} color='#707070' />
            </button>
          </section> */}


          {/* ICONS */}
          <div className='flex items-center justify-between gap-3.5'>
            <Link to="/login">
              <FiSearch size={24} color="#fff" />
            </Link>

            <Link to="/login">
              <FiUser size={24} color="#fff" />
            </Link>

            <div className='relative' onClick={() => abrirCarrinho()}>
              <FiShoppingCart size={24} color="#fff" />
              {cartAmount > 0 && (
                <span className='absolute -top-3 -right-2 px-2.5 bg-red rounded-full w-5 h-5 flex items-center justify-center text-white text-xs'>
                  {cartAmount}
                </span>
              )}
            </div>
          </div>

        </div>

      </nav>
    </header>
  )
}