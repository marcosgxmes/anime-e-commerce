import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs'
import { CiCircleMinus } from 'react-icons/ci'
import { FaPix } from 'react-icons/fa6'
import { BsTrash } from 'react-icons/bs'

export function Cart() {
  const { cart, total, addItemCart, removeItemCart, deleteItemCart } = useContext(CartContext);

  return (
    <div className="w-full h-full flex flex-col max-w-7xl mx-auto px-5 py-10 items-center bg-white">
      <h1 className="w-full font-medium text-xl text-start mb-10 text-colorTotal border-b-2 border-gray-200">Seu carrinho</h1>

      {cart.length === 0 && (
        <div className='h-screen flex flex-col gap-2 items-center justify-center'>
          <p className='font-medium mt-20'>Ops... seu carrinho está vazio!</p>
          <Link
            className='bg-footer my-3 py-2 px-8 text-white font-medium rounded-xl hover:bg-colorTotal'
            to="/">
            Ver Produtos
          </Link>
        </div>
      )}

      {cart.map((item) => (
        <section key={item.id}
          className="flex flex-col justify-items-start w-full md:w-4/6 border mb-5 pb-1 border-gray-200 rounded-3xl bg-gray-50">

          <div className='flex justify-between py-2 w-full border-2 px-4 gap-2 bg-white border-gray-200 rounded-3xl'>
            <div className='flex itens-center justify-center w-4/6'>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-28 p-2"
                />
              </Link>
            </div>


            <div className='w-full  flex flex-col items-start justify-between gap-3'>
              <div className='flex flex-col justify-between gap-5 h-full'>
                <p className='font-bold text-lg'>{item.title}</p>
                <div className='text-sm font-medium'>                  
                  <p>Quantidade: {item.amount}</p>
                  <p>Criador: {item.creator}</p>
                </div>               
              </div>

              <div className='w-full flex items-center justify-between border-t border-border pt-2'>
                <strong className="float-right text-colorTotal text-lg font-roboto">
                  {item.total.toLocaleString("pt-BR", {
                    style: 'currency',
                    currency: "BRL"
                  })}
                </strong>
              </div>

            </div>
          </div>

          <div className='flex items-center justify-between p-2 px-4 text-sm '>
            <div className="flex items-center justify-center gap-2 px-2 rounded-md font-robot">
              <button
                onClick={() => removeItemCart(item)}
                className="p-1 rounded-md font-medium flex item-center justify-center">
                <CiCircleMinus size={28} color='#333' />
              </button>

              {item.amount}

              <button
                onClick={() => addItemCart(item)}
                className="p-1 rounded-md text-white font-medium flex item-center justify-center">
                <BsPlusCircle size={24} color="#333" />
              </button>
            </div>

            <button
              className='p-1 flex items-center gap-1 text-footer font-bold text-sm'
              onClick={() => deleteItemCart(item)}>
              
              <BsTrash size={24} color='#3259eb' />
            </button>
          </div>
        </section>
      ))}



      {cart.length !== 0 && (
        <div className='w-full h-full max-w-5xl mt-4 flex flex-col justify-between items-center'>
          <div className='w-full flex items-center justify-between mb-6 border-t pt-1 border-border'>
            <p>Total a pagar :</p>
            <p className="font-bold text-right text-2xl text-verde">{total}</p>
          </div>

          <div className='flex gap-4 w-full items-center justify-center'>
            <button className='flex w-full bg-white text-footer border border-footer hover:bg-footer hover:text-white rounded-xl items-center justify-center gap-2 p-4'>
              Continuar
            </button>

            <button className='bg-black w-full text-white rounded-xl flex items-center justify-center gap-2 p-4'>
              Pix
              <FaPix size={20} color="#00bdae" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}