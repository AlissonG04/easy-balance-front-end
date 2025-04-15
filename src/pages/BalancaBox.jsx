import React, { useState, useEffect, useRef } from "react";

const AbaComplemento = ({ titulo, pesoAtual, socket }) => {
  const [tara, setTara] = useState(0);
  const [liquido, setLiquido] = useState(0);
  const bruto = Number(tara) + Number(liquido);

  const enviarComplemento = () => {
    const complemento = {
      balanca: titulo,
      brutoDesejado: bruto,
    };
    if (socket?.readyState === 1) {
      socket.send(
        JSON.stringify({ tipo: "complemento-envio", dados: complemento })
      );
      console.log("📤 Enviado para o tablet:", complemento);
    } else {
      console.warn("⚠️ WebSocket não está conectado.");
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mt-4 w-full max-w-md mx-auto">
      <h3 className="text-center font-bold mb-2">{titulo}</h3>

      <div className="grid grid-cols-3 gap-2 text-center mb-4">
        <input
          type="number"
          value={tara}
          onChange={(e) => setTara(e.target.value)}
          className="bg-gray-300 p-2 rounded text-center font-bold"
          placeholder="Tara"
        />
        <input
          type="number"
          value={liquido}
          onChange={(e) => setLiquido(e.target.value)}
          className="bg-gray-300 p-2 rounded text-center font-bold"
          placeholder="Líquido"
        />
        <div className="bg-gray-400 p-2 rounded text-center font-bold">
          {bruto}
        </div>
      </div>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded block mx-auto"
        onClick={enviarComplemento}
      >
        Enviar
      </button>
    </div>
  );
};

const BalancaBox = ({ titulo }) => {
  const [mostrarComplemento, setMostrarComplemento] = useState(false);
  const [pesoAtual, setPesoAtual] = useState(0);
  const socketRef = useRef(null);

  const conectarWebSocket = () => {
    const socket = new WebSocket("ws://localhost:3000");

    socket.onopen = () => {
      console.log("✅ WebSocket conectado");
    };

    socket.onerror = (err) => {
      console.error("❌ Erro WebSocket:", err);
    };

    socket.onclose = () => {
      console.warn("🔄 WebSocket desconectado. Tentando reconectar...");
      setTimeout(conectarWebSocket, 2000);
    };

    socket.onmessage = (event) => {
      const dados = JSON.parse(event.data);
      console.log("📡 Peso recebido no front:", dados);

      if (
        dados.tipo === "peso-atual" &&
        dados.balanca === titulo.toUpperCase()
      ) {
        const peso = parseFloat(dados.valor);
        if (!isNaN(peso)) {
          setPesoAtual(peso);
        } else {
          console.warn("⚠️ Peso inválido (NaN)");
        }
      }
    };

    socketRef.current = socket;
  };

  useEffect(() => {
    conectarWebSocket();
    return () => {
      socketRef.current?.close();
    };
  }, [titulo]);

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-center text-xl font-bold mb-4">{titulo}</h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button className="bg-green-600 text-white font-bold px-4 py-1 rounded">
            Iniciar
          </button>
          <button className="bg-red-600 text-white font-bold px-4 py-1 rounded">
            Parar
          </button>
          <button
            className="bg-blue-600 text-white font-bold px-4 py-1 rounded"
            onClick={() => setMostrarComplemento((prev) => !prev)}
          >
            Compl.
          </button>
        </div>

        <div className="bg-gray-300 text-center text-5xl font-bold py-6 mb-4">
          {isNaN(pesoAtual) ? "—" : pesoAtual}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Histórico de Pesagens:</h3>
          <div className="bg-gray-300 h-40 rounded p-2 overflow-y-auto" />
        </div>
      </div>

      {mostrarComplemento && (
        <AbaComplemento
          titulo={titulo}
          pesoAtual={pesoAtual}
          socket={socketRef.current}
        />
      )}
    </div>
  );
};

export default BalancaBox;
