import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Relatorios = () => {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({
    dataInicial: "",
    dataFinal: "",
    balanca: "",
  });

  const dadosSimulados = [
    {
      data: "2025-04-01 08:30",
      balanca: "01",
      bruto: 30500,
      tara: 9500,
      liquido: 21000,
    },
    {
      data: "2025-04-01 09:10",
      balanca: "02",
      bruto: 29000,
      tara: 9000,
      liquido: 20000,
    },
    {
      data: "2025-04-02 10:15",
      balanca: "01",
      bruto: 31000,
      tara: 9700,
      liquido: 21300,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-300">
      {/* Header */}
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
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-1 rounded"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-6">
          Relatório de Pesagens
        </h2>

        {/* Filtros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="date"
            value={filtros.dataInicial}
            onChange={(e) =>
              setFiltros({ ...filtros, dataInicial: e.target.value })
            }
            className="p-2 rounded bg-white"
            placeholder="Data Inicial"
          />
          <input
            type="date"
            value={filtros.dataFinal}
            onChange={(e) =>
              setFiltros({ ...filtros, dataFinal: e.target.value })
            }
            className="p-2 rounded bg-white"
            placeholder="Data Final"
          />
          <select
            value={filtros.balanca}
            onChange={(e) =>
              setFiltros({ ...filtros, balanca: e.target.value })
            }
            className="p-2 rounded bg-white"
          >
            <option value="">Todas as Balanças</option>
            <option value="01">Balança 01</option>
            <option value="02">Balança 02</option>
          </select>
        </div>
        {/* Ações */}
        <div className="flex justify-end gap-4 mb-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Buscar
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Exportar CSV
          </button>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Data/Hora</th>
                <th className="py-2 px-4 text-left">Balança</th>
                <th className="py-2 px-4 text-left">Peso Bruto</th>
              </tr>
            </thead>
            <tbody>
              {dadosSimulados.map((item, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-100">
                  <td className="py-2 px-4">{item.data}</td>
                  <td className="py-2 px-4">{item.balanca}</td>
                  <td className="py-2 px-4">{item.bruto} kg</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Relatorios;
