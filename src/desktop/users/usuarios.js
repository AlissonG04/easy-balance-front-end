const modalUsuario = document.getElementById("modal-usuario");

document.querySelector(".novo-usuario").addEventListener("click", () => {
  modalUsuario.style.display = "flex";
});

function fecharModalUsuario() {
  modalUsuario.style.display = "none";
  document.getElementById("novo-usuario-nome").value = "";
  document.getElementById("novo-usuario-senha").value = "";
  document.getElementById("novo-usuario-tipo").value = "Administrador";
}

function salvarNovoUsuario() {
  const nome = document.getElementById("novo-usuario-nome").value;
  const senha = document.getElementById("novo-usuario-senha").value;
  const tipo = document.getElementById("novo-usuario-tipo").value;

  if (!nome || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  // Aqui será feita requisições para a API
  console.log("Novo usuário:", { nome, senha, tipo });

  fecharModalUsuario();
}
