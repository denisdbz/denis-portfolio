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
  const baseURL = 'https://4d2c-177-86-39-143.ngrok-free.app ';

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
