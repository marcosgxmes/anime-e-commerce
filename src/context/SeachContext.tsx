/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ProductsProps } from '../pages/home';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../services/api';


interface SearchContextData {
  handleSearchItem: () => void;
  setInput: (e: string) => void;
  input: string;
  quadrinhos: ProductsProps[];
  setQuadrinhos: (e: ProductsProps[]) => void;
}

interface SearchProviderProps {
  children: ReactNode;
}

const SearchContext = createContext({} as SearchContextData);


export const SearchProvider = ({ children }: SearchProviderProps) => {

  const [input, setInput] = useState("")
  const [quadrinhos, setQuadrinhos] = useState<ProductsProps[]>([])


  // MOSTRAR TODOS PRODUTOS
  async function getProducts() {
    const comicRef = collection(db, "quadrinhos")
    const queryRef = query(comicRef, orderBy("creator", "desc"))

    getDocs(queryRef)
      .then((snapshot) => {
        // eslint-disable-next-line prefer-const
        let listComic = [] as ProductsProps[]

        snapshot.forEach(doc => [
          listComic.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            price: doc.data().price,
            cover: doc.data().cover,
            creator: doc.data().creator

          })
        ])

        setQuadrinhos(listComic)
      })
  }


  // BUSCAR ITEM PELA BARRA DE PESQUISA
  async function handleSearchItem() {
    if (input === "") {
      getProducts()
      return;
    }

    setQuadrinhos([])

    const q = query(collection(db, "quadrinhos"),
      where("title", ">=", input),
      where("title", "<=", input + "\uf8ff"),
    )

    const querySnapshot = await getDocs(q)

    // eslint-disable-next-line prefer-const
    let listComic = [] as ProductsProps[]

    querySnapshot.forEach(doc => [
      listComic.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        cover: doc.data().cover,
        creator: doc.data().creator

      })
    ])

    console.log(listComic);
    setQuadrinhos(listComic);
  }


  // MOSTRAR PRODUTOS ENQUANTO DIGITA
  useEffect(() => {
    handleSearchItem();
  }, [input]);


  return (
    <SearchContext.Provider
      value={{
        handleSearchItem,
        setInput,
        input,
        quadrinhos,
        setQuadrinhos,
      }}>
      {children}
    </SearchContext.Provider>
  )
}


export const useSearch = () => useContext(SearchContext);






