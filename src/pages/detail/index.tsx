import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsProps } from '../home';
import { BsCart } from 'react-icons/bs';
import { CartContext } from '../../context/CartContext'
//import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from '../../services/api'

import { useCarrinho } from '../../context/CarrinhoContext';


export function ProductDetail() {

  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>();
  const [produtos, setProdutos] = useState<ProductsProps[]>([])

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
    sugerirProdutosAleatorios();
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


  // SUGESTÕES DE PRODUTOS
  async function sugerirProdutosAleatorios() {
    try {
      // Referência à coleção de produtos
      const produtosRef = collection(db, "quadrinhos")

      // Pega todos os produtos da coleção
      getDocs(produtosRef)
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

          setProdutos(listComic.slice(0, 4))
        })



      // Embaralha o array de produtos aleatoriamente
      const produtosAleatorios = shuffleArray(produtos);

      // Seleciona os 4 primeiros produtos após embaralhar
      setProdutos(produtosAleatorios.slice(0, 4))
      console.log(produtosAleatorios.slice(0, 4))
      
      return produtosAleatorios.slice(0, 4);
      

    } catch (error) {
      console.error("Erro ao sugerir produtos aleatórios:", error);
    }    
  }

  // Função de embaralhamento (algoritmo de Fisher-Yates)
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
  }


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

          {produtos.map((snap => (
            <section key={snap.id} className="w-full flex flex-col justify-between gap-2">

              <Link className=' flex flex-col gap-1' to={`/product/${snap.id}`}>
                <div className='flex items-center h-60 md:h-72 justify-center rounded-md '>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all'
                    src={snap.cover}
                    alt={snap.title}
                  // onLoad={() => handleImageLoad(product.id)}
                  // style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-sm text-black'>{snap.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-center justify-center'>

                <strong className='text-color font-roboto'>
                  {snap.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>


              </div>

            </section>
          )))}


        </div>
      </section>
    </div>
  )
}