import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs'
import { CiCircleMinus } from 'react-icons/ci'
import { BsTrash } from 'react-icons/bs'

export function Cart() {
  const { cart, total, addItemCart, removeItemCart, deleteItemCart } = useContext(CartContext);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-slate-200">
      <h1 className="font-medium text-2xl text-center">Carrinho</h1>


      {cart.length === 0 && (
        <div className='flex flex-col items-center justify-center'>
          <p className='font-medium'>Ops... seu carrinho está vazio!</p>
          <Link
            className='bg-blue-600 my-3 p-1 px-3 text-white font-medium rounded hover:bg-colorTotal'
            to="/">
            Comprar agora
          </Link>
        </div>
      )}

      {cart.map((item) => (
        <section
          key={item.id}
          className="flex items-center justify-between border-b-2 mb-3 border-gray-300">

          <div className='flex items-center justify-between gap-4 p-2 w-full'>
            <Link to={`/product/${item.id}`}>
              <img
                src={item.cover}
                alt={item.title}
                className="w-28 mb-1"
              />
            </Link>


            <div className='w-full flex flex-col gap-5'>
              <div >
                <p className='font-bold'>{item.title}</p>
              </div>

              <div className='flex  items-center gap-3'>
                <div className="flex items-center justify-center gap-3 border-solid border p-2 rounded-md font-roboto bg-white">
                  <button
                    onClick={() => removeItemCart(item)}
                    className="p-1 rounded-md font-medium flex item-center justify-center">
                    <CiCircleMinus size={26} color='#333' />
                  </button>
                  {item.amount}
                  <button
                    onClick={() => addItemCart(item)}
                    className="p-1 rounded-md text-white font-medium flex item-center justify-center">
                    <BsPlusCircle size={22} color="#333" />
                  </button>
                </div>
                
                <button
                  className='p-1 flex items-center justify-center gap-2 text-colorTotal'
                  onClick={() => deleteItemCart(item)}>
                  
                  <BsTrash size={20} color='#004280' />
                  Remover
                </button>
              </div>

              <strong className="float-right text-colorTotal text-lg">
              {item.total.toLocaleString("pt-BR", {
                style: 'currency',
                currency: "BRL"
              })}
            </strong>
            </div>

            
          </div>


        </section>
      ))}

      {cart.length !== 0 && (
        <div className='w-full mt-4 flex justify-between items-center'>
          <p>Total a pagar :</p>
          <p className="font-bold text-right text-2xl text-verde">{total}</p>
        </div>
      )}
    </div>
  )
}