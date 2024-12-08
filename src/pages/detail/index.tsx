import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { ProductsProps } from '../home';
import { BsCart} from 'react-icons/bs';
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>();
  const { addItemCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data);
      console.log(response.data);
    }

    getProduct();
  }, [id])

  //ADD ITEM NO CARRINHO
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
    <div>
      <main className='w-full max-w-7xl px-4 mx-auto my-6'>
        {product && (
          <section className='w-full'>
            <div className='w-full mb-5 flex gap-2'>
            <Link to="/">
              <p>Home |</p>
            </Link>
            <strong className='text-red-600'> {product?.title}</strong>
            </div>

            <div className='flex flex-col lg:flex-row'>
              <img
                className='flex-1 w-full max-h-72 object-contain'
                src={product?.cover}
                alt={product?.title}
              />

              <div className='flex-1'>
                <p className='font-bold text-xl mt-4 mb-2'>{product?.title}</p>
                <p className='my-4 border-b-2 pb-3 border-gray-200'>{product?.description}</p>
                <strong className='text-color text-xl'>
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </strong>


                <button
                  onClick={() => handleAddItem(product)}
                  className='bg-green-500 p-1 rounded-lg flex gap-2 py-2 px-4 mt-3 text-white font-bold hover:bg-green-600' >
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