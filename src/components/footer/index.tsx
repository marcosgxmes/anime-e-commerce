import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className='w-full px-1 bg-footer text-white'>
      <div className='w-full max-w-7xl h-10 flex items-center justify-center mx-auto'>
        <Link  to='/'>        
        DC Store &copy; 2024 Todos os direitos reservados.
        </Link>  
      </div>
    </footer>
  )
}

