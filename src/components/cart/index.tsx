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
    <div className='fixed top-0 left-0 right-0 z-20' >

      <div
        onClick={() => fecharCarrinho()}
        className={`${!carrinhoAberto && "hidden"} bg-gray-700/80 min-h-screen w-full fixed top-0 left-0  backdrop-blur-sm`}>
      </div>

      <div className={`${carrinhoAberto ? "-translate-x-0" : "translate-x-full"} min-h-screen fixed w-full md:w-3/6 top-0 right-0 transform  transition-all duration-500 ease-in-out`}>

        <div className={`transition-all duration-500 w-full`}>
        <div className="fixed inset-0 overflow-hidden ">
          <div className="absolute inset-0 overflow-hidden ">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
              <div
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >

                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl sm:rounded-l-3xl">
                  <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">

                    <div className="flex w-full items-start justify-between border-b-2 pb-1.5 border-grayText">

                      <p className="text-lg font-medium">Carrinho de compras</p>

                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => fecharCarrinho()}
                          className="relative -m-2 p-2 text-purple"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <IoClose aria-hidden="true" size={27} />
                        </button>
                      </div>
                    </div>


                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y">

                          {cart.length === 0 && (
                            <div className='h-full flex flex-col mt-20 items-center justify-between '>
                              
                              <img src={dc_logo} className='h-44 object-contain my-5' alt="DC Logo" />
                              <p className='font-medium mt-4 mb-2'>Ops... seu carrinho está vazio!</p>

                              <Link
                                className='flex items-center justify-center h-12 bg-gradient-to-t from-purple to-cleanPurple  my-3 px-10 text-white font-medium  rounded-2xl hover:bg-none hover:bg-purple'
                                to="/"
                                onClick={() => fecharCarrinho()}>
                                Continuar Comprando
                              </Link>
                            </div>
                          )}
                          

                          {cart.map((item) => (
                            <section
                              key={item.id}
                              className="flex flex-col justify-items-start w-full my-5 border border-grayText  rounded-3xl bg-gray-50">

                              
                              <div className='h-full flex justify-between gap-x-2 p-1 bg-white border border-grayText rounded-3xl overflow-hidden'>

                                <div className='flex itens-center justify-center w-3/6 p-2'>
                                  <Link to={`/product/${item.id}`}>
                                    <img
                                      src={item.cover}
                                      alt={item.title}
                                      className="object-contain w-full rounded-sm"
                                    />
                                  </Link>
                                </div>


                                <div className='w-full flex flex-col items-start justify-between pr-2'>
                                  <div className='flex flex-col justify-between gap-4 h-full pt-2'>
                                    <p className='font-bold text-md'>{item.title}</p>
                                    <div className='text-sm text-texts font-medium'>
                                      <p>Quantidade: {item.amount}</p>
                                      <p>Autor: {item.creator}</p>
                                    </div>
                                  </div>
                                  
                                  <div className='w-full flex border-t border-grayText pt-2 mt-1'>
                                    <strong className="float-right text-lg font-Roboto">
                                      {item.total.toLocaleString("pt-BR", {
                                        style: 'currency',
                                        currency: "BRL"
                                      })}
                                    </strong>
                                  </div>

                                </div>
                              </div>

                              <div className='flex items-center justify-between px-3 py-1.5'>
                                <div className="flex items-center justify-center gap-2 rounded-md text-dark">
                                  <button
                                    onClick={() => removeItemCart(item)}
                                    className="p-1 rounded-md  flex item-center justify-center">
                                    <CiCircleMinus size={30} color='#607D8B' />
                                  </button>
                                  {item.amount}
                                  <button
                                    onClick={() => addItemCart(item)}
                                    className="p-1 rounded-md flex item-center justify-center">
                                    <BsPlusCircle size={24} color="#607D8B" />
                                  </button>
                                </div>

                                <button
                                  className='p-1 flex items-center gap-1 text-purple font-medium text-sm'
                                  onClick={() => deleteItemCart(item)}
                                >
                                   Excluir                           
                                  <BsTrash size={24}  />
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
                        <p className='text-md font-bold'>Subtotal</p>
                        <p className='text-price text-lg font-bold font-Roboto'>{total}</p>
                      </div>

                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm gap-3  hover:scale-105 transition-all"
                        >
                          Pagar com Pix
                          <FaPix size={24} color="#00bdae" />
                        </a>
                      </div>

                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p className='text-texts'>
                          ou{' '}
                          <button
                            type="button"
                            onClick={() => fecharCarrinho()}
                            className="font-medium text-purple"
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

    </div>

  )
}