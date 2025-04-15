import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [carregadeira, setCarregadeira] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(null);
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    setErro("");

    if (!nome || !senha) {
      return setErro("Preencha usuário e senha.");
    }

    try {
      const res = await api.post("/login", { nome, senha });

      if (!res.data.success) {
        return setErro(res.data.message || "Falha no login.");
      }

      const tipo = res.data.tipo;
      setTipoUsuario(tipo);

      if (tipo === "operador") {
        if (!carregadeira) {
          return setErro("Informe o número da carregadeira.");
        }

        navigate("/operador", {
          state: { paNumero: carregadeira },
        });
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Erro no login:", err.response?.data || err.message);
      setErro("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <img src="/logo.png" alt="Logo" className="w-16 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-blue-700 mb-6">
          EASY <span className="text-blue-500">BALANCE</span>
        </h2>

        <input
          type="text"
          placeholder="Usuário:"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-200"
        />
        <input
          type="password"
          placeholder="Senha:"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-200"
        />

        {tipoUsuario === "operador" && (
          <input
            type="number"
            placeholder="Num. Carregadeira:"
            value={carregadeira}
            onChange={(e) => setCarregadeira(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-gray-200"
          />
        )}

        {erro && <p className="text-red-600 text-sm mb-4">{erro}</p>}

        <button
          onClick={handleLogin}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold w-full py-2 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
