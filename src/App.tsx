import { createBrowserRouter } from "react-router-dom";

//PAGINAS
import { Home } from "./pages/home";
import { ProductDetail } from "./pages/detail";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Cart } from "./pages/cart";
import Payment from "./pages/payment";

//COMPONENTES
import { Layout } from "./components/layout";

//PRIVAR ROTAS
import { Private } from "./routes/Private";

// ROTAS (REACT ROUTER DOM)
const router = createBrowserRouter(
	[
		{
			element: <Layout />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/product/:id",
					element: <ProductDetail />,
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/register",
					element: <Register />,
				},
				{
					path: "/cart",
					element: <Cart />,
				},
				{
					path: "/payment",
					element: (
						// EXEMPLO DE PRIVAÇÃO DE ROTA, SO PODE ACESSAR A PAGINA DE PAGAMENTO SE ESTIVER LOGADO
						<Private>
							<Payment />
						</Private>
					),
				},
			],
		},
	],
	{
		future: {
			v7_fetcherPersist: true,
		},
	},
);

export { router };

// DEPOIS DAQUI PODE REALIZAR AS ALTERAÇÕES DA UI, COMO O ICONE NO HEADER
