/* eslint-disable react-refresh/only-export-components */
/* eslint-disable prefer-const */

// USECONTEXT PARA ESPALHAR AS INFORMAÇÕES PELO SITE, DA HOME PRO CARRINHO

import { createContext, ReactNode, useState } from "react";
import { ProductsProps } from "../pages/home";

interface CartContextData {
  cart: CartProps[];
  cartAmount: number;
  addItemCart: (newItem: ProductsProps) => void;
  removeItemCart: (product: CartProps) => void;
  deleteItemCart: (product: CartProps) => void;
  total: string;
}



interface CartProps {
  id: string;
  price: number;
  title: string;
  description: string;
  cover: string;
  creator?: string;
  amount: number;
  total: number;
}

interface CartProviderProps {
  children: ReactNode;
}



export const CartContext = createContext({} as CartContextData)



function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState("");


  // ADICIONAR PRODUTOS NO CARRINHO
  function addItemCart(newItem: ProductsProps) {
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    if (indexItem !== -1) {
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount + 1;
      cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList)
      totalResultCart(cartList);
      return;
    }

    let data = {
      ...newItem,
      amount: 1,
      total: newItem.price
    }

    setCart(products => [...products, data])
    totalResultCart([...cart, data])
  }


  // REMOVER QUANTIDADE DE PRODUTOS
  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id === product.id)

    if (cart[indexItem]?.amount > 1) {
      let cartList = cart;

      cartList[indexItem].amount = cartList[indexItem].amount - 1;
      cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price;

      setCart(cartList);
      totalResultCart(cartList);
      return;
    }

    const removeItem = cart.filter(item => item.id !== product.id)

    setCart(removeItem);
    totalResultCart(removeItem)
  }


  // EXCLUIR PRODUTO DO CARRINHO
  function deleteItemCart(product: CartProps) {
    const removeItem = cart.filter(item => item.id !== product.id)

    setCart(removeItem);
    totalResultCart(removeItem)
  }


  // CALCULAR TOTAL
  function totalResultCart(items: CartProps[]) {
    let myCart = items;
    let result = myCart.reduce((acc, obj) => { return acc + obj.total }, 0)
    const resultFomated = result.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" })

    setTotal(resultFomated);
  }


  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        deleteItemCart,
        total
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;