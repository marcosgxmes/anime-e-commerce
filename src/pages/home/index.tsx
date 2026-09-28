/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useContext } from "react";

import { CartContext } from "../../context/CartContext";
import { useSearch } from "../../context/SeachContext";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { db } from "../../services/api";
import { collection, query, orderBy, getDocs } from "firebase/firestore";

import { Header } from "../../components/header";
import { Loading } from "../../components/loading";

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
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const { quadrinhos, setQuadrinhos } = useSearch();
  const { addItemCart, scrollToTop } = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);

  // CARREGA PRODUTOS DO FIREBASE
  useEffect(() => {
    async function getProducts() {
      try {
        setIsLoading(true);

        const comicRef = collection(db, "quadrinhos");
        const queryRef = query(comicRef, orderBy("title", "desc"));

        const snapshot = await getDocs(queryRef);

        const listComic: ProductsProps[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();

          listComic.push({
            id: doc.id,
            title: data.title,
            description: data.description,
            price: data.price,
            cover: data.cover,
            creator: data.creator,
          });
        });

        setQuadrinhos(listComic);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);

        toast.error("Não foi possível carregar os mangás.");
      } finally {
        setIsLoading(false);
      }
    }

    getProducts();
  }, []);

  // IMAGEM CARREGADA
  function handleImageLoad(id: string) {
    setLoadedImages((prev) => {
      if (prev.includes(id)) {
        return prev;
      }

      return [...prev, id];
    });
  }

  // ADICIONA ITEM AO CARRINHO
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

  // LOADING
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />

      <div className="min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-purple/5 pb-10">
        <main className="relative mx-auto min-h-screen w-full max-w-7xl p-3">
          {/* TÍTULO */}
          <div className="relative mb-6 mt-4 text-center md:mb-8">
            <div className="relative inline-block">
              <h1 className="relative font-bold text-color md:text-4xl">
                <span className="animate-fade-in-up text-2xl">
                  Explore os mangás mais populares
                </span>
              </h1>

              <div
                className="
                  absolute
                  -inset-4
                  -z-10
                  bg-gradient-to-r
                  from-purple/20
                  to-cleanPurple/20
                  blur-2xl
                  animate-pulse-slow
                "
              />
            </div>
          </div>

          {/* PRODUTOS */}
          <div
            className="
              grid
              grid-cols-2
              items-start
              justify-evenly
              gap-x-3
              gap-y-8
              px-2
              sm:grid-cols-4
              md:grid-cols-4
              md:gap-x-8
              lg:grid-cols-5
              lg:gap-y-12
            "
          >
            {quadrinhos.map((product, index) => {
              const imageLoaded = loadedImages.includes(product.id);

              return (
                <section
                  key={product.id}
                  className={`
                    product-card
                    w-full
                    h-full
                    flex
                    flex-col
                    justify-between
                    gap-3
                    md:gap-4										
                  `}
                  style={{
                    animationDelay: `${Math.min(index * 40, 400)}ms`,
                  }}
                >
                  <Link
                    onClick={() => scrollToTop()}
                    className="relative z-10 flex flex-col gap-y-1"
                    to={`/product/${product.id}`}
                  >
                    {/* CAPA */}
                    <div
                      className="
                        group
                        relative
                        flex
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        bg-white
                        px-4
                        py-6
                        shadow-lg
                        transition-shadow
                        duration-300
                        hover:shadow-2xl
                        sm:max-h-64
                        md:h-72
                        md:px-6
												
                      "
                    >
                      {/* SKELETON */}
                      {!imageLoaded && (
                        <div
                          className="
                            absolute
                            inset-0
                            animate-pulse
                            bg-slate-200
                            dark:bg-slate-700
                          "
                        />
                      )}

                      {/* IMAGEM */}
                      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
                        <img
                          className={`
                            h-full
                            w-full
                            rounded-lg
                            object-contain
                            transition-opacity
                            duration-300
                            ease-out
														
                            ${imageLoaded ? "opacity-100" : "opacity-0"}
                            group-hover:scale-[1.04]
                          `}
                          src={product.cover}
                          alt={product.title}
                          onLoad={() => handleImageLoad(product.id)}
                          loading={index < 5 ? "eager" : "lazy"}
                          decoding="async"
                        />

                        {/* OVERLAY */}
                        <div
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/30
                            via-transparent
                            to-transparent
                            opacity-0
                            transition-opacity
                            duration-300
                            group-hover:opacity-100
                          "
                        />
                      </div>

                      {/* VISUALIZAÇÃO */}
                      <button
                        type="button"
                        aria-label={`Visualizar ${product.title}`}
                        className="
                          absolute
                          bottom-4
                          right-4
                          rounded-full
                          bg-white/80
                          p-2
                          opacity-0
                          shadow-lg
                          backdrop-blur-sm
                          transition-all
                          duration-300
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          hover:scale-110
                        "
                      >
                        <svg
                          className="h-5 w-5 text-purple"
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

                    {/* TÍTULO */}
                    <p
                      className="
                        mt-2
                        line-clamp-2
                        text-center
                        text-sm
                        font-bold
                        text-text
                        transition-colors
                        duration-300
                        group-hover:text-purple
                      "
                    >
                      {product.title}
                    </p>
                  </Link>

                  {/* PREÇO + BOTÃO */}
                  <div
                    className="
                      flex
                      w-full
                      flex-col
                      items-center
                      justify-center
                      gap-2
                      sm:flex-row
                      lg:flex-nowrap
                    "
                  >
                    {/* PREÇO */}
                    <div className="relative w-full text-center sm:text-left">
                      <strong className="font-Roboto text-base md:text-lg">
                        {product.price.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </strong>
                    </div>

                    {/* ADICIONAR */}
                    <button
                      type="button"
                      onClick={() => handleAddCartItem(product)}
                      className="
                        w-full
                        rounded-lg
                        bg-gradient-to-t
                        from-purple
                        to-cleanPurple
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-white
                        transition-all
                        duration-200
                        hover:-translate-y-0.5
                        hover:shadow-lg
                        active:translate-y-0
                      "
                    >
                      Adicionar
                    </button>
                  </div>
                </section>
              );
            })}
          </div>
        </main>

        {/* ANIMAÇÕES */}
        <style>{`

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translate3d(0, 12px, 0);
            }

            to {
              opacity: 1;
              transform: translate3d(0, 0, 0);
            }
          }

          .product-card {
            opacity: 0;
            animation: fadeInUp 0.45s ease-out forwards;
            will-change: opacity, transform;
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out forwards;
            will-change: opacity, transform;
          }

          @keyframes pulseSlow {
            0%,
            100% {
              opacity: 0.5;
            }

            50% {
              opacity: 0.8;
            }
          }

          .animate-pulse-slow {
            animation: pulseSlow 3s ease-in-out infinite;
          }

          /* Evita animações para usuários que preferem menos movimento */
          @media (prefers-reduced-motion: reduce) {
            .product-card,
            .animate-fade-in-up,
            .animate-pulse-slow {
              animation: none !important;
              opacity: 1 !important;
              transform: none !important;
            }

            .product-card * {
              transition: none !important;
            }
          }

        `}</style>
      </div>
    </>
  );
}
