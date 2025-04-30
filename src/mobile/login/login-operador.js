function loginOperador() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;
  const pa = document.getElementById("paCarregadeira").value;

  if (!usuario || !senha || !pa) {
    alert("Preencha todos os campos.");
    return;
  }

  // Aqui será feita requisição para altenticação - Futuramente
  console.log("Login operador:", { usuario, senha, pa });
}
