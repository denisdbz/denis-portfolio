const baseURL = 'https://4d2c-177-86-39-143.ngrok-free.app';

function executarTeste() {
  // mostra o container:
  document.getElementById('progress-container').style.display = 'flex';

  const logs  = document.getElementById('output-box');
  const barra = document.getElementById('progress-bar-fill');
  logs.textContent = 'Iniciando execução...\n';
  barra.style.width  = '0%';

  // **URL ABSOLUTA** para o seu backend via ngrok:
  const source = new EventSource(
    `${baseURL}/api/play/1/stream`
  );

  source.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };

  source.onerror = () => {
    source.close();
  };
}
