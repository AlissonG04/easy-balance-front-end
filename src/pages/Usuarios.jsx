import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Usuarios = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    tipo: "admin",
    senha: "",
  });
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [modalExcluirAberto, setModalExcluirAberto] = useState(false);
  const [usuarioParaExcluir, setUsuarioParaExcluir] = useState(null);

  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    }
    carregarUsuarios();
  }, []);

  const handleSalvar = async () => {
    if (novoUsuario.nome.trim() === "" || novoUsuario.senha.trim() === "") {
      return alert("Preencha todos os campos obrigatórios.");
    }
    try {
      await api.post("/usuarios", novoUsuario);
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
      setNovoUsuario({ nome: "", tipo: "admin", senha: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  const handleSalvarEdicao = async () => {
    if (usuarioEditando.nome.trim() === "") {
      return alert("Nome obrigatório.");
    }
    try {
      await api.put(`/usuarios/${usuarioEditando.id}`, usuarioEditando);
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
      setUsuarioEditando(null);
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };

  const handleExcluir = async () => {
    if (usuarioParaExcluir) {
      try {
        await api.delete(`/usuarios/${usuarioParaExcluir.id}`);
        const res = await api.get("/usuarios");
        setUsuarios(res.data);
      } catch (error) {
        console.error(
          "Erro ao excluir usuário:",
          error.response?.data || error.message
        );
      }
      setModalExcluirAberto(false);
      setUsuarioParaExcluir(null);
    }
  };

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
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-1 rounded"
          >
            Voltar
          </button>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="flex justify-center py-10">
        <div className="bg-white rounded p-6 shadow-md w-full max-w-3xl">
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
                    <button
                      className="bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={() => {
                        setUsuarioEditando(usuario);
                        setMostrarFormulario(false);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      onClick={handleExcluir}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6">
            <button
              onClick={() => {
                setMostrarFormulario(true);
                setUsuarioEditando(null);
              }}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded"
            >
              Novo Usuário
            </button>
          </div>

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
                  <option value="admin">Admin</option>
                  <option value="desktop">Desktop</option>
                  <option value="operador">Operador</option>
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

          {usuarioEditando && (
            <div className="mt-6 bg-gray-100 p-4 rounded shadow">
              <h3 className="font-bold mb-4">Editar Usuário</h3>
              <div className="flex flex-col gap-4 mb-4">
                <input
                  type="text"
                  value={usuarioEditando.nome}
                  onChange={(e) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      nome: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white"
                />
                <select
                  value={usuarioEditando.tipo}
                  onChange={(e) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      tipo: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white"
                >
                  <option value="admin">Admin</option>
                  <option value="desktop">Desktop</option>
                  <option value="operador">Operador</option>
                </select>
                <input
                  type="password"
                  placeholder="Nova senha"
                  value={usuarioEditando.senha || ""}
                  onChange={(e) =>
                    setUsuarioEditando({
                      ...usuarioEditando,
                      senha: e.target.value,
                    })
                  }
                  className="p-2 rounded bg-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSalvarEdicao}
                  className="bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setUsuarioEditando(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {modalExcluirAberto && usuarioParaExcluir && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4 text-center">
                  Confirmar Exclusão
                </h2>
                <p className="text-center mb-6">
                  Deseja realmente excluir o usuário{" "}
                  <strong>{usuarioParaExcluir.nome}</strong>?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setModalExcluirAberto(false);
                      setUsuarioParaExcluir(null);
                    }}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleExcluir}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Usuarios;
