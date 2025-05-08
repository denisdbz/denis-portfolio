// scripts.js — global para todos os plays
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  const slug = window.location.pathname.split('/').slice(-2, -1)[0];
  const m    = slug.match(/^play-(\d{2})/);
  const playId = m ? parseInt(m[1], 10) : slug;

  const container = document.getElementById('progress-container');
  container.style.display = 'flex';

  const logs  = document.getElementById('output-box');
  const barra = document.getElementById('progress-bar-fill');
  logs.textContent = 'Iniciando execução...\n';
  barra.style.width  = '0%';

  const source = new EventSource(\`\${baseURL}/api/play/\${playId}/stream\`);
  source.onmessage = e => {
    const text = e.data;
    logs.textContent += text + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
    if (text.match(/Teste finalizado/)) {
      barra.style.width = '100%';
    }
  };
  source.onerror = () => {
    barra.style.width = '100%';
    source.close();
  };
}

window.executarTeste = executarTeste;
