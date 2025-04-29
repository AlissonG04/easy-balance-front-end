function abrirModal() {
  document.getElementById("modal-complemento").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modal-complemento").style.display = "none";
  document.getElementById("placa").value = "";
  document.getElementById("tara").value = "";
  document.getElementById("liquido").value = "";
  document.getElementById("bruto").value = "";
}

function atualizarBruto() {
  const tara = parseFloat(document.getElementById("tara").value) || 0;
  const liquido = parseFloat(document.getElementById("liquido").value) || 0;
  const bruto = tara + liquido;
  document.getElementById("bruto").value = bruto.toFixed(2);
}

function enviarComplemento() {
  const placa = document.getElementById("placa").value;
  const tara = document.getElementById("tara").value;
  const liquido = document.getElementById("liquido").value;
  const bruto = document.getElementById("bruto").value;

  // Aqui enviaremos dados para o back-end - futuramente
  console.log({ placa, tara, liquido, bruto });

  fecharModal();
}

// Vincular botão "Compl." ao modal
document.querySelectorAll(".btn.blue").forEach((btn) => {
  if (btn.textContent.includes("Compl")) {
    btn.addEventListener("click", abrirModal);
  }
});
