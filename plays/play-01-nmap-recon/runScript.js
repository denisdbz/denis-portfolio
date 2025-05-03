async function executarTeste() {
  const outputBox = document.getElementById("output-box");
  const progressFill = document.getElementById("progress-fill");
  outputBox.textContent = "Iniciando teste...\n";
  progressFill.style.width = "10%";

  try {
    const res = await fetch("https://denis-play-backend.fly.dev/run/play-01-nmap-recon");
    if (!res.ok) throw new Error("Falha ao executar teste");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    progressFill.style.width = "25%";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      outputBox.textContent += chunk;
      outputBox.scrollTop = outputBox.scrollHeight;
    }

    progressFill.style.width = "100%";
  } catch (err) {
    outputBox.textContent += `\n[ERRO] ${err.message}`;
    progressFill.style.width = "100%";
  }
}
