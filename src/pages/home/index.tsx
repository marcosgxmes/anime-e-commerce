/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
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
	const [loadImages, setLoadImages] = useState<string[]>([]);	
	const { quadrinhos, setQuadrinhos } = useSearch();
	const { addItemCart, scrollToTop } = useContext(CartContext);

	// CARREGA PRODUTOS DO DATABASE
	useEffect(() => {
		async function getProducts() {
			const comicRef = collection(db, "quadrinhos");
			const queryRef = query(comicRef, orderBy("id", "desc"));

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

	// EVITA LAYOUT SHIFT
	function handleImageLoad(id: string) {
		setLoadImages((prevImagesLoaded) => [...prevImagesLoaded, id]);
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

	return (
		<>
			<Header />

			<div className="bg-gradient-to-br from-background via-background to-purple/5 pb-10 min-h-screen relative overflow-hidden">
				<main className="w-full min-h-screen max-w-7xl p-3 mx-auto relative">
					{/* TÍTULO  */}
					<div className="relative mt-4 mb-6 md:mb-10 text-center">
						<div className="inline-block relative">
							<h1 className="font-bold text-3xl md:text-4xl text-color relative">
								<span className="relative inline-block animate-fade-in-up">
									Destaques
								</span>
							</h1>
							<div className="absolute -inset-4 bg-gradient-to-r from-purple/20 to-cleanPurple/20 blur-2xl -z-10 animate-pulse-slow"></div>
						</div>
						<p className="text-gray-500 dark:text-gray-400 text-sm mt-1 md:mt-4 animate-fade-in-up animation-delay-200">
							Explore os mangás mais populares
						</p>
					</div>

					<div className="grid grid-cols-2 gap-x-3 md:gap-x-8 gap-y-8 lg:gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start justify-evenly px-2">
						{/* LAYOUT SHIFT */}
						{quadrinhos.map((product) => (
							<section
								key={product.id}
								className="w-full flex flex-col justify-between gap-4"
								style={{
									display: loadImages.includes(product.id) ? "none" : "block",
									minHeight: "280px",
								}}
							>
								{loadImages.includes(product.id) && (
									// Skeleton loading state
									<div className="flex flex-col gap-2 animate-pulse">
										<div
											className="bg-slate-200 dark:bg-slate-700 w-full rounded-xl mb-4"
											style={{
												aspectRatio: "16/10",
												minHeight: "240px",
											}}
										></div>
										<div className="bg-slate-200 dark:bg-slate-700 w-3/4 h-4 rounded-full"></div>
										<div className="bg-slate-200 dark:bg-slate-700 w-1/2 h-4 rounded-full"></div>
										<div className="bg-slate-200 dark:bg-slate-700 w-2/3 h-3 rounded-full"></div>
									</div>
								)}
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
									className="flex flex-col z-1 gap-y-2 relative"
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

									{/* TITULO DO PRODUTO */}
									<p className="font-bold mt-2 text-center text-sm text-text line-clamp-2 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple group-hover:to-cleanPurple">
										{product.title}
									</p>
								</Link>

								{/* PREÇO E BOTAO ADICIONAR */}
								<div className="w-full flex flex-col gap-2 items-center justify-center sm:flex-row lg:flex-row lg:flex-nowrap">
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
										className="w-full bg-gradient-to-t from-purple to-cleanPurple rounded-lg flex justify-center items-center py-2 px-4  text-white font-medium text-sm hover:bg-none hover:bg-purple"
									>
										Adicionar
									</button>
								</div>
							</section>
						))}
					</div>
				</main>

				{/*  ESTILOS DO FADE-IN */}
				<style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping 2s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
			</div>
		</>
	);
}
