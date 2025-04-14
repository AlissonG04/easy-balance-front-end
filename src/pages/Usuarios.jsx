import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Jhon", tipo: "Admin" },
    { id: 2, nome: "Jane", tipo: "Desktop" },
    { id: 3, nome: "Pedro", tipo: "Operador" },
  ]);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    tipo: "Admin",
    senha: "",
  });

  const handleSalvar = () => {
    if (novoUsuario.nome.trim() === "" || novoUsuario.senha.trim() === "") {
      return alert("Preencha todos os campos obrigatórios.");
    }

    const novo = {
      id: usuarios.length + 1,
      ...novoUsuario,
    };

    setUsuarios([...usuarios, novo]);
    setNovoUsuario({ nome: "", tipo: "Admin", senha: "" });
    setMostrarFormulario(false);
  };

  return (
    <div className="min-h-screen bg-gray-300">
      {/* TOPO */}
      <header className="bg-white flex justify-between items-center px-6 py-3 shadow">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-10" />
          <h1 className="text-xl font-bold text-blue-700">
            EASY <span className="text-blue-500">BALANCE</span>
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigate("/balanca")}
            className="bg-blue-700 text-white px-4 py-1 rounded"
          >
            Balança
          </button>
          <button
            onClick={() => navigate("/relatorios")}
            className="bg-blue-700 text-white px-4 py-1 rounded"
          >
            Relatórios
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Sair
          </button>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="flex justify-center py-10">
        <div className="bg-white rounded p-6 shadow-md w-full max-w-3xl">
          {/* TABELA */}
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-4 py-2">Usuário</th>
                <th className="text-left px-4 py-2">Tipo</th>
                <th className="text-left px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-t">
                  <td className="px-4 py-2">{usuario.nome}</td>
                  <td className="px-4 py-2">{usuario.tipo}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button className="bg-blue-700 text-white px-3 py-1 rounded">
                      Editar
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* BOTÃO NOVO */}
          <div className="mt-6">
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
            >
              Novo Usuário
            </button>
          </div>

          {/* FORMULÁRIO */}
          {mostrarFormulario && (
            <div className="mt-6 bg-gray-100 p-4 rounded shadow">
              <h3 className="font-bold mb-4">Novo Usuário</h3>
              <div className="flex flex-col gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nome do usuário"
                  value={novoUsuario.nome}
                  onChange={(e) =>
                    setNovoUsuario({ ...novoUsuario, nome: e.target.value })
                  }
                  className="p-2 rounded bg-white"
                />

                <select
                  value={novoUsuario.tipo}
                  onChange={(e) =>
                    setNovoUsuario({ ...novoUsuario, tipo: e.target.value })
                  }
                  className="p-2 rounded bg-white"
                >
                  <option value="Admin">Admin</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Operador">Operador</option>
                </select>

                <input
                  type="password"
                  placeholder="Senha"
                  value={novoUsuario.senha}
                  onChange={(e) =>
                    setNovoUsuario({ ...novoUsuario, senha: e.target.value })
                  }
                  className="p-2 rounded bg-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSalvar}
                  className="bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setMostrarFormulario(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Usuarios;
