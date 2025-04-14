import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BalancaBox = ({ titulo }) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 className="text-center text-xl font-bold mb-4">{titulo}</h2>

      <div className="flex justify-center space-x-4 mb-6">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-1 rounded">
          Iniciar
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1 rounded">
          Parar
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded">
          Compl.
        </button>
      </div>

      <div className="bg-gray-300 text-center text-5xl font-bold py-6 mb-4">
        0
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Histórico de Pesagens:</h3>
        <div className="bg-gray-300 h-40 rounded p-2 overflow-y-auto" />
      </div>
    </div>
  );
};

const Balanca = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("Balança 01");

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Topo */}
      <header className="bg-white flex justify-between items-center px-6 py-3 shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10" />
          <h1 className="text-xl font-bold text-blue-700">
            EASY <span className="text-blue-500">BALANCE</span>
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="bg-blue-700 text-white font-bold px-4 py-1 rounded outline-none"
          >
            <option value="Balança 01">Bal. 01</option>
            <option value="Balança 02">Bal. 02</option>
            <option value="Simultâneo">Simultâneo</option>
          </select>

          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1 rounded"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex justify-center items-start py-10 px-4 gap-8 flex-wrap">
        {tipo === "Simultâneo" ? (
          <>
            <BalancaBox titulo="BALANÇA 01" />
            <BalancaBox titulo="BALANÇA 02" />
          </>
        ) : (
          <BalancaBox titulo={tipo.toUpperCase()} />
        )}
      </main>
    </div>
  );
};

export default Balanca;
