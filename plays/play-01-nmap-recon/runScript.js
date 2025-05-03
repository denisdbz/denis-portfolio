const outputBox = document.getElementById('output');
const progressFill = document.getElementById('progress-fill');

async function executarTeste() {
  outputBox.textContent = "Iniciando teste...";
  progressFill.style.width = '10%';
  progressFill.style.backgroundColor = '#ff4444';

  try {
    const res = await fetch("https://denis-play-backend.fly.dev/run/play-01-nmap-recon");
    if (!res.ok) throw new Error("Falha ao executar teste");

    progressFill.style.width = '25%';
    progressFill.style.backgroundColor = '#ffaa00';

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let logCompleto = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      logCompleto += chunk;
      outputBox.innerHTML = logCompleto
        .replace(/\n/g, "<br>")
        .replace(/\[INFO\]/g, "<span class='info'>[INFO]</span>")
        .replace(/\[ERRO\]/g, "<span class='erro'>[ERRO]</span>")
        .replace(/\[SUCESSO\]/g, "<span class='sucesso'>[SUCESSO]</span>");
      outputBox.scrollTop = outputBox.scrollHeight;
    }

    progressFill.style.width = '100%';
    progressFill.style.backgroundColor = '#00ff88';
  } catch (error) {
    outputBox.innerHTML += `<br><span class='erro'>[ERRO]</span> ${error.message}`;
    progressFill.style.backgroundColor = '#ff0000';
  }
}
