/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from 'react';

interface CarrinhoContextData {
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
  carrinhoAberto: boolean;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}

const CarrinhoContext = createContext({} as CarrinhoContextData);

export const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {

  const [carrinhoAberto, setCarrinhoAberto] = useState(true);

  const abrirCarrinho = () => setCarrinhoAberto(true);
  const fecharCarrinho = () => setCarrinhoAberto(false);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinhoAberto,
        abrirCarrinho,
        fecharCarrinho
      }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export const useCarrinho = () => useContext(CarrinhoContext);