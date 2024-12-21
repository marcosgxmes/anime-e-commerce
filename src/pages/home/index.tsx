//import { api } from '../../services/api'
/* eslint-disable prefer-const */
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


export interface ProductsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  creator?: string;
}


export function Home() {

  const [quadrinhos, setQuadrinhos] = useState<ProductsProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])
  const { addItemCart } = useContext(CartContext)

  
  // CHAMANDO PRODUTOS DO DATABASE
  useEffect(() => {
    async function getProducts() {
      const comicRef = collection(db, "quadrinhos")
      const queryRef = query(comicRef, orderBy("id", "desc"))

      getDocs(queryRef)
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


  // EVITAR LAYOUT SHIFT
  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id])
  }


  // MENSAGEM DE ADICIONADO COM SUCESSO
  function handleAddCartItem(product: ProductsProps) {
    toast.success("Adicionado com sucesso", {
      style: {
        backgroundColor: "#FFF",
        color: "#28c76f",
        borderRadius: 10,
      }
    })
    addItemCart(product)
  }


  return (
    <div className='bg-slate-200 pb-10'>
      <main className="w-full max-w-7xl px-3 mx-auto">

        <h1 className="font-medium text-xl mb-2 py-6 text-center text-header">Mangás</h1>

        <div className='grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-5 justify-evenly px-2'>

          {quadrinhos.map(product => (
            <div
              className='w-full h-72 rounded-md bg-white'
              style={{ display: loadImages.includes(product.id) ? "none" : "block" }}
            >
            </div>
          ))}

          {quadrinhos.map(product => (
            <section key={product.id} className="w-full flex flex-col justify-between gap-4">

              <Link className=' flex flex-col gap-3' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center bg-white  rounded-md  py-6 px-3'>
                  <img
                    className='h-full object-contain'
                    src={product.cover}
                    alt={product.title}
                    onLoad={() => handleImageLoad(product.id)}
                    style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-sm  text-color'>{product.title}</p>
              </Link>


              <div className='w-full flex flex-col gap-2 md:flex items-left justify-center'>

                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button
                  className=' bg-verde rounded-lg flex justify-center items-center gap-2 py-2 px-4 text-white font-bold text-sm hover:bg-green-700'
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

