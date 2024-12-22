import { Link } from 'react-router-dom'
import img from '../../../public/dc_logo_white.png'
import { FiShoppingCart } from 'react-icons/fi'
import { FiSearch } from 'react-icons/fi'
import { CartContext } from '../../context/CartContext'
import { useContext } from 'react'
import { useCarrinho } from '../../context/CarrinhoContext';
import { useSearch } from '../../context/SeachContext'


export function Header() {
  const { abrirCarrinho } = useCarrinho();
  const { cartAmount } = useContext(CartContext); 
  const {input, setInput, handleSearchItem } = useSearch();


  return (
    <header className='w-full pr-3 sticky top-0 bg-footer shadow-md py-1'>
      <nav className='w-full max-w-7xl h-16 flex items-center justify-between px-2 mx-auto'>
        <Link to='/'>
          <img src={img} className='h-12 object-contain' alt="DC logo" />
        </Link>

        <section className='p-3 rounded-full  w-full max-w-3xl mx-auto flex justify-center items-center gap-2 relative border-none'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full border-2 rounded-full h-9 px-3 outline-none border-none'
            placeholder='Pesquisar'
          />

          <button className='absolute h-8 right-0 px-6' onClick={handleSearchItem}>
            <FiSearch size={22} color='#707070' />
          </button>
        </section>


        <div className='relative' onClick={() => abrirCarrinho()}>

          <FiShoppingCart size={24} color="#fff" />

          {cartAmount > 0 && (
            <span className='absolute -top-3 -right-3 px-2.5 bg-red rounded-full w-5 h-5 flex items-center justify-center text-white text-xs'>
              {cartAmount}
            </span>
          )}

        </div>
      </nav>
    </header>
  )
}