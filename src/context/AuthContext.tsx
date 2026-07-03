//IMPORTAÇÃO
import { ReactNode, createContext, useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/api"

// TIPAGENS
type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({uid, name , email}: UserProps) => void
  user: UserProps | null
}

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

// INSTANCIANDO CONTEXT
export const AuthContext = createContext({} as AuthContextData);

//PROVIDER
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  //VERIFICAR SE TEM USUARIO LOGADO
  useEffect(() => {
    // onAuthStateChanged é como se fosse um olheiro
    const unsub = onAuthStateChanged(auth, (user) => {
      // SE TIVER USUARIO LOGADOS, SETA OS DADOS PARA A VARIAVEL
      if(user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email
        })

        setLoadingAuth(false);
        // SE NÃO TIVER USUARIO LOGADO, SETADO NULL PARA A VARIAVEL
      } else {
        setUser(null);
        setLoadingAuth(false);        
      }
    })

    // DESMONSTAR O OLHEIRO
    return () => {
      unsub();
    }
  }, [])

  // FUNÇÃO QUE ATUALIZA OS DADOS DO USUARIO APOS LOGIN OU CADASTRO
  function handleInfoUser({uid, name, email}: UserProps) {
    setUser({
      uid,
      name,
      email
    })
  }

  return (
    <AuthContext.Provider 
      value={{ 
          signed: !!user,
          loadingAuth,
          handleInfoUser,
          user 
      }}
      >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

// DEPOIS DAQUI TEM QUE COLOCAR O AuthProvider EM VOLTA DAS ROTAS LA NA MAIN