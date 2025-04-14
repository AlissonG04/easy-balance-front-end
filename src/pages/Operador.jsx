import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Operador = () => {
  const navigate = useNavigate();
  const numeroCarregadeira = "01";
  const [complemento, setComplemento] = useState(null);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [emCarregamento, setEmCarregamento] = useState(false);
  const [pesoAtual, setPesoAtual] = useState(0);

  const alertaSom = new Audio("/sounds/alerta.mp3");

  useEffect(() => {
    alertaSom.load();

    const timer = setTimeout(() => {
      setComplemento({
        balanca: "Balança 01",
        brutoDesejado: "32.500",
      });
      setMostrarAlerta(true);

      alertaSom.play().catch((err) => {
        console.warn(
          "Áudio bloqueado pelo navegador. Precisa de interação.",
          err
        );
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (emCarregamento) {
      const intervalo = setInterval(() => {
        setPesoAtual((prev) => {
          const novoPeso = prev + Math.floor(Math.random() * 500 + 100);
          return novoPeso >= 32500 ? 32500 : novoPeso;
        });
      }, 1000);

      return () => clearInterval(intervalo);
    }
  }, [emCarregamento]);

  const handleResposta = (resposta) => {
    if (resposta === "aceito") {
      setMostrarAlerta(false);
      setEmCarregamento(true);
    } else {
      setMostrarAlerta(false);
      setComplemento(null);
    }
  };

  const handleFinalizar = () => {
    setComplemento(null);
    setMostrarAlerta(false);
    setEmCarregamento(false);
    setPesoAtual(0);
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
        {emCarregamento && complemento ? (
          <div className="bg-white p-10 rounded shadow text-center max-w-xl w-full">
            <p className="text-xl font-bold mb-2">Bruto Desejado:</p>
            <p className="text-4xl font-extrabold bg-gray-200 py-2 mb-6">
              {complemento.brutoDesejado} kg
            </p>
            <p className="text-xl font-bold mb-2">Bruto Atual:</p>
            <p className="text-4xl font-extrabold bg-gray-200 py-2 mb-6">
              {pesoAtual} kg
            </p>
            <button
              onClick={handleFinalizar}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2 rounded"
            >
              Finalizar
            </button>
          </div>
        ) : mostrarAlerta && complemento ? (
          <div className="bg-white p-10 rounded shadow text-center max-w-xl w-full transition duration-300 transform scale-95 animate-fade-in">
            <p className="text-lg font-bold mb-4">
              Nova solicitação de complemento recebida da {complemento.balanca}!
            </p>
            <p className="text-xl font-semibold mb-6">Bruto desejado:</p>
            <p className="text-3xl font-bold text-gray-800 mb-6">
              {complemento.brutoDesejado} kg
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={() => handleResposta("aceito")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded"
              >
                Sim
              </button>
              <button
                onClick={() => handleResposta("recusado")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded"
              >
                Não
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded shadow text-center max-w-2xl w-full">
            <p className="text-lg font-semibold">
              Nenhuma nova solicitação de complemento recebida no momento.
              <br />
              Por favor aguarde...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Operador;
