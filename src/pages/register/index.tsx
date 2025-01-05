import { Link } from 'react-router-dom'
import logoImg from '../../../public/dc_circle_black.png'

import { Input } from "../../components/input"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Container } from '../../components/container'

const schema = z.object({
  name: z.string().nonempty("* O nome é obrigatório"),
  lastname: z.string().nonempty("* O sobrenome é obrigatório"),
  email: z.string().email("* Digite um email válido").nonempty("* O email é obrigatório"),
  password: z.string().min(8, "* A senha deve ter no minimo 8 caracteres").nonempty("* A senha é obrigatória")
})

type FormData = z.infer<typeof schema>

export function Register() {

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }


  return (
    <Container>
      <div className='bg-white w-full min-h-screen flex justify-center items-center flex-col gap-4'>
       

        <Link to="/" className='mb-6 max-w-36 w-full h-28 flex items-center justify-center'>
        <img
          src={logoImg}
          alt="Logo do site"
          className='object-contain w-full'
        />
      </Link>

      <h1 className='text-2xl font-medium text-texts'>Cadastre-se!</h1>      
      <p className='text-texts text-sm'>Crie sua conta ou faça Login para continuar</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='max-w-xl w-full rounded-lg px-4 py-8'
        >

          <div className='mb-3.5'>
            <Input
              type="text"
              placeholder="Nome"
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

          <div className='mb-3.5'>
            <Input
              type="text"
              placeholder="Sobrenome"
              name="name"
              error={errors.lastname?.message}
              register={register}
            />
          </div>

          <div className='mb-3.5'>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className='mb-3.5'>
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button className='bg-gradient-to-t from-purple to-cleanPurple hover:bg-none hover:bg-purple rounded-2xl w-full text-white h-10 font-medium' type='submit'>
            Cadastrar
          </button>

        </form>

        <Link to="/login" className='text-texts text-sm'>
          Já possui uma conta? <span className='text-purple'>Faça Login aqui!</span>
        </Link>
      </div>
    </Container>
  )
}

