/**
 * simulate-run.js
 * Gatilho unificado para executar o play correto,
 * mostrar progress bar real e stream de logs/relatório.
 */
async function executarTeste(playId) {
  const btn = document.querySelector(`button[onclick*="${playId}"]`);
  const progressBar = document.getElementById('barra');
  const progressFill = document.getElementById('barra-fill');
  const logsEl = document.getElementById('logs');

  btn.disabled = true;
  btn.textContent = '⏳ Iniciando…';
  progressBar.classList.remove('hidden');
  progressFill.style.width = '0%';
  logsEl.textContent = '';

  try {
    const resp = await fetch('https://web-production-c891.up.railway.app/executar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({play: playId})
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let received = 0, total = 0;
    const chunks = [];
    btn.textContent = '▶️ Executando…';
    const lenHeader = resp.headers.get('Content-Length');
    total = lenHeader ? parseInt(lenHeader, 10) : 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const text = decoder.decode(value, {stream: true});
      chunks.push(text);
      received += value.length;
      logsEl.textContent = chunks.join('');

      if (total) {
        const pct = Math.floor((received / total) * 100);
        progressFill.style.width = pct + '%';
      } else {
        const current = parseInt(progressFill.style.width) || 0;
        progressFill.style.width = Math.min(100, current + 5) + '%';
      }
    }

    progressFill.style.width = '100%';
    btn.textContent = '✅ Concluído';
  } catch (err) {
    logsEl.textContent = `❌ ${err.message}`;
    btn.textContent = '⚠️ Erro';
  } finally {
    btn.disabled = false;
  }
}
