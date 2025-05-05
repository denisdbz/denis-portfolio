function executarTeste() {
  const ip = document.getElementById("alvoInput").value.trim();
  if (!ip) {
    alert("Por favor, informe um IP ou domínio válido.");
    return;
  }

  const log = document.getElementById("logTerminal");
  const barra = document.getElementById("progresso");
  log.innerText = "Iniciando teste...\n";
  barra.style.width = "10%";

  fetch("https://denis-play-backend.fly.dev/run/play-02-hydra-dvwa", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip })
  })
  .then(() => {
    barra.style.width = "40%";
    const evt = new EventSource("https://denis-play-backend.fly.dev/stream/play-02");

    evt.onmessage = function (event) {
      log.innerText += event.data + "\n";
      log.scrollTop = log.scrollHeight;
      barra.style.width = "70%";

      if (event.data.includes("Teste finalizado")) {
        barra.style.width = "100%";
        evt.close();
      }
    };

    evt.onerror = function () {
      log.innerText += "\n[ERRO] Conexão encerrada.";
      evt.close();
    };
  });
}

function voltar() {
  window.location.href = "../../index.html";
}
