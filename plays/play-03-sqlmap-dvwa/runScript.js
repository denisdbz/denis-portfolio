async function executarTeste() {
  const logs = document.getElementById("logs");
  const progress = document.querySelector(".progress");
  logs.innerText = "Iniciando teste...\n";
  progress.style.width = "5%";

  const evt = new EventSource("https://denis-play-backend.fly.dev/stream/play-03-sqlmap-dvwa");

  evt.onmessage = function(event) {
    logs.innerText += event.data + "\n";
    logs.scrollTop = logs.scrollHeight;

    if (event.data.includes("Iniciando")) progress.style.width = "20%";
    else if (event.data.includes("sqlmap")) progress.style.width = "60%";
    else if (event.data.includes("SUCESSO") || event.data.includes("relatório")) progress.style.width = "100%";
  };

  const res = await fetch("https://denis-play-backend.fly.dev/run/play-03-sqlmap-dvwa");
  if (!res.ok) logs.innerText += "\n❌ Erro ao iniciar teste.";
}
