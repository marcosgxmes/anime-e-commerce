// TODA ESTILIZAÇÃO DESTA PAGINA FOI FEITA POR IA, EXCETO AS FUNCIONALIDADES


function Payment() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <main className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-purple px-8 py-6">
          <h1 className="text-2xl font-bold text-white">Finalizar Pedido</h1>
          <p className="text-blue-100 text-sm">Revise seus dados e confirme o pagamento</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Endereço de entrega */}
          <section className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Endereço de entrega</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-medium text-gray-800">Marcos Gomes</p>
              <p className="text-gray-600 text-sm">Avenida dos estados, 476, São Paulo, SP, 098430236</p>
            </div>
          </section>

          {/* Produtos */}
          <section className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Produtos</h2>
            </div>
            
            <div className="space-y-3">
              {/* Exemplo de produto - você pode mapear seus produtos aqui */}
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Produto Exemplo</p>
                    <p className="text-sm text-gray-500">Quantidade: 1</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">R$ 99,90</p>
              </div>
              
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Outro Produto</p>
                    <p className="text-sm text-gray-500">Quantidade: 2</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">R$ 149,90</p>
              </div>
            </div>
          </section>

          {/* Método de pagamento */}
          {/* Método de pagamento */}
          <section className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h2 className="text-lg font-semibold text-gray-800">Método de pagamento</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Google Pay - Indisponível */}
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3 text-center cursor-not-allowed opacity-50">
                <div className="text-2xl mb-1">📱</div>
                <p className="text-sm font-medium text-gray-500">Google Pay</p>
                <span className="text-xs text-red-500 font-medium">Indisponível</span>
              </div>

              {/* Pix - Pré-selecionado */}
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 text-center cursor-pointer transition-all duration-200 shadow-md relative">
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  ✓
                </div>
                {/* Ícone oficial do Pix */}
                <div className="flex justify-center mb-1">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#00B38F"/>
                    <path d="M14.4 20.8L12 23.2L14.4 25.6L16.8 23.2L14.4 20.8Z" fill="white"/>
                    <path d="M16.8 23.2L19.2 20.8L21.6 23.2L19.2 25.6L16.8 23.2Z" fill="white"/>
                    <path d="M21.6 23.2L24 20.8L26.4 23.2L24 25.6L21.6 23.2Z" fill="white"/>
                    <path d="M26.4 23.2L28.8 20.8L31.2 23.2L28.8 25.6L26.4 23.2Z" fill="white"/>
                    <path d="M31.2 23.2L33.6 20.8L36 23.2L33.6 25.6L31.2 23.2Z" fill="white"/>
                    <path d="M33.6 23.2L36 20.8L38.4 23.2L36 25.6L33.6 23.2Z" fill="white"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-green-700">Pix</p>
                <span className="text-xs text-green-600 font-medium">Selecionado</span>
              </div>

              {/* Cartão Débito - Indisponível */}
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3 text-center cursor-not-allowed opacity-50">
                <div className="text-2xl mb-1">💳</div>
                <p className="text-sm font-medium text-gray-500">Cartão Débito</p>
                <span className="text-xs text-red-500 font-medium">Indisponível</span>
              </div>

              {/* Boleto Bancário - Indisponível */}
              <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3 text-center cursor-not-allowed opacity-50">
                <div className="text-2xl mb-1">📄</div>
                <p className="text-sm font-medium text-gray-500">Boleto Bancário</p>
                <span className="text-xs text-red-500 font-medium">Indisponível</span>
              </div>
            </div>

            {/* Mensagem informativa sobre o Pix */}
            <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-700 flex items-center gap-2">
                Pagamento via Pix selecionado. Você receberá o QR Code para pagamento.
              </p>
            </div>
          </section>

          
          {/* Resumo e botão */}
          <section className="pt-2">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <p>Total</p>
                  <p className="font-medium">R$ 249,80</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p>Total do Frete</p>
                  <p className="font-medium text-green-600">Grátis</p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <p>Total a pagar</p>
                    <p>R$ 249,80</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-purple hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Fazer pedido
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Payment;