// scripts.js — global para todos os plays
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  // Descobre o slug do play-ex: "play-01-nmap-recon"
  const slug = window.location.pathname.split('/').slice(-2, -1)[0];
  const m    = slug.match(/^play-(\d{2})/);
  const playId = m ? parseInt(m[1], 10) : slug;

  // Exibe progresso/log
  const container = document.getElementById('progress-container');
  container.style.display = 'flex';

  const logs  = document.getElementById('output-box');
  const barra = document.getElementById('progress-bar-fill');
  logs.textContent = 'Iniciando execução...\\n';
  barra.style.width  = '0%';

  const source = new EventSource(`${baseURL}/api/play/${playId}/stream`);
  source.onmessage = e => {
    const text = e.data;
    logs.textContent += text + '\\n';
    logs.scrollTop = logs.scrollHeight;
    // progresso baseado no tamanho do log
    barra.style.width = Math.min(100, logs.textContent.length/5) + '%';
    if (text.includes('Teste finalizado')) {
      barra.style.width = '100%';
    }
  };
  source.onerror = () => {
    barra.style.width = '100%';
    source.close();
  };
}

// Expõe a função para onclick inline
window.executarTeste = executarTeste;
