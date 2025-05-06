const botao = document.getElementById("btn-executar");
const outputBox = document.getElementById("output");
const progressFill = document.getElementById("progress-fill");

// 🟩 Altere esta URL para o backend em uso (loca.lt ou ngrok)
const BACKEND_URL = "https://denisplayback.loca.lt";

botao.addEventListener("click", async () => {
  botao.disabled = true;
  botao.innerText = "Executando...";
  outputBox.innerText = "Iniciando teste...\n";
  progressFill.style.width = "10%";

  try {
    const res = await fetch(`${BACKEND_URL}/run/play-01-nmap-recon`);
    if (!res.ok) throw new Error("Erro ao executar o teste");

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    progressFill.style.width = "25%";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      outputBox.textContent = buffer;
      outputBox.scrollTop = outputBox.scrollHeight;
    }

    progressFill.style.width = "100%";
    botao.innerText = "✅ Teste Finalizado";
  } catch (err) {
    outputBox.innerText += `\n[ERRO] ${err.message}`;
    progressFill.style.width = "100%";
    botao.innerText = "Erro";
  } finally {
    botao.disabled = false;
    setTimeout(() => {
      botao.innerText = "🚀 Executar Teste";
      progressFill.style.width = "0%";
    }, 3000);
  }
});
