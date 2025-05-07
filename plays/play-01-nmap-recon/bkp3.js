async function executarTeste() {
  const outputBox = document.getElementById('output-log');
  const progressFill = document.getElementById('progress-bar-fill');
  const container = document.getElementById('progress-container');

  container.classList.remove('hidden');
  outputBox.textContent = 'Iniciando teste...\n';
  progressFill.style.width = '10%';

  try {
    const res = await fetch('https://0763-2804-388-c3d3-89b8-ee4b-66fe-8eb4-fadd.ngrok-free.app/run/play-01-nmap-recon');

    if (!res.ok) throw new Error('Falha ao executar teste');

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    progressFill.style.width = '25%';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      outputBox.textContent += chunk;
      outputBox.scrollTop = outputBox.scrollHeight;
    }

    progressFill.style.width = '100%';
  } catch (err) {
    outputBox.textContent += `\n[ERRO] ${err.message}`;
  }
}
