
/* eslint-disable prefer-const */
import { useEffect, useState, useContext } from 'react'
import { BsCart } from 'react-icons/bs'

//import { api } from '../../services/api'
import { CartContext } from '../../context/CartContext'

import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import {
  collection,
  //query,
  getDocs,
} from 'firebase/firestore'

import { db } from '../../services/api'


export interface ProductsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  creator?: string;
}

export function Home() {

  const [products, setProducts] = useState<ProductsProps[]>([])
  const [quadrinhos, setQuadrinhos] = useState<ProductsProps[]>([])

  const { addItemCart } = useContext(CartContext)

  // CHAMANDO ARRAY DE PRODUTOS E SETANDO NO USESTATE
  useEffect(() => {
    async function getProducts() {
      const mangasRef = collection(db, "mangas")

      getDocs(mangasRef)
        .then((snapshot) => {
          let listMangas = [] as ProductsProps[]

          snapshot.forEach(doc => [
            listMangas.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              price: doc.data().price,
              cover: doc.data().cover,
              creator: doc.data().creator

            })
          ])

          setProducts(listMangas)
        })
    }

    getProducts()
  }, [])

  useEffect(() => {
    async function getProducts() {
      const comicRef = collection(db, "quadrinhos")

      getDocs(comicRef)
        .then((snapshot) => {
          let listComic = [] as ProductsProps[]

          snapshot.forEach(doc => [
            listComic.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              price: doc.data().price,
              cover: doc.data().cover,
              creator: doc.data().creator

            })
          ])

          setQuadrinhos(listComic)
        })
    }

    getProducts()
  }, [])

  // MENSAGEM DE ADICIONADO COM SUCESSO
  function handleAddCartItem(product: ProductsProps) {
    toast.success("Adicionado com sucesso", {
      style: {
        backgroundColor: "#000",
        color: "#32DE8A",
        borderRadius: 10,
      }
    })
    addItemCart(product)
  }

  return (
    <div className='bg-slate-200 pb-10'>
      <main className="w-full max-w-7xl px-3 mx-auto">
        <h1 className="font-medium text-xl mb-2 py-6 text-center text-header">Mais Vendidos</h1>

        <div className='grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-5 justify-evenly px-2'>
          {products.map((product) => (
            <section key={product.id} className="w-full flex flex-col justify-between">
              <Link to={`/product/${product.id}`}>
                <div className='flex items-center h-trezentos justify-center bg-white  rounded-md mb-4 py-6 px-4 shadow-sm'>
                  <img
                    className='h-48 sm:h-60 object-contain'
                    src={product.cover}
                    alt={product.title}
                  />
                </div>
                <p className='font-medium text-sm mb-3 text-color'>{product.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-left justify-center'>
                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button
                  className='w-full bg-verde rounded-md flex justify-center items-center gap-2 py-2 px-4 text-white font-bold text-sm hover:bg-green-700'
                  onClick={() => handleAddCartItem(product)}>
                  <BsCart size={20} color='#ffffff' /> Adicionar
                </button>
              </div>
            </section>
          ))}

        </div>

        <h1 className="font-medium text-xl mb-2 mt-6 py-6 text-center text-header">Mangás</h1>

        <div className='grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-5 justify-evenly px-2 rounded-md'>
          {quadrinhos.map((product) => (
            <section key={product.id} className="w-full flex flex-col justify-between">
              <Link to={`/product/${product.id}`}>
                <div className='flex items-center h-trezentos justify-center bg-white  rounded-md mb-4 py-6 px-4 shadow-sm'>
                  <img
                    className='h-44 sm:h-60 object-contain'
                    src={product.cover}
                    alt={product.title}
                  />
                </div>
                <p className='font-medium text-sm mb-3 text-color'>{product.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-left justify-center'>
                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button
                  className='w-full bg-verde rounded-md flex justify-center items-center gap-2 py-2 px-4 text-white font-bold text-sm hover:bg-green-600'
                  onClick={() => handleAddCartItem(product)}>
                  <BsCart size={20} color='#ffffff' /> Adicionar
                </button>
              </div>
            </section>
          ))}

        </div>
      </main>
    </div>
  )
}

