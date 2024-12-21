import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductsProps } from '../home';
import { BsCart } from 'react-icons/bs';
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getDoc, doc } from "firebase/firestore";
import { db } from '../../services/api'


export function ProductDetail() {

  // PEGAR ID DO PRODUTO PELA URL
  const { id } = useParams();
  
  const [product, setProduct] = useState<ProductsProps>();
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();


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
    toast.success("Adicionado ao carrinho", {
      style: {
        backgroundColor: "#000",
        color: "#FFF",
        borderRadius: 17
      }
    })

    addItemCart(product)
    navigate("/cart")
  }


  return (
    <div className='bg-slate-200 flex items-center py-5'>
      <main className='w-full max-w-7xl px-5 pb-7 mx-auto'>

        {product  && (
          <section className='w-full'>

            <div className='w-full mb-5 flex items-center justify-start gap-2 text-sm'>
              <Link className='flex items-center justify-center' to="/">
                <p>Home </p>
                <span className='ml-1'>|</span>
              </Link>

              <strong className='text-red flex flex-wrap'>{product?.title}</strong>
            </div>

            <div className='flex flex-col lg:flex-row gap-x-6 mt-7'>
              <div className='flex flex-1 items-center h-80 justify-center bg-white  rounded-md mb-4 py-10 px-5 shadow-sm shadow-border-500/40'>
                <img
                  className='h-72 sm:h-80 object-contain'
                  src={product.cover}
                  alt={product.title}
                />
              </div>

              <div className='flex-1'>
                <p className='font-bold text-xl mt-2 mb-2'>{product?.title}</p>
                <p className='my-4 pb-3 text-justify'>{product?.description}</p>
                <p className='my-4 pb-3 text-sm'>Autores: <span className='font-bold'>{product?.creator}</span></p>

                <strong className='text-color text-xl'>
                  {product?.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>


                <button
                  onClick={() => handleAddItem(product)}
                  className='bg-green-500 p-1 rounded-lg flex gap-2 py-2 px-4 mt-3 text-white font-bold hover:bg-green-600'
                >
                  <BsCart size={20} color='#FFF' />
                  Adicionar ao carrinho
                </button>

              </div>
            </div>
          </section>
        )}        
      </main>
    </div>
  )
}