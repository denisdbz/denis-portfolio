function executarTeste() {
  const logs = document.getElementById("logs");
  logs.textContent = "Executando Nikto...";
  fetch("/executar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ play: "play-08-nikto-scan" }),
  })
