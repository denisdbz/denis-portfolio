
async function executarTeste() {
  const logBox = document.getElementById("output-log");
  const progress = document.getElementById("progress-bar-fill");
  logBox.textContent = "Iniciando teste...";
  progress.style.width = "10%";

  try {
    const res = await fetch("https://0763-2804-388-c3d3-89b8-ee4b-66fe-8eb4-fadd.ngrok-free.app/run/play-01-nmap-recon");
    if (!res.ok) throw new Error("Falha ao executar o teste");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    progress.style.width = "25%";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      logBox.textContent += decoder.decode(value);
      logBox.scrollTop = logBox.scrollHeight;
    }

    progress.style.width = "100%";
  } catch (err) {
    logBox.textContent = "[ERRO] " + err.message;
    progress.style.width = "0%";
  }
}
