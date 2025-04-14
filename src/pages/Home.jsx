import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-300">
      {/* Topo */}
      <header className="bg-white flex justify-between items-center px-6 py-3 shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo Easy Balance" className="w-10" />
          <h1 className="text-xl font-bold text-blue-700">
            EASY <span className="text-blue-500">BALANCE</span>
          </h1>
        </div>

        <nav className="flex space-x-2">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded">
            Balança
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded">
            Relatórios
          </button>
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-1 rounded">
            Usuários
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded">
            Sair
          </button>
        </nav>
      </header>

      {/* Conteúdo central */}
      <main className="flex justify-center items-center h-[calc(100vh-64px)]">
        <img
          src="/terra-branca.png"
          alt="Calcário Terra Branca"
          className="w-[400px] max-w-full"
        />
      </main>
    </div>
  );
};

export default Home;
