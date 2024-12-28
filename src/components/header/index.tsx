import { Link } from 'react-router-dom'
import img from '../../../public/dc_circle.png'
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
    <header className='w-full pr-2 z-10 sticky top-0 bg-footer shadow-xl py-1'>
      <nav className='w-full max-w-7xl md:max-w-6xl min-h-16 flex items-center justify-between pr-2 pl-2 mx-auto'>
        <Link to='/'>
          <img src={img} className='h-14 w-16 object-contain' alt="DC logo" />
        </Link>

        <section className='relative rounded-xl pl-2.5 pr-3  w-full max-w-3xl mx-auto flex justify-center items-center gap-2  border-none'>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full border-2 rounded-xl h-9 px-4 outline-none border-none'
            placeholder='Pesquisar'            
          />

          <button className='absolute h-8 right-0 pr-6' onClick={handleSearchItem}>
            <FiSearch size={22} color='#707070' />
          </button>
        </section>

        
        <div className='relative' onClick={() => abrirCarrinho()}>

          <FiShoppingCart size={24} color="#fff" />

          {cartAmount > 0 && (
            <span className='absolute -top-3 -right-2 px-2.5 bg-red rounded-full w-5 h-5 flex items-center justify-center text-white text-xs'>
              {cartAmount}
            </span>
          )}

        </div>
      </nav>
    </header>
  )
}