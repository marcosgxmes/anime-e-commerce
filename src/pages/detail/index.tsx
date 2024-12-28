/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsProps } from '../home';
import { BsCart } from 'react-icons/bs';
import { CartContext } from '../../context/CartContext'
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


  // VOLTAR AO TOPO DA PÁGINA
  function reSize(){
    window.scrollTo(0,0)
  }


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
    <div className='flex-col bg-background py-5'>
      <main className='w-full h-full max-w-7xl px-5  mx-auto '>


        {product && (
          <section className='w-full min-h-full'>

            <div className='w-full mb-5 flex items-start justify-start gap-2 text-sm'>
              <Link className='flex items-center justify-center text-texts' to="/">
                <p>Home </p>
                <span className='ml-1'>|</span>
              </Link>

              <strong className='text-red flex flex-wrap'>{product?.title}</strong>
            </div>

            <div className='flex max-w-6xl mx-auto flex-col items-center lg:flex-row my-8 gap-8'>

              <div className='w-full min-h-72 h-full py-5 md:bg-footer flex flex-1 items-center justify-center rounded-md mb-8 sm:mb-0'>
                <img
                  className='h-full object-contain shadow-md rounded-lg'
                  src={product.cover}
                  alt={product.title}
                />
              </div>

              <div className='flex-1 border border-border rounded-md py-5 px-3 sm:px-7 shadow-md'>
                <p className='font-bold text-lg text-white sm:text-2xl mb-8'>{product?.title}</p>
                <p className='my-4 text-sm text-texts pb-3 text-justify'>{product?.description}</p>
                <p className='my-4 pb-3 text-sm text-white'>Autores: <span className='font-medium'>{product?.creator}</span></p>

                <div className='flex flex-col-reverse gap-4 justify-start w-full border-t-2 border-border pt-4'>
                  <button
                    onClick={() => handleAddItem(product)}
                    className='bg-green-500 rounded-lg flex items-center justify-center gap-2 py-2 px-8 text-white font-bold hover:bg-verdeLima hover:text-black'
                  >
                    <BsCart size={20} />
                    Adicionar ao carrinho
                  </button>

                  <strong className='text-white text-xl'>
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


      <section className='w-full flex-1 px-5  flex-col items-center justify-center max-w-6xl mx-auto gap-y-8 sm:my-8 mb-10'>
      <h1 className="font-medium text-xl text-center mb-7 text-white">Sugestões para você</h1>

        <div className='h-full grid grid-cols-2 md:gap-x-5 gap-x-3 gap-y-6 md:grid-cols-4 justify-evenly w-full '>

          {produtos.map((snap => (
            <section key={snap.id} className="w-full flex flex-col justify-between gap-2">

              <Link onClick={() => reSize()} className=' flex flex-col gap-4 scroll-smooth'  to={`/product/${snap.id}`}>
                <div className='flex items-center h-60 md:h-64  justify-center rounded-md '>
                  <img
                    className='h-full object-contain hover:scale-105 transition-all md:rounded-lg'
                    src={snap.cover}
                    alt={snap.title}
                  // onLoad={() => handleImageLoad(product.id)}
                  // style={{ display: loadImages.includes(product.id) ? "block" : "none" }}
                  />
                </div>

                <p className='font-medium text-center text-white text-sm'>{snap.title}</p>
              </Link>

              <div className='w-full flex flex-col gap-2 md:flex items-center justify-center'>

                <strong className='text-white font-roboto'>
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