import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const usuariosFake = [
  { nome: "admin", senha: "123", tipo: "Admin" },
  { nome: "jane", senha: "123", tipo: "Desktop" },
  { nome: "pedro", senha: "123", tipo: "Operador" },
];

const Login = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [carregadeira, setCarregadeira] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    const encontrado = usuariosFake.find(
      (u) => u.nome === nome && u.senha === senha
    );

    if (!encontrado) {
      setErro("Usuário ou senha inválidos.");
      setUsuario(null);
      return;
    }

    setUsuario(encontrado); // seta primeiro o tipo de usuário

    // Se for operador, mas ainda não digitou carregadeira, apenas exibe o campo
    if (encontrado.tipo === "Operador" && !carregadeira) {
      setErro("Informe o número da carregadeira.");
      return;
    }

    // Libera acesso
    setErro("");
    if (encontrado.tipo === "Admin" || encontrado.tipo === "Desktop") {
      navigate("/home");
    } else {
      navigate("/operador");
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

        {usuario?.tipo === "Operador" && (
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
