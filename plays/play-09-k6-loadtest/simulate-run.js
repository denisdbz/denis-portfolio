function executarTeste() {
  const log = document.getElementById("log");
  log.innerHTML = "[INFO] Simulando k6...<br>Requisições simuladas:<br>";
  for (let i = 1; i <= 5; i++) {
    log.innerHTML += `GET / - 200 OK<br>`;
  }
  log.innerHTML += "[SUCESSO] Teste finalizado.";
}
