// File: denis-portfolio/scripts.js

function iniciarStream() {
  const outputBox = document.getElementById('output-log') || document.getElementById('output-box');
  const progressFill = document.getElementById('progress-bar-fill') || document.getElementById('progress-fill');
  const container      = document.getElementById('progress-container');

  // revela a área de progresso/log
  container.classList.remove('hidden');
  outputBox.textContent = 'Iniciando execução...\n';
  progressFill.style.width = '10%';

  // extrai o nome do play a partir da URL atual
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  // ex: ["plays","play-03-sqlmap-dvwa","index.html"] → "play-03-sqlmap-dvwa"
  const slug = pathSegments[pathSegments.length - 2];
  const m = slug.match(/^play-(\d{2})/);
  const playName = m ? `play-${m[1]}` : slug;

  // seu túnel LocalTunnel apontando para o backend
  const baseURL = 'https://4d2c-177-86-39-143.ngrok-free.app';

  // abre um EventSource dinâmico para o play correto
- // abre um EventSource dinâmico para o play correto
- const evt = new EventSource(`${baseURL}/stream/${playName}`);
+ // extrai só o número do play, ex: "play-01-nmap-recon" → 1
+ const m = playName.match(/^play-(\d{2})/);
+ const id = m ? parseInt(m[1], 10) : playName;
+ // a rota do backend (veja app.py)
+ const evt = new EventSource(`${baseURL}/api/play/${id}/stream`);

// manter compatibilidade com onclick antigos
function executarTeste() {
  iniciarStream();
}
