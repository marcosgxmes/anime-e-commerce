import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsProps } from '../home';
import { BsCart } from 'react-icons/bs';
import { CartContext } from '../../context/CartContext'
//import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../services/api'

import { useCarrinho } from '../../context/CarrinhoContext';


export function ProductDetail() {

  // PEGAR ID DO PRODUTO PELA URL
  const { id } = useParams();

  const [product, setProduct] = useState<ProductsProps>();
  const { addItemCart } = useContext(CartContext);

  const { abrirCarrinho } = useCarrinho();


  // CHAMANDO PRODUTO NO DATABASE PELO ID
  useEffect(() => {
    async function getProduct() {

      if (!id) { return }

      const mangaRef = doc(db, "quadrinhos", id)

      getDoc(mangaRef)
        .then((snapshot) => {
          setProduct({
            id: snapshot.id,
            title: snapshot.data()?.title,
            description: snapshot.data()?.description,
            price: snapshot.data()?.price,
            cover: snapshot.data()?.cover,
            creator: snapshot.data()?.creator,
          })
        })
    }
    getProduct()
  }, [id])


  // ADD ITEM NO CARRINHO
  function handleAddItem(product: ProductsProps) {
    // toast.success("Adicionado ao carrinho", {
    //   style: {
    //     backgroundColor: "#000",
    //     color: "#FFF",
    //     borderRadius: 17
    //   }
    // })    

    addItemCart(product)
    abrirCarrinho()
  }

  // function sortNumber(){
  //   let min = 1;
  //   let max = 20;
  //   let ramdomNumbers = [];

  //   for (let i = 0; i < 4; i++) {
  //     let ramdomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     ramdomNumbers.push(ramdomNumber)
  //   }

  //   console.log(ramdomNumbers)
  // }

  // sortNumber()


  return (
    <div className='flex flex-col bg-background py-5'>
      <main className=' w-full flex-1 h-full max-w-7xl px-5 pb-7 mx-auto '>

        {product && (
          <section className='w-full h-full'>

            <div className='w-full mb-5 flex items-start justify-start gap-2 text-sm'>
              <Link className='flex items-center justify-center' to="/">
                <p>Home </p>
                <span className='ml-1'>|</span>
              </Link>

              <strong className='text-colorTotal flex flex-wrap'>{product?.title}</strong>
            </div>

            <div className='flex flex-col items-center lg:flex-row mt-7'>
              <div className='flex flex-1 items-center justify-center rounded-md mb-8 sm:mb-0'>
                <img
                  className='h-64 sm:h-96 object-contain shadow-md rounded-lg'
                  src={product.cover}
                  alt={product.title}
                />
              </div>

              <div className='flex-1 bg-white rounded-md py-5 px-3 sm:px-7'>
                <p className='font-bold text-lg mb-2'>{product?.title}</p>
                <p className='my-4 pb-3 italic text-justify'>{product?.description}</p>
                <p className='my-4 pb-3 text-sm '>Autores: <span className='font-medium'>{product?.creator}</span></p>

                <div className='flex items-center justify-between w-full border-t-2 pt-4'>
                  <button
                    onClick={() => handleAddItem(product)}
                    className='bg-green-500 rounded-lg flex gap-2 py-2 px-8 text-white font-bold hover:bg-white border-2 border-verde hover:text-verde'
                  >
                    <BsCart size={20} />
                    Adicionar
                  </button>

                  <strong className='text-color text-xl'>
                    {product?.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </strong>
                </div>

              </div>
            </div>
          </section>
        )}
        
      </main>



      <section className='w-full flex px-5  flex-col items-center justify-center max-w-7xl mx-auto gap-y-8 my-5 sm:mt-10'>
        <h1 className='text-colorTotal font-medium text-xl text-left'>Sugestões para você</h1>

        <div className='h-full grid grid-cols-2 md:gap-x-5 gap-x-3 gap-y-6 md:grid-cols-4 justify-evenly w-full '>

        {product && (
            <section key={product.id} className="w-full flex flex-col justify-between gap-2">

              <Link className=' flex flex-col gap-1' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center rounded-md '>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all'
                    src={product.cover}
                    alt={product.title}
                    // onLoad={() => handleImageLoad(product.id)}
                    // style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-black'>{product.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-center justify-center'>

                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                
              </div>

            </section>
          )}
        {product && (
            <section key={product.id} className="w-full flex flex-col justify-between gap-2">

              <Link className=' flex flex-col gap-1' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center rounded-md '>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all'
                    src={product.cover}
                    alt={product.title}
                    // onLoad={() => handleImageLoad(product.id)}
                    // style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-black'>{product.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-center justify-center'>

                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                
              </div>

            </section>
          )}
        {product && (
            <section key={product.id} className="w-full flex flex-col justify-between gap-2">

              <Link className=' flex flex-col gap-1' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center rounded-md '>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all'
                    src={product.cover}
                    alt={product.title}
                    // onLoad={() => handleImageLoad(product.id)}
                    // style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-black'>{product.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-center justify-center'>

                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                
              </div>

            </section>
          )}

        {product && (
            <section key={product.id} className="w-full flex flex-col justify-between gap-2">

              <Link className=' flex flex-col gap-1' to={`/product/${product.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center rounded-md '>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all'
                    src={product.cover}
                    alt={product.title}
                    // onLoad={() => handleImageLoad(product.id)}
                    // style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-black'>{product.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-center justify-center'>

                <strong className='text-color font-roboto'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>

                
              </div>

            </section>
          )}      

        </div>
      </section>
    </div>
  )
}