import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BalancaBox from "./BalancaBox";

const Balanca = () => {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState("Balança 01");

  return (
    <div className="min-h-screen bg-gray-300">
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
            className="bg-red-600 text-white font-bold px-4 py-1 rounded"
          >
            Sair
          </button>
        </div>
      </header>

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
