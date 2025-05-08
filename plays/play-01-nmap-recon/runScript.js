// runScript.js — no topo, defina seu túnel ou domínio estável:
const baseURL = 'https://4d2c-177-86-39-143.ngrok-free.app';

function executarTeste() {
  // exibe a área de progresso/log:
  document.getElementById('progress-container').style.display = 'flex';

  const logs  = document.getElementById('output-box');
  const barra = document.getElementById('progress-bar-fill');
  logs.textContent = 'Iniciando execução...\n';
  barra.style.width  = '0%';

  const source = new EventSource('https://4d2c-177-86-39-143.ngrok-free.app/api/play/1/stream');
  source.onmessage = function(e) {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    // Ajuste da largura conforme tamanho do log:
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = function() {
    source.close();
  };
}
