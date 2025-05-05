function executarTeste() {
  const ip = document.getElementById("ipInput").value;
  if (!ip) {
    alert("Por favor, insira um IP válido.");
    return;
  }

  const logs = document.getElementById("logs");
  const progressBar = document.getElementById("progressBar");
  logs.textContent = "";
  progressBar.style.width = "0%";

  fetch(`https://denis-play-backend.fly.dev/run/play-02-hydra-dvwa`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip })
  });

  const eventSource = new EventSource(`https://denis-play-backend.fly.dev/stream/play-02-hydra-dvwa`);
  let progress = 0;

  eventSource.onmessage = function(event) {
    logs.textContent += event.data + "\\n";
    logs.scrollTop = logs.scrollHeight;
    if (progress < 95) progress += 5;
    progressBar.style.width = progress + "%";
  };

  eventSource.onerror = function() {
    progressBar.style.width = "100%";
    eventSource.close();
  };
}

function voltar() {
  window.location.href = "../../index.html";
}
