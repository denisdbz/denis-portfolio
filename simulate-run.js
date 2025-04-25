// simulate-run.js
/**
 * Função genérica para disparar o teste do play desejado.
 * Usa o backend em Flask (Railway) para executar o correspondente run.sh.
 */
async function executarTeste(playId) {
  const button = document.getElementById('run-btn');
  const logs = document.getElementById('logs');
  const progressContainer = document.getElementById('progress');
  const bar = document.getElementById('bar');

  // Reset UI
  logs.textContent = '';
  progressContainer.classList.remove('hidden');
  bar.style.width = '0%';
  button.disabled = true;
  button.textContent = 'Iniciando…';

  try {
    // Dispara o endpoint no backend
    const response = await fetch(`https://your-backend-url.up.railway.app/${playId}`, {
      method: 'POST'
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let received = '';
    let percentage = 0;

    button.textContent = 'Executando…';

    // Lê o stream de saída em tempo real
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += decoder.decode(value, { stream: true });
      logs.textContent = received;

      // Atualiza barra de progresso fictícia (simulação)
      percentage = Math.min(100, percentage + 5);
      bar.style.width = `${percentage}%`;
    }

    // Finalização
    bar.style.width = '100%';
    button.textContent = 'Concluído';
  } catch (err) {
    logs.textContent = `❌ Erro: ${err.message}`;
    button.textContent = 'Erro';
  } finally {
    button.disabled = false;
  }
}
