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

let usuarioEditandoId = null;

function abrirModalEdicao(usuario) {
  usuarioEditandoId = usuario.id;

  document.getElementById("editar-usuario-nome").value = usuario.nome;
  document.getElementById("editar-usuario-senha").value = "";
  document.getElementById("editar-usuario-tipo").value = usuario.tipo;

  document.getElementById("modal-editar-usuario").style.display = "flex";
}

function fecharModalEdicao() {
  document.getElementById("modal-editar-usuario").style.display = "none";
  document.getElementById("editar-usuario-nome").value = "";
  document.getElementById("editar-usuario-senha").value = "";
  document.getElementById("editar-usuario-tipo").value = "Administrador";
  usuarioEditandoId = null;
}

function salvarEdicaoUsuario() {
  const nome = document.getElementById("editar-usuario-nome").value;
  const senha = document.getElementById("editar-usuario-senha").value;
  const tipo = document.getElementById("editar-usuario-tipo").value;

  if (!nome) {
    alert("Nome do usuário é obrigatório.");
    return;
  }

  // Enviar para backend
  console.log("Usuário editado:", {
    id: usuarioEditandoId,
    nome,
    senha: senha || "(sem alteração)",
    tipo,
  });

  fecharModalEdicao();
}

//Adaptar com base real da API - Fururamente
document.querySelectorAll(".btn.blue").forEach((btn) => {
  if (btn.textContent.includes("Editar")) {
    btn.addEventListener("click", () => {
      // Dados fictícios para exemplo:
      const usuario = {
        id: 1,
        nome: btn.closest("tr").children[0].textContent,
        tipo: btn.closest("tr").children[1].textContent,
      };
      abrirModalEdicao(usuario);
    });
  }
});
