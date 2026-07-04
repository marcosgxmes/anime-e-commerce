/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import { BsCart } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import { useSearch } from "../../context/SeachContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { db } from "../../services/api";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Header } from "../../components/header";

// TIPAGEM DOS PRODUTOS
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
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const { addItemCart, scrollToTop } = useContext(CartContext);

  // CHAMANDO PRODUTOS DO DATABASE
  useEffect(() => {
    async function getProducts() {
      const comicRef = collection(db, "quadrinhos");
      const queryRef = query(comicRef, orderBy("id", "asc"));

      getDocs(queryRef).then((snapshot) => {
        // eslint-disable-next-line prefer-const
        let listComic = [] as ProductsProps[];

        snapshot.forEach((doc) => [
          listComic.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            price: doc.data().price,
            cover: doc.data().cover,
            creator: doc.data().creator,
          }),
        ]);

        setQuadrinhos(listComic);
      });
    }
    getProducts();
  }, []);

  // EVITAR LAYOUT SHIFT
  function handleImageLoad(id: string) {
    setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id]);
  }

  // MENSAGEM DE ADICIONADO COM SUCESSO
  function handleAddCartItem(product: ProductsProps) {
    toast.success("Adicionado com sucesso!", {
      style: {
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 15,
      },
    });
    addItemCart(product);
  }

  return (
    <div className="bg-background pb-10">
      <Header />

      <main className="w-full min-h-screen max-w-7xl p-3 mx-auto">
        <h1 className="font-bold text-2xl md:text-3xl  mt-4 mb-1 text-center text-color">
          Destaques
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-1 mb-6 animate-fade-in-up animation-delay-200">
            Explore os mangás mais populares
          </p>

        <div className="grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-8 lg:gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start justify-evenly px-2">
          {/* LAYOUT SHIFT */}
          {quadrinhos.map((product) => (
            <section
              key={product.id}
              className="w-full flex flex-col justify-between gap-4"
              style={{
                display: loadImages.includes(product.id) ? "none" : "block",
              }}
            >
              <div className=" flex flex-col gap-2 animate-pulse">
                <div className="bg-slate-500 w-full h-60 rounded-xl mb-4"></div>
                <div className="bg-slate-500 w-full h-4 rounded-full"></div>
                <div className="bg-slate-500 w-full h-4 rounded-full"></div>
              </div>
            </section>
          ))}

          {/* PRODUTOS */}
          {quadrinhos.map((product, index) => (
            <section
              key={product.id}
              className="w-full h-full flex flex-col justify-between gap-3 md:gap-5 group animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                onClick={() => scrollToTop()}
                className="flex flex-col z-1 sm:gap-y-3 relative"
                to={`/product/${product.id}`}
              >
                <div className="relative flex items-center h-60 md:h-72 justify-center py-8 bg-white md:px-6 px-4 rounded-2xl mb-2 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1">
                  {/* Zoom na imagem com overlay */}
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      className={`rounded-lg w-full sm:h-full object-contain transition-all duration-700 ${
                        loadImages.includes(product.id)
                          ? "opacity-100 group-hover:scale-110 group-hover:rotate-1"
                          : "opacity-0"
                      }`}
                      src={product.cover}
                      alt={product.title}
                      onLoad={() => handleImageLoad(product.id)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>

                  {/* Ícone de visualização rápida */}
                  <button className="absolute bottom-4 right-4 bg-transparent backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hover:scale-110">
                    <svg
                      className="w-5 h-5 text-purple"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Título do produto */}
                <p className="font-bold text-center text-sm text-text line-clamp-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple group-hover:to-cleanPurple">
                  {product.title}
                </p>
              </Link>

              {/* PREÇO E BOTAO ADICIONAR */}
              <div className="w-full flex flex-col gap-y-2 gap-x-4 items-center justify-center sm:flex-row lg:flex-row-reverse lg:flex-nowrap">
                {/* Preço  */}
                <div className="relative w-full text-center sm:text-left">
                  <strong className="font-Roboto text-base md:text-lg ">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </div>

                {/* Botão de adiconar */}
                <button
                  onClick={() => handleAddCartItem(product)}
                  className="w-full bg-gradient-to-t from-purple to-cleanPurple rounded-lg flex justify-center items-center gap-2 py-2 px-4  text-white font-medium text-sm hover:bg-none hover:bg-purple"
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
  );
}
