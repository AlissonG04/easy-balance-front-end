import React from "react";
import { useNavigate } from "react-router-dom";

const Operador = () => {
  const navigate = useNavigate();
  const numeroCarregadeira = "01"; // Pode ser dinâmico no futuro

  return (
    <div className="min-h-screen bg-gray-300">
      <header className="bg-white flex justify-between items-center px-6 py-3 shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10" />
          <h1 className="text-xl font-bold text-blue-700">
            EASY <span className="text-blue-500">BALANCE</span>
          </h1>
        </div>

        <h2 className="text-lg font-semibold text-center flex-1">
          Pá Carregadeira: {numeroCarregadeira}
        </h2>

        <button
          onClick={() => navigate("/login")}
          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1 rounded"
        >
          Sair
        </button>
      </header>

      <main className="flex justify-center items-center h-[calc(100vh-80px)] px-4">
        <div className="bg-white p-10 rounded shadow text-center max-w-2xl w-full">
          <p className="text-lg font-semibold">
            Nenhuma nova solicitação de complemento recebida no momento.
            <br />
            Por favor aguarde...
          </p>
        </div>
      </main>
    </div>
  );
};

export default Operador;
