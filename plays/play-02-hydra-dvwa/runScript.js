async function executarTeste() {
  const target = document.getElementById("target-input").value.trim();
  const output = document.getElementById("output-box");
  const progress = document.getElementById("progress-container");
  const fill = document.getElementById("progress-fill");

  if (!target) {
    alert("Por favor, insira o IP ou domínio do alvo.");
    return;
  }

  output.textContent = "Iniciando teste...\n";
  fill.style.width = "0%";
  progress.classList.remove("hidden");

  try {
    const res = await fetch(`https://denis-play-backend.fly.dev/run/play-02-hydra-dvwa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ target })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let received = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += decoder.decode(value, { stream: true });
      output.textContent += received;
      output.scrollTop = output.scrollHeight;

      // Simples avanço da barra
      const logs = received.split("\n").length;
      fill.style.width = `${Math.min(10 + logs * 5, 100)}%`;
    }

    output.textContent += "\n✔️ Teste finalizado!";
    fill.style.width = "100%";
  } catch (err) {
    output.textContent += `\n❌ Erro ao executar: ${err.message}`;
  }
}
