import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs'
import { CiCircleMinus } from 'react-icons/ci'
import { FaPix } from 'react-icons/fa6'
import { BsTrash } from 'react-icons/bs'
import { IoClose } from "react-icons/io5";
import dc_logo from '../../../public/dc_logo.png'

import { useCarrinho } from '../../context/CarrinhoContext';


export function Cart() {
  const {
    cart,
    total,
    cartAmount,
    addItemCart,
    removeItemCart,
    deleteItemCart,
  } = useContext(CartContext);

  const { carrinhoAberto, fecharCarrinho } = useCarrinho();


  return (
    <div className="relative z-10"
      style={{ display: carrinhoAberto == true ? "block" : "none" }}
    >

      <div className='fixed inset-0 bg-gray-800/75 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"'>

        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden ">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
              <div
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >

                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl sm:rounded-l-3xl">
                  <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">

                    <div className="flex w-full items-start justify-between border-b-2 pb-1 ">

                      <p className="text-lg font-medium text-gray-900">Carrinho de compras</p>

                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => fecharCarrinho()}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <IoClose aria-hidden="true" size={27} color='#3259eb' />
                        </button>
                      </div>

                    </div>



                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">

                          {cart.length === 0 && (
                            <div className='h-full flex flex-col gap-2 mt-10 items-center justify-center'>
                              <img src={dc_logo} className='h-44 object-contain mt-16' alt="DC Logo" />

                              <p className='font-medium mt-5'>O seu carrinho está vazio!</p>
                              <Link
                                className='bg-azul my-3 py-2 px-8 text-white font-medium hover:scale-105 transition-all rounded'
                                to="/"
                                onClick={() => fecharCarrinho()}>
                                Ver produtos
                              </Link>
                            </div>
                          )}

                          {cart.map((item) => (
                            <section
                              key={item.id}
                              className="flex flex-col justify-items-start w-full border my-5 border-gray-200 rounded-3xl bg-gray-50">

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
                                    <p className='font-medium text-sm'>{item.title}</p>
                                    <div className='text-sm text-color font-medium'>
                                      <p>Quantidade: {item.amount}</p>
                                      <p>Autor: {item.creator}</p>
                                    </div>
                                  </div>
                                  <div className='w-full flex items-center justify-between border-t border-border pt-2'>
                                    <strong className="float-right text-black text-lg font-roboto">
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
                                  className='p-1 flex items-center gap-1 text-azul font-bold text-sm'
                                  onClick={() => deleteItemCart(item)}>
                                  Excluir
                                  <BsTrash size={24} color='#3259eb' />
                                </button>
                              </div>
                            </section>
                          ))}

                        </ul>
                      </div>
                    </div>
                  </div>

                  {cartAmount !== 0 && (
                    <div className=" px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p className='text-md'>Subtotal</p>
                        <p className='text-verde text-lg'>{total}</p>
                      </div>

                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-azul px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-black gap-2  hover:scale-105 transition-all"
                        >
                          Pagar com Pix
                          <FaPix size={20} color="#00bdae" />
                        </a>
                      </div>

                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          ou{' '}
                          <button
                            type="button"
                            onClick={() => fecharCarrinho()}
                            className="font-medium text-azul hover:text-black"
                          >
                            Continue Comprando
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}