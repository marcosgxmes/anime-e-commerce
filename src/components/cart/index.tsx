import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs'
import { CiCircleMinus } from 'react-icons/ci'
import { FaPix } from 'react-icons/fa6'
import { BsTrash } from 'react-icons/bs'

export function Cart() {
  const { cart, total, addItemCart, removeItemCart, deleteItemCart, cartAmount } = useContext(CartContext);

  return (
    <div className="w-full hidden h-screen fixed backdrop-blur-sm border-2 border-red"
    style={{ display: cartAmount > 0 ? "flex" : "none"}} >

      <div className="w-full bg-black opacity-60">
      </div>

      <div className="absolute right-0 top-0 w-full h-full flex flex-col max-w-lg rounded-l-3xl px-11 items-center justify-between bg-white opacity-200 ease-in duration-300 z-4">

        <h1 className="w-full font-medium text-xl text-start m-6 text-footer border-b-2 border-gray-200">Seu carrinho</h1>
        
        {cart.length === 0 && (
          <div className='h-full flex flex-col gap-2 items-center justify-center'>
            <p className='font-medium mt-20'>O seu carrinho de compras
            está vazio</p>
            <Link
              className='bg-footer my-3 py-2 px-8 text-white font-medium  hover:bg-colorTotal'
              to="/">
              Ver Produtos
            </Link>
          </div>
        )}

        {cart.map((item) => (
          <section key={item.id}
            className="flex flex-col justify-items-start w-full border m-4 border-gray-200 rounded-3xl bg-gray-50">

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

              <div className='w-full  flex flex-col items-start justify-between pt-1 gap-3'>
                <div className='flex flex-col justify-between gap-5 h-full'>
                  <p className='font-bold text-sm'>{item.title}</p>
                  <div className='text-sm font-medium'>
                    <p>Quantidade: {item.amount}</p>
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

            <div className='flex items-center justify-between p-2 px-2 text-sm '>
              <div className="flex items-center justify-center gap-2 px-2 rounded-md font-robot">
                <button
                  onClick={() => removeItemCart(item)}
                  className="p-1 rounded-md  flex item-center justify-center">
                  <CiCircleMinus size={30} color='#333' />
                </button>
                {item.amount}
                <button
                  onClick={() => addItemCart(item)}
                  className="p-1 rounded-md flex item-center justify-center">
                  <BsPlusCircle size={25} color="#333" />
                </button>
              </div>
              <button
                className='p-1 flex items-center gap-1 text-blue-600 font-bold text-sm'
                onClick={() => deleteItemCart(item)}>
                Remover
                <BsTrash size={24} color='#3259eb' />
              </button>
            </div>
          </section>
        ))}


        {cart.length !== 0 && (
          <div className='w-full max-w-5xl mt-5 flex flex-col justify-between items-center'>

            <div className='w-full flex items-center justify-between mb-6 border-t pt-2 border-border'>
              <p>Total a pagar :</p>
              <p className="font-bold text-right text-2xl text-verde">{total}</p>
            </div>


            <div className='flex gap-4 w-full items-center justify-center'>
              <Link className='flex w-full bg-white text-footer border border-footer hover:bg-footer hover:text-white rounded-xl items-center justify-center gap-2 p-4' to="/">
                <button>
                  Continuar Comprando
                </button>
              </Link>

              <button
                className='bg-black w-full text-white rounded-xl flex items-center justify-center gap-2 p-4'>
                Pagar com Pix
                <FaPix size={20} color="#00bdae" />
              </button>
            </div>

          </div>
        )}
      </div>
    </div>

  )
}