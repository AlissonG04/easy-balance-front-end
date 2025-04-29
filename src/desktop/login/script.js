function login() {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  // Validação Simples
  if (usuario === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }

  // Aqui será feita a chamada para API
  console.log("Usuário:", usuario);
  console.log("Senha:", senha);
}
