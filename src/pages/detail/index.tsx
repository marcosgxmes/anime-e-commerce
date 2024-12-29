/* eslint-disable prefer-const */
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

  const { addItemCart, scrollToTop } = useContext(CartContext);
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

    sugerirProdutosAleatorios(produtosExibidos).then((produtos) => {
      console.log("Produtos aleatórios:", produtos);
    });

   
  }, [id])

  let produtosExibidos = new Set<string>(id); // Set para armazenar os IDs dos produtos exibidos    


  


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
 

  // Função para embaralhar um array de produtos
function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}


// Função para sugerir 4 produtos aleatórios, sem repetir os já exibidos
async function sugerirProdutosAleatorios(produtosExibidos: Set<string>) {
  try {
    // Referência à coleção de quadrinhos
    const produtosRef = collection(db, "quadrinhos");

    // Pega todos os produtos da coleção
    const snapshot = await getDocs(produtosRef);

    if (snapshot.empty) {
      console.log("Nenhum produto encontrado.");
      return [];
    }

    // Lista para armazenar os produtos disponíveis (não exibidos ainda)
    const listaDisponivel: ProductsProps[] = [];

    // Itera sobre os documentos e adiciona os dados à lista de produtos disponíveis
    snapshot.forEach((doc) => {
      // Verifica se o produto já foi exibido (se o ID está em produtosExibidos)
      if (!produtosExibidos.has(doc.id)) {
        listaDisponivel.push({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
          price: doc.data().price,
          cover: doc.data().cover,
          creator: doc.data().creator,
        });
      }
    });

    if (listaDisponivel.length === 0) {
      console.log("Não há produtos novos para sugerir.");
      return [];
    }

    // Embaralha os produtos disponíveis
    const produtosAleatorios = shuffleArray(listaDisponivel);

    // Seleciona os 4 primeiros produtos aleatórios
    const produtosSelecionados = produtosAleatorios.slice(0, 4);

    // Adiciona os IDs dos produtos sugeridos ao conjunto de produtos exibidos
    produtosSelecionados.forEach(produto => produtosExibidos.add(produto.id));

    // Exibe ou retorna os produtos aleatórios
    console.log("Produtos aleatórios:", produtosSelecionados);

    // Supondo que você tenha uma função setProdutos para atualizar o estado (React)
    setProdutos(produtosSelecionados);

    return produtosSelecionados;

  } catch (error) {
    console.error("Erro ao sugerir produtos aleatórios:", error);
    return [];
  }
}


  return (
    <div className='flex-col bg-background py-5 min-h-screen'>
      <main className='w-full h-full max-w-7xl px-5  mx-auto '>

        {/* LAYOUT SHIFT */}
        {!product && (
          <section className='w-full min-h-full'>

            <div className='w-80 bg-slate-500 h-4 rounded-md animate-pulse'></div>

            <div className='flex max-w-6xl mx-auto flex-col items-center lg:flex-row my-8 gap-8 animate-pulse'>

              <div className='w-full min-h-80 h-full  flex-1  rounded-md mb-8 sm:mb-0'>
                <div className='bg-slate-500 w-full h-80 rounded-xl mb-4'></div>
              </div>

              <div className='w-full h-full flex-1 border border-border rounded-md p-3 gap-3 sm:px-7 shadow-md '>
                <div className='bg-slate-500 w-full h-60 rounded-xl mb-4'></div>
                <div className='bg-slate-500 w-full h-4 rounded-md mb-4'></div>
                <div className='bg-slate-500 w-full h-4 rounded-md mb-4'></div>
                <div className='bg-slate-500 w-full h-4 rounded-md mb-4'></div>
              </div>

            </div>
          </section>
        )}


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

              <div className='w-full min-h-80 h-full  py-5 md:bg-footer flex flex-1 items-center justify-center rounded-md mb-8 sm:mb-0'>
                <img
                  className='h-80  object-contain shadow-md rounded-lg'
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


      {/* LAYOUT SHIFT */}
      {!product && (
        <section className='w-full flex-1 px-5 flex-col items-center justify-center max-w-6xl mx-auto gap-y-10 sm:my-8 my-20 animate-pulse'>
          <div className='bg-slate-500 w-80 h-4 rounded-md my-4 mx-auto'></div>

          <div className='h-full grid grid-cols-2 md:gap-x-5 gap-x-3 gap-y-6 md:grid-cols-4 justify-evenly w-full '>

            {produtos.map((snap => (
              <section key={snap.id} className="w-full flex flex-col justify-between gap-2">

                <div className=' flex flex-col gap-2 scroll-smooth'>
                  <div className='flex items-center h-60 md:h-64  justify-center rounded-md '>
                    <div className='bg-slate-500 w-full h-60 rounded-xl mb-4'></div>
                  </div>

                  <div className='bg-slate-500 w-full h-4 rounded-md mb-2'></div>
                  <div className='bg-slate-500 w-full h-4 rounded-md mb-2'></div>
                </div>

              </section>
            )))}


          </div>
        </section>
      )}


      <section className='w-full flex-1 px-5  flex-col items-center justify-center max-w-6xl mx-auto gap-y-8 sm:my-8 mb-10'>
        <h1 className="font-medium text-xl text-center mb-7 text-white">Sugestões para você</h1>

        <div className='h-full grid grid-cols-2 md:gap-x-5 gap-x-3 gap-y-6 md:grid-cols-4 justify-evenly w-full '>

          {produtos.map((snap => (
            <section key={snap.id} className="w-full flex flex-col justify-between gap-2">

              <Link onClick={() => scrollToTop()} className=' flex flex-col gap-4 scroll-smooth' to={`/product/${snap.id}`}>
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