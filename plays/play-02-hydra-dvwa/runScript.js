async function executarTeste() {
  const alvo = document.getElementById("alvo").value.trim();
  const logEl = document.getElementById("log");
  const progressBar = document.getElementById("progressBar");

  if (!alvo) {
    logEl.textContent = "⚠️ Por favor, informe o IP ou domínio da DVWA.";
    return;
  }

  logEl.textContent = "⏳ Iniciando teste...\n";
  progressBar.style.width = "5%";

  try {
    const res = await fetch("https://denis-play-backend.fly.dev/run/play-02-hydra-dvwa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alvo })
    });

    progressBar.style.width = "30%";
    const data = await res.json();

    if (data.output) {
      progressBar.style.width = "80%";
      logEl.textContent += data.output.replace(/\n/g, "\n");
      progressBar.style.width = "100%";
    } else {
      logEl.textContent += "❌ Erro ao executar o teste.\n";
    }
  } catch (err) {
    logEl.textContent += "❌ Falha na comunicação com o servidor.\n";
  }
}
