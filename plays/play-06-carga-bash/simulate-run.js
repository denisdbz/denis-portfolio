function executarTeste() {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = "[INFO] Simulando carga...<br>";
  for (let i = 1; i <= 5; i++) {
    logDiv.innerHTML += `Requisição ${i}<br>`;
  }
  logDiv.innerHTML += "[SUCESSO] Teste finalizado.";
}
