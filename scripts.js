// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

/**
 * Executa o stream de dados para um play específico
 */
function executarTeste() {
  // Extrai o número do play da URL (play-01 → 1, play-04 → 4, etc.)
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  // Seleciona elementos de log e barra de progresso (suporta variações de IDs/classes)
  const logs = document.getElementById('output-log')
             || document.getElementById('output-box')
             || document.getElementById('logs');
  const barra = document.querySelector('.barra-preenchida')
             || document.getElementById('progress-bar-fill')
             || document.getElementById('progress-fill');
  const container = document.getElementById('progress-container');

  // Se não encontrar componentes, aborta
  if (!logs || !barra || !container) {
    console.error('Não encontrei o container de log/barra:', logs, barra, container);
    return;
  }

  // Limpa e mostra o container
  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  // Abre conexão SSE
  const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  source.onmessage = (e) => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => source.close();
}

/**
 * Configurações de modais, theme toggle, etc.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Abrir modais
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal');
      const modal = document.getElementById(`modal-${id}`);
      if (modal) modal.classList.remove('hidden');
    });
  });

  // Fechar modais via botão
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-close');
      const modal = document.getElementById(`modal-${id}`);
      if (modal) modal.classList.add('hidden');
    });
  });

  // Fechar ao clicar fora do conteúdo
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
});
