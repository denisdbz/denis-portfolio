// runScript.js — no topo, defina seu túnel ou domínio estável:
const baseURL = 'https://4d2c-177-86-39-143.ngrok-free.app';

function executarTeste() {
  const logs  = document.getElementById('logs')
              || document.getElementById('output-log')
              || document.getElementById('output-box');
  const barra = document.querySelector('.barra-preenchida')
              || document.getElementById('progress-bar-fill')
              || document.getElementById('progress-fill');

  logs.textContent = '';
  barra.style.width  = '0%';

  // **URL corrigida para o endpoint do backend:**
  const source = new EventSource(`${baseURL}/api/play/1/stream`);

  source.onmessage = function(event) {
    logs.textContent += event.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    // aqui você pode refinar a fórmula da largura
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };

  source.onerror = function() {
    source.close();
  };
}
