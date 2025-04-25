// simulate-run.js
/**
 * Gatilho unificado para executar o play correto,
 * mostrar progress bar real e stream de logs/relatório.
 */
async function executarTeste(playId) {
  // Elementos fixos no HTML de cada play (idem aos seus layouts atuais)
  const btn = document.querySelector('button[onclick*="' + playId + '"]');
  const progressBar = document.getElementById('barra');      // container da barra
  const progressFill = document.getElementById('barra-fill') // parte interna
    || document.querySelector('#barra > div');              // fallback
  const logsEl = document.getElementById('logs');           // where logs appear

  // Reset visual
  btn.disabled = true;
  btn.textContent = '⏳ Iniciando…';
  if (progressBar) progressBar.classList.remove('hidden');
  if (progressFill) progressFill.style.width = '0%';
  if (logsEl) logsEl.textContent = '';

  try {
    // Dispara o POST para o seu backend Flask/Railway
    const resp = await fetch(`https://seu-backend-url.up.railway.app/${playId}`, { method: 'POST' });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    // Leitura em stream da resposta
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let received = 0, total = 0, chunk;
    const chunks = [];

    btn.textContent = '▶️ Executando…';

    // Se o header Content-Length existir, use para progress real
    const lenHeader = resp.headers.get('Content-Length');
    total = lenHeader ? parseInt(lenHeader, 10) : 0;

    while (!(chunk = await reader.read()).done) {
      const text = decoder.decode(chunk.value, { stream: true });
      chunks.push(text);
      received += chunk.value.length;

      // Atualiza logs
      logsEl.textContent = chunks.join('');

      // Atualiza barra de progresso
      if (total) {
        const pct = Math.floor((received / total) * 100);
        progressFill.style.width = pct + '%';
      } else {
        // se não tiver total, avança em step de 5%
        const current = parseInt(progressFill.style.width, 10) || 0;
        progressFill.style.width = Math.min(100, current + 5) + '%';
      }
    }

    // Depois de ler tudo, define 100%
    progressFill.style.width = '100%';
    btn.textContent = '✅ Concluído';

  } catch (err) {
    // Em caso de erro, mostra mensagem
    logsEl.textContent = `❌ ${err.message}`;
    btn.textContent = '⚠️ Erro';
  } finally {
    // Re-habilita botão
    btn.disabled = false;
  }
}
