/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react'
import { BsCart } from 'react-icons/bs'
import { CartContext } from '../../context/CartContext'
import { useSearch } from '../../context/SeachContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { db } from '../../services/api'
import {
  collection,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore'
import { Header } from '../../components/header'


export interface ProductsProps {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
  creator?: string;
}


export function Home() {

  const { quadrinhos, setQuadrinhos } = useSearch();
  const [loadImages, setLoadImages] = useState<string[]>([])
  const { addItemCart, scrollToTop } = useContext(CartContext)


  // CHAMANDO PRODUTOS DO DATABASE
  useEffect(() => {
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
    getProducts()
  }, [])


  // EVITAR LAYOUT SHIFT
  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id])
  }


  // MENSAGEM DE ADICIONADO COM SUCESSO
  function handleAddCartItem(product: ProductsProps) {
    toast.success("Adicionado ao carrinho!", {
      style: {
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 15,
      }
    })
    addItemCart(product)
  }


  return (
    
    <div className='bg-background pb-10'>
      <Header />

      <main className="w-full min-h-screen max-w-7xl p-3 mx-auto">

        <h1 className="font-medium text-xl mb-6 mt-3 text-center text-color">Destaques</h1>

        <div className='grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-8 lg:gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start justify-evenly px-2'>

          {/* LAYOUT SHIFT */}
          {quadrinhos.map(product => (
            <section
              key={product.id} className="w-full flex flex-col justify-between gap-4"
              style={{ display: loadImages.includes(product.id) ? "none" : "block" }}
            >

              <div className=' flex flex-col gap-2 animate-pulse'>

                <div className='bg-slate-500 w-full h-60 rounded-xl mb-4'></div>
                <div className='bg-slate-500 w-full h-4 rounded-full'></div>
                <div className='bg-slate-500 w-full h-4 rounded-full'></div>

              </div>

            </section>
          ))}


          {/* PRODUTOS */}
          {quadrinhos.map(product => (
            <section key={product.id} className="w-full h-full flex flex-col justify-between gap-5">


              <Link
                onClick={() => scrollToTop()}
                className='flex flex-col z-1 sm:gap-y-3 ' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center p-2'>
                  <img
                    className='rounded-md w-full sm:h-full object-contain hover:scale-105 transition-all '
                    src={product.cover}
                    alt={product.title}
                    onLoad={() => handleImageLoad(product.id)}
                    style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-texts'>{product.title}</p>
              </Link>


              <div className='w-full flex gap-y-2 gap-x-4 items-center justify-center flex-wrap lg:flex-row-reverse lg:flex-nowrap'>

                <strong className='font-Roboto w-full'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                <button
                  onClick={() => handleAddCartItem(product)}
                  className='w-full bg-gradient-to-t from-purple to-cleanPurple rounded-lg flex justify-center items-center gap-2 py-2  text-white font-medium text-sm hover:bg-none hover:bg-purple'>
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