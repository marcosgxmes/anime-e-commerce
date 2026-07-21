/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { getDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "../../services/api";

import { CartContext } from "../../context/CartContext";
import { Header } from "../../components/header";
import { ProductsProps } from "../home";
import toast from "react-hot-toast";

export function ProductDetail() {
	const { id } = useParams();
	const { addItemCart, scrollToTop } = useContext(CartContext);

	const [product, setProduct] = useState<ProductsProps>();
	const [produtos, setProdutos] = useState<ProductsProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// CHAMANDO PRODUTO NO DATABASE PELO ID
	useEffect(() => {
		async function getProduct() {
			if (!id) {
				return;
			}

			const mangaRef = doc(db, "quadrinhos", id);

			getDoc(mangaRef).then((snapshot) => {
				setProduct({
					id: snapshot.id,
					title: snapshot.data()?.title,
					description: snapshot.data()?.description,
					price: snapshot.data()?.price,
					cover: snapshot.data()?.cover,
					creator: snapshot.data()?.creator,
				});
			});
		}

		getProduct();

		sugerirProdutosAleatorios(Array.from(produtosExibidos).join(",")).then(
			(produtos) => {
				console.log("Produtos aleatórios:", produtos);
			},
		);
		setIsLoading(false);
	}, [id]);

	let produtosExibidos = new Set<string>(id); // Set para armazenar os IDs dos produtos exibidos

	// FUNÇÃO PARA ADICIONAR ITEM NO CARRINHO
	function handleAddItem(product: ProductsProps) {
		toast.success("Adicionado ao carrinho", {
			style: {
				backgroundColor: "#000",
				color: "#FFF",
				borderRadius: 17,
			},
		});

		addItemCart(product);
	}

	// FUNÇÃO PARA SUGERIR OUTROS PRODUTOS
	async function sugerirProdutosAleatorios(produtoSelecionadoId: string) {
		try {
			// Referência à coleção de quadrinhos
			const produtosRef = collection(db, "quadrinhos");

			// Pega todos os produtos da coleção
			const snapshot = await getDocs(produtosRef);

			if (snapshot.empty) {
				console.log("Nenhum produto encontrado.");
				return [];
			}

			// Lista para armazenar os produtos disponíveis (excluindo o selecionado)
			const listaDisponivel: ProductsProps[] = [];

			// Itera sobre os documentos e adiciona os dados à lista de produtos disponíveis
			snapshot.forEach((doc) => {
				// Verifica se o produto NÃO é o selecionado
				if (doc.id !== produtoSelecionadoId) {
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
				console.log("Não há produtos disponíveis para sugerir.");
				return [];
			}

			// Embaralha os produtos disponíveis
			const produtosAleatorios = shuffleArray(listaDisponivel);

			// Seleciona até 4 primeiros produtos aleatórios (ou menos se não houver 4)
			const quantidadeMaxima = Math.min(4, produtosAleatorios.length);
			const produtosSelecionados = produtosAleatorios.slice(
				0,
				quantidadeMaxima,
			);

			// Exibe ou retorna os produtos aleatórios
			console.log("Produtos aleatórios sugeridos:", produtosSelecionados);

			// Supondo que tenha uma função setProdutos para atualizar o estado (React)
			if (typeof setProdutos === "function") {
				setProdutos(produtosSelecionados);
			}

			return produtosSelecionados;
		} catch (error) {
			console.error("Erro ao sugerir produtos aleatórios:", error);
			return [];
		}
	}

	// FUNÇÃO PARA ENBARALHAR ARRAY PARA SUGESTÕES ALEATÓRIAS
	function shuffleArray<T>(array: T[]): T[] {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	}

	return (
		<>
			<Header />
      
			<div className="flex-col bg-background pb-5 min-h-screen">
				<main className="w-full h-full max-w-7xl p-5  mx-auto ">
					{/* LOADING */}
					{!product && isLoading && (
						<div className="flex justify-center items-center py-20">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
						</div>
					)}

					{/* LAYOUT SHIFT */}
					{product && isLoading && (
						<section className="w-full min-h-full">
							<div className="w-80 bg-slate-500 h-4 rounded-md animate-pulse"></div>

							<div className="flex w-full max-w-6xl min-h-80 h-full mx-auto flex-col items-center md:flex-row my-8 gap-8 animate-pulse">
								<div className="w-full max-x-lg min-h-80 h-full flex-1  rounded-md mb-8 sm:mb-0">
									<div className="bg-slate-500 w-full h-80 rounded-xl mb-4"></div>
								</div>

								<div className="w-full h-full flex-1 border border-border rounded-md p-3 gap-3 sm:px-7 shadow-md ">
									<div className="bg-slate-500 w-full h-60 rounded-xl mb-4"></div>
									<div className="bg-slate-500 w-full h-4 rounded-md mb-4"></div>
									<div className="bg-slate-500 w-full h-4 rounded-md mb-4"></div>
									<div className="bg-slate-500 w-full h-4 rounded-md mb-4"></div>
								</div>
							</div>
						</section>
					)}

					{/* DETALHES PRODUTO */}
					{product && !isLoading && (
						<section className="w-full min-h-full">
							<div className="w-full mb-5 flex items-start justify-start gap-2 text-sm">
								<Link
									className="flex items-center justify-center text-texts"
									to="/"
								>
									<p>Home </p>
									<span className="ml-1">|</span>
								</Link>

								<strong className="text-purple flex flex-wrap">
									{product?.title}
								</strong>
							</div>

							<div className="flex max-w-6xl mx-auto flex-col items-center md:flex-row my-8 sm:gap-3 md:gap-8">
								<div className="w-full max-w-lg h-full py-4 flex flex-1 items-center justify-center rounded-md mb-8 sm:mb-0 bg-white">
									<img
										className="h-full max-h-[400px]  object-contain shadow-md"
										src={product.cover}
										alt={product.title}
									/>
								</div>

								<div className="flex-1 border bg-gray-50 border-grayText rounded-md py-5 px-3 sm:px-7 shadow-md max-w-2xl">
									<p className="font-bold text-lg  sm:text-2xl mb-8">
										{product?.title}
									</p>
									<p className="my-4 text-sm pb-3 text-justify">
										{product?.description}
									</p>
									<p className="my-4 pb-3 text-sm ">
										Autores:{" "}
										<span className="font-medium">{product?.creator}</span>
									</p>

									<div className="flex flex-col-reverse gap-4 justify-start w-full border-t border-grayText pt-4">
										<button
											onClick={() => handleAddItem(product)}
											className="bg-gradient-to-t from-purple to-cleanPurple hover:bg-none hover:bg-purple rounded-lg flex items-center justify-center gap-2 py-2 px-8 text-white font-bold"
										>
											Adicionar ao carrinho
										</button>

										<strong className="text-xl font-Roboto">
											{product?.price.toLocaleString("pt-BR", {
												style: "currency",
												currency: "BRL",
											})}
										</strong>
									</div>
								</div>
							</div>
						</section>
					)}

					{/* SUGESTÕES DE PRODUTOS */}
					{product && !isLoading && (
						<section className="w-full flex-1 px-4 pt-1 md:pt-6 flex-col items-center justify-center max-w-7xl mx-auto gap-y-8">
							<div className="relative mt-2 mb-6 md:mb-10 text-center">
								<div className="inline-block relative">
									<h1 className="font-bold text-2xl md:text-3xl text-color relative">
										<span className="relative inline-block animate-fade-in-up">
											Sugestões para você
										</span>
									</h1>
									<div className="absolute -inset-4 bg-gradient-to-r from-purple/20 to-cleanPurple/20 blur-2xl -z-10 animate-pulse-slow"></div>
								</div>
								<p className="text-gray-500 dark:text-gray-400 text-sm mt-1 md:mt-4 animate-fade-in-up animation-delay-200">
									Quem viu este produto também comprou
								</p>
							</div>

							<div className="h-full grid grid-cols-2 gap-4 md:gap-6 gap-y-6 md:grid-cols-4 lg:grid-cols-4 justify-items-center min-w-full">
								{produtos
									?.filter((snap) => snap?.id !== product?.id)
									.slice(0, 8)
									.map((snap) => (
										<article
											key={snap?.id}
											className="w-full max-w-[200px] md:max-w-[220px] flex flex-col items-center gap-3 transition-all duration-300 hover:translate-y-[-4px]"
										>
											<Link
												onClick={() => scrollToTop()}
												className="flex flex-col gap-2 scroll-smooth w-full"
												to={`/product/${snap?.id}`}
											>
												<div className="flex items-center justify-center w-full aspect-square rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300 p-4 shadow-sm hover:shadow-md">
													<img
														className="w-full h-full object-contain max-h-[180px] md:max-h-[200px] transition-transform duration-300 hover:scale-105"
														src={snap?.cover}
														alt={snap?.title || "Produto"}
														loading="lazy"
													/>
												</div>

												<p className="font-medium text-center text-sm text-gray-700 line-clamp-2 hover:text-gray-900 transition-colors min-h-[40px]">
													{snap?.title || "Produto sem nome"}
												</p>
											</Link>

											<div className="w-full flex items-center justify-center">
												<strong className="font-Roboto text-lg text-gray-900 font-semibold">
													{snap?.price
														? snap.price.toLocaleString("pt-BR", {
																style: "currency",
																currency: "BRL",
															})
														: "Preço indisponível"}
												</strong>
											</div>
										</article>
									))}
							</div>

							{/* Mensagem quando não há sugestões disponíveis */}
							{(!produtos ||
								produtos?.filter((snap) => snap?.id !== product?.id).length ===
									0) && (
								<div className="text-center py-8">
									<p className="text-gray-500 text-sm">
										Nenhuma sugestão disponível no momento.
									</p>
								</div>
							)}
						</section>
					)}

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
				</main>
			</div>
		</>
	);
}
