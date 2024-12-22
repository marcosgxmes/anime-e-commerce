/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react'
import { BsCart } from 'react-icons/bs'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { db } from '../../services/api'
import {
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore'

import { useSearch } from '../../context/SeachContext'



export interface ProductsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  creator?: string;
}


export function Home() {

  const { quadrinhos, setQuadrinhos} = useSearch();
  
 
  const [loadImages, setLoadImages] = useState<string[]>([])
  const { addItemCart } = useContext(CartContext)

  
  // CHAMANDO PRODUTOS DO DATABASE
  useEffect(() => {
    getProducts()
  }, [])  

  async function getProducts() {
    const comicRef = collection(db, "quadrinhos")
    const queryRef = query(comicRef, orderBy("id", "asc"))

    getDocs(queryRef)
      .then((snapshot) => {
        // eslint-disable-next-line prefer-const
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


  // EVITAR LAYOUT SHIFT
  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id])
  }


  // MENSAGEM DE ADICIONADO COM SUCESSO
  function handleAddCartItem(product: ProductsProps) {
    toast.success("Adicionado com sucesso", {
      style: {
        backgroundColor: "#000",
        color: "#FFF",
        borderRadius: 15,
      }
    })
    addItemCart(product)
  }  


  return (
    <div className='bg-background pb-10'>
      <main className="w-full max-w-7xl px-3 mx-auto">

        <h1 className="font-medium text-xl py-6 text-center text-header">Destaques</h1>

        <div className='grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5 justify-evenly px-2'>

          {quadrinhos.map(product => (
            <div
              className='w-full h-72 rounded-md bg-white'
              style={{ display: loadImages.includes(product.id) ? "none" : "block" }}
            >
            </div>
          ))}


          {quadrinhos.map(product => (
            <section key={product.id} className="w-full flex flex-col justify-between gap-4">

              <Link className=' flex flex-col gap-1' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center rounded-md p-2'>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all'
                    src={product.cover}
                    alt={product.title}
                    onLoad={() => handleImageLoad(product.id)}
                    style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-black'>{product.title}</p>
              </Link>


              <div className='w-full flex flex-col gap-2 md:flex items-left justify-center'>

                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button  onClick={() => handleAddCartItem(product)}
                  className=' bg-verde rounded-lg flex justify-center items-center gap-2 py-2 px-4 text-white font-medium text-sm hover:bg-white border-2 border-verde hover:text-verde'
                >

                  <BsCart size={20} />
                  Adicionar
                </button>
              </div>

            </section>
          ))}

        </div>
      </main>      
    </div>
  )
}


