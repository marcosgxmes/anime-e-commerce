import { Link } from "react-router-dom";
import img from "../../../public/dc_logo_gray.png";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { useContext } from "react";

import { useCarrinho } from "../../context/CarrinhoContext";
import { useSearch } from "../../context/SeachContext";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

export function Header() {
  const { abrirCarrinho } = useCarrinho();

  const { signed, loadingAuth, user } = useContext(AuthContext);
  const { cartAmount } = useContext(CartContext);

  const { input, setInput, handleSearchItem } = useSearch();

  return (
    <header className="w-full  z-10 md:sticky top-0 bg-white shadow-md">
      <nav className="w-full max-w-7xl min-h-16 flex flex-col items-center justify-between mx-auto md:py-2">
        <div className="w-full flex items-center justify-between px-4 gap-3">
          {/* LOGO */}
          <Link to="/" className="flex gap-x-2 w-52 ">
            <img
              src={img}
              className="max-w-8 w-full object-contain mx-1 py-1.5"
              alt="DC logo"
            />
            <div className="text-iconColor flex flex-col items-start justify-center px-2 font-Gow border-l border-grayText min-h-full w-full">
              <span className="leading-none text-xl ">
                DC <br /> STORE
              </span>
            </div>
          </Link>

          {/* INPUT */}
          <section className=" hidden relative p-2 w-full max-w-3xl mx-auto md:flex justify-center items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-md h-9 px-3 border-none bg-bgInput outline-offset-2 outline-purple focus:outline-2"
              placeholder="Pesquisar"
            />

            <button
              className="absolute h-8 right-0 pr-6"
              onClick={handleSearchItem}
            >
              <FiSearch size={22} color="#707070" />
            </button>
          </section>

          {/* ICONS */}
          <div className="py-2 px-1 flex items-center justify-between gap-4">
            {!loadingAuth && signed && (
              <Link
                to="/login"
                className="relative flex flex-col items-center justify-center"
              >
                <FiUser size={24} color="#3E31FA" />
                <p className="absolute top-6 text-sm text-purple">
                  {user?.name}
                </p>
              </Link>
            )}

            {!loadingAuth && !signed && (
              <Link to="/login" className="flex items-center justify-center gap-2">
                <p className="text-[#607D8B]">Login</p>
                <FiUser size={24} color="#607D8B" />
              </Link>
            )}

            <div className="relative" onClick={() => abrirCarrinho()}>
              <FiShoppingCart
                size={24}
                color={cartAmount != 0 ? "#3E31FA" : "#607D8B"}
              />
              {cartAmount > 0 && (
                <span className="absolute -top-3 -right-2 px-2.5 bg-purple rounded-full w-5 h-5 flex items-center justify-center text-white text-xs">
                  {cartAmount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* INPUT QUE SE ALOCA PARA BAIXA COM MENOR RESOLUÇÃO */}
        <div className={`md:hidden w-full border-t border-grayText`}>
          <section className="relative px-4 py-3 w-full max-w-3xl mx-auto flex justify-center items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full rounded-md h-9 px-3 outline-offset-2 outline-purple focus:outline-2 border-none bg-bgInput"
              placeholder="Pesquisar"
            />

            <button
              className="absolute h-8 right-0 pr-6"
              onClick={handleSearchItem}
            >
              <FiSearch size={22} color="#707070" />
            </button>
          </section>
        </div>
      </nav>
    </header>
  );
}
