// AQUI SERÁ FEITO O CONTROLE DE ROTAS


//IMPORTAÇÕES 
import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


// TIPAGEM
interface PrivateProps {
  children: ReactNode;
}


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Private({ children }: PrivateProps): any {

  // PEGAR OS VALORES DO CONTEXTO
  const { signed, loadingAuth} = useContext(AuthContext)

  // SE ESTIVER CARREGANDO
  if(loadingAuth) {
    return (
      <div>Carregando...</div>
    )
  }

  // SE NAO ESTIVER LOGADO
  if(!signed) {
    return <Navigate to="/login" />
  }

  // RETORNA A RENDERIZAÇÃO DA ROTA
  return children;
  
}

// DEPOIS DAQUI, USAR LA NO APP, PARA PRIVAR UMA ROTA

