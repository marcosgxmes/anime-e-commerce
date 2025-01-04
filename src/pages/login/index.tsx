import { Link } from 'react-router-dom'
import logoImg from '../../../public/dc_circle.png'

import { Input } from "../../components/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container } from '../../components/container'

const schema = z.object({
  email: z.string().email("* Digite um email válido").nonempty("* O email é obrigatório"),
  password: z.string().nonempty("* A senha é obrigatória")
})

type FormData = z.infer<typeof schema>

export function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <Container>
      <div className='bg-background w-full min-h-screen flex justify-center items-center flex-col gap-4'>

      <Link to="/" className='mb-6 max-w-sm w-full h-28 flex items-center justify-center'>
        <img
          src={logoImg}
          alt="Logo do site"
          className='object-contain h-full'
        />
      </Link>

      <h1 className='text-3xl font-medium text-texts'>Bem vindo!</h1>
      <p className='text-texts text-sm'>Faça Login ou crie sua conta:</p>

      

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-footer max-w-xl w-full rounded-lg px-4 py-8'
      >

        <div className='mb-3'>
          <Input
            type="email"
            placeholder="Email"
            name="email"
            error={errors.email?.message}
            register={register}            
          />
        </div>

        <div className='mb-3'>
          <Input
            type="password"
            placeholder="Senha"
            name="password"
            error={errors.password?.message}
            register={register}
          />
        </div>

        <button className='bg-verde rounded-md w-full text-white h-10 font-medium' type='submit'>
          Entrar
        </button>

      </form>

      <Link to="/register" className='text-texts text-sm text-center'>
        Não possui uma conta? <span className='text-verde hover:text-verdeLima'>Cadastre-se aqui!</span>
      </Link>
    </div>
    </Container>
  )
}

