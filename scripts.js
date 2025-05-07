function iniciarStream() {
  const outputBox = document.getElementById('output-log');
  const progressBar = document.getElementById('progress-bar-fill');
  const container = document.getElementById('progress-container');
  container.classList.remove('hidden');

  outputBox.textContent = 'Iniciando execução...\n';
  progressBar.style.width = '10%';

  const evt = new EventSource('https://135d-177-86-39-143.ngrok-free.app/stream/play-01-nmap-recon');

  evt.onmessage = function (event) {
    outputBox.textContent += event.data + '\n';
    outputBox.scrollTop = outputBox.scrollHeight;

    if (event.data.includes('✔ Teste finalizado')) {
      progressBar.style.width = '100%';
      setTimeout(() => {
        evt.close();
      }, 2000);
    } else {
      progressBar.style.width = Math.min(progressBar.clientWidth + 10, 95) + '%';
    }
  };

  evt.onerror = function () {
    evt.close();
    outputBox.textContent += '\n❌ Erro ao conectar ao servidor.';
  };
}
