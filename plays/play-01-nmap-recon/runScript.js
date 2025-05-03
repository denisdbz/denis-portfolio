
document.getElementById("executar-btn").addEventListener("click", async () => {
  const outputBox = document.getElementById("output");
  const progressFill = document.getElementById("progress-fill");

  outputBox.textContent = "Iniciando teste...";
  progressFill.style.width = "10%";

  try {
    const res = await fetch("https://denis-play-backend.fly.dev/run/play-01-nmap-recon");

    if (!res.ok) throw new Error("Falha ao executar teste");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let received = "";

    progressFill.style.width = "25%";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      received += chunk;
      progressFill.style.width = "50%";
    }

    try {
      const json = JSON.parse(received);
      const formattedLog = json.log
        .replace(/\\n/g, "\n")   // corrige \n vindos como string
        .replace(/\n/g, "<br>")    // quebra de linha real
        .replace(/\u00f3/g, "ó");  // corrige acento
      outputBox.innerHTML = formattedLog;
      progressFill.style.width = "100%";
    } catch (err) {
      outputBox.innerHTML = "Erro ao interpretar resposta do servidor.";
    }
  } catch (error) {
    outputBox.textContent = "[ERRO] " + error.message;
    progressFill.style.width = "0%";
  }
});
