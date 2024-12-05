import { useEffect, useState, useContext } from 'react'
import { BsCart } from 'react-icons/bs'

import { api } from '../../services/api'
import { CartContext } from '../../context/CartContext'

import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export interface ProductsProps {
  id: number;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home() {

  const [products, setProducts] = useState<ProductsProps[]>([])
  const { addItemCart } = useContext(CartContext)

  useEffect(() => {
    // CHAMANDO ARRAY DE PRODUTOS E SETANDO NO USESTATE
    async function getProducts() {
      const response = await api.get("/products")
      setProducts(response.data)
    }

    getProducts()
  }, [])

  function handleAddCartItem(product: ProductsProps) {
    toast.success("Adicionado ao carrinho", {
      style: {
        backgroundColor: "#000",
        color: "#FFF",
        borderRadius: 17
      }
    })
    addItemCart(product)
  }

  return (
    <div className='bg-slate-200 pb-6'>
      <main className="w-full max-w-7xl px-2 mx-auto">
        <h1 className="font-bold text-2xl mb-2 py-6 text-center text-color">MAIS VENDIDOS</h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 justify-evenly bg-white p-6 rounded-md'>
          {products.map((product) => (
            <section key={product.id} className="w-full flex flex-col justify-between">
              <Link to={`/product/${product.id}`}>
                <img
                  className='w-full rounded-lg max-h-70 mb-2'
                  src={product.cover}
                  alt={product.title} />
                <p className='font-medium mb-3'>{product.title}</p>
              </Link>

              <div className='flex gap-3 items-center'>
                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button
                  className='bg-green-500 p-1 rounded-lg flex gap-2 py-2 px-4 text-white font-bold hover:bg-green-600' 
                  onClick={() => handleAddCartItem(product)}>
                  <BsCart size={20} color='#ffffff'/> Adicionar
                </button>
              </div>
            </section>
          ))}
        </div>

        <h1 className="font-bold text-2xl mb-6 mt-12 text-center text-color">DESTAQUES PARA VOCÊ</h1>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 justify-evenly  bg-white p-6 rounded-sm'>
          {products.map((product) => (
            <section key={product.id} className="w-full flex flex-col justify-between ">
              <Link to={`/product/${product.id}`}>
                <img
                  className='w-full rounded-lg max-h-70 mb-2'
                  src={product.cover}
                  alt={product.title} />
                <p className='font-medium mb-3'>{product.title}</p>
              </Link>

              <div className='flex gap-3 items-center'>
                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button
                  className='bg-green-500 p-1 rounded-lg flex gap-2 py-2 px-4 text-white font-bold hover:bg-green-600' 
                  onClick={() => handleAddCartItem(product)}>
                  <BsCart size={20} color='#ffffff'/> Adicionar
                </button>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

