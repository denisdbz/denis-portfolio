function executarTeste() {
  const playId = 'play-01-nmap-recon'; // usado no endpoint backend
  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const outputBox = document.getElementById('output-box');

  if (!progressContainer || !progressFill || !outputBox) return;

  // Resetar visual
  progressContainer.classList.remove('hidden');
  progressFill.style.width = '0%';
  outputBox.textContent = 'Iniciando teste...\n';

  const evt = new EventSource(`https://web-production-c891.up.railway.app/stream/${playId}`);

  evt.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.progress !== undefined) {
        progressFill.style.width = `${data.progress}%`;
      }

      if (data.log !== undefined) {
        outputBox.textContent += data.log + '\n';
        outputBox.scrollTop = outputBox.scrollHeight;
      }

    } catch (err) {
      outputBox.textContent += '\n[ERRO] Falha ao interpretar mensagem do servidor.\n';
      console.error(err);
    }
  };

  evt.addEventListener('end', () => {
    outputBox.textContent += '\n✔️ Teste finalizado com sucesso.\n';
    evt.close();
  });

  evt.onerror = (err) => {
    outputBox.textContent += '\n[ERRO] Falha de conexão com servidor.\n';
    evt.close();
  };
}
