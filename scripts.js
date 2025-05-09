// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  // Extrai o número do play da URL (play-04 → 4)
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  // Encontra os elementos que acabamos de colocar no HTML
  const logs = document.getElementById('output-log')
            || document.getElementById('output-box')
            || document.getElementById('logs');
  const barra = document.querySelector('.barra-preenchida')
             || document.getElementById('progress-bar-fill')
             || document.getElementById('progress-fill');
  const container = document.getElementById('progress-container');

  // Se algum não existir, aborta
  if (!logs || !barra || !container) {
    console.error('Não encontrei o container de log/barra:', logs, barra, container);
    return;
  }

  // Limpa tudo e mostra o container
  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  // Abre o EventSource no endpoint correto
  const source = new EventSource(
    `${baseURL}/api/play/${playNum}/stream`
  );
  source.onmessage = (e) => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    // Faz a barra andar conforme tamanho do texto
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => {
    source.close();
  };
}
