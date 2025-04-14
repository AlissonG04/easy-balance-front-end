import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Validação simples (depois vamos substituir por autenticação real)
    if (usuario && senha) {
      navigate("/home");
    } else {
      alert("Preencha usuário e senha!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-10 rounded shadow-md w-full max-w-sm text-center">
        <img
          src="/logo.png"
          alt="Logo Easy Balance"
          className="mx-auto mb-4 w-24"
        />
        <h2 className="text-xl font-bold text-blue-700">
          EASY <span className="text-blue-500">BALANCE</span>
        </h2>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Usuário:"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full mb-3 px-4 py-2 bg-gray-200 rounded outline-none"
          />
          <input
            type="password"
            placeholder="Senha:"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full mb-4 px-4 py-2 bg-gray-200 rounded outline-none"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-800"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
