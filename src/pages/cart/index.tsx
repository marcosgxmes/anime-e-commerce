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
    <div className="w-full h-full flex flex-col max-w-7xl mx-auto px-7 py-6 items-center bg-gray">
      <h1 className="font-medium text-2xl text-center mb-8 text-colorTotal">Carrinho de compras</h1>

      {cart.length === 0 && (
        <div className='h-full flex flex-col gap-2 items-center'>
          <p className='font-medium mt-20'>Seu carrinho está vazio!</p>
          <Link
            className='bg-blue-600 my-3 py-2 px-8 text-white font-medium rounded-lg hover:bg-colorTotal'
            to="/">
            Ver Produtos
          </Link>
        </div>
      )}

      {cart.map((item) => (
        <section key={item.id}
          className="flex flex-col justify-items-start w-full max-w-5xl border mb-5 pb-1 border-gray-200 rounded-3xl bg-gray-50">

          <div className='flex justify-between py-2 w-full border-2 px-4 bg-white border-gray-200 rounded-3xl'>
            <div className='flex itens-center justify-center w-4/6'>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-28 p-2"
                />
              </Link>
            </div>


            <div className='w-full flex flex-col items-start justify-between gap-3'>
              <div className='flex flex-col gap-5'>
                <p className='font-bold text-lg'>{item.title}</p>
                <p className='text-sm'>Quantidade: {item.amount}</p>
                <p className='text-sm'>Criador: Akira Toriyama</p>
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
              className='p-1 flex items-center gap-1 text-colorTotal font-bold text-sm'
              onClick={() => deleteItemCart(item)}>
              Remover
              <BsTrash size={24} color='#004280' />
            </button>
          </div>
        </section>
      ))}



      {cart.length !== 0 && (
        <div className='w-full h-full max-w-5xl mt-2 flex flex-col justify-between items-center'>
          <div className='w-full flex items-center justify-between mb-6 border-t pt-2 border-border'>
            <p>Total a pagar :</p>
            <p className="font-bold text-right text-2xl text-verde">{total}</p>
          </div>

          <div className='flex gap-4  items-center justify-center'>
            <button className='flex bg-colorTotal w-full text-white rounded-xl items-center justify-center gap-2 py-4 px-4'>
              Continuar Comprando
            </button>

            <button className='bg-black w-full text-white rounded-xl flex items-center justify-center gap-2 py-7 px-4'>
              Pagar com Pix
              <FaPix size={20} color="#00bdae" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}