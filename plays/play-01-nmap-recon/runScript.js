async function executarTeste() {
  const outputBox = document.getElementById("output");
  const progressFill = document.getElementById("progress-fill");

  outputBox.textContent = "🟡 Iniciando teste...\n";
  progressFill.style.width = "0%";

  try {
    const res = await fetch("https://denis-play-backend.fly.dev/run/play-01-nmap-recon");

    if (!res.ok) {
      outputBox.textContent += `❌ Erro ao executar: ${res.status} ${res.statusText}`;
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let received = "";
    let progress = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      received += decoder.decode(value, { stream: true });

      // Atualiza saída
      outputBox.textContent = received;
      outputBox.scrollTop = outputBox.scrollHeight;

      // Simula progresso
      progress = Math.min(100, progress + 7);
      progressFill.style.width = progress + "%";
    }

    progressFill.style.width = "100%";
    outputBox.textContent += "\n✅ Teste finalizado.";
  } catch (err) {
    outputBox.textContent += `\n❌ Erro: ${err.message}`;
  }
}
