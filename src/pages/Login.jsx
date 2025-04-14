import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
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
            className="w-full mb-3 px-4 py-2 bg-gray-200 rounded outline-none"
          />
          <input
            type="password"
            placeholder="Senha:"
            className="w-full mb-4 px-4 py-2 bg-gray-200 rounded outline-none"
          />
          <button className="w-full bg-blue-700 text-white font-bold py-2 rounded hover:bg-blue-800">
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
