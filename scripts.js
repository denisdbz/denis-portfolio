// File: denis-portfolio/scripts.js

function iniciarStream() {
  const outputBox      = document.getElementById('output-log');
  const progressFill   = document.getElementById('progress-bar-fill');
  const container      = document.getElementById('progress-container');

  // revela a área de progresso/log
  container.classList.remove('hidden');
  outputBox.textContent = 'Iniciando execução...\n';
  progressFill.style.width = '10%';

  // extrai o nome do play a partir da URL atual
  const pathSegments = window.location.pathname.split('/').filter(Boolean);
  // ex: ["plays","play-03-sqlmap-dvwa","index.html"] → "play-03-sqlmap-dvwa"
  const playName     = pathSegments[pathSegments.length - 2];

  // seu túnel LocalTunnel apontando para o backend
  const baseURL = 'https://denis-play-backend.loca.lt';

  // abre um EventSource dinâmico para o play correto
  const evt = new EventSource(`${baseURL}/stream/${playName}`);

  evt.onmessage = event => {
    outputBox.textContent += event.data + '\n';
    outputBox.scrollTop = outputBox.scrollHeight;

    // simples lógica de progresso (ajuste ao seu critério)
    if (event.data.match(/SUCESSO|Teste finalizado/)) {
      progressFill.style.width = '100%';
      setTimeout(() => evt.close(), 1500);
    } else {
      // avança a barra 15% a cada mensagem
      let pct = parseInt(progressFill.style.width) + 15;
      progressFill.style.width = Math.min(pct, 95) + '%';
    }
  };

  evt.onerror = () => {
    evt.close();
    outputBox.textContent += '\n❌ Erro ao conectar ao servidor.';
  };
}

// manter compatibilidade com onclick antigos
function executarTeste() {
  iniciarStream();
}
