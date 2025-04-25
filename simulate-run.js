// simulate-run.js
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
    const resp = await fetch(`https://seu-backend-url.up.railway.app/executar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ play: playId })
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let received = 0, total = 0, chunk, buffer = '';

    const lenHeader = resp.headers.get('Content-Length');
    total = lenHeader ? parseInt(lenHeader, 10) : 0;

    btn.textContent = '▶️ Executando…';
    while (!(chunk = await reader.read()).done) {
      const text = decoder.decode(chunk.value, { stream: true });
      buffer += text;
      logsEl.textContent = buffer;
      received += chunk.value.length;

      if (total) {
        const pct = Math.floor((received / total) * 100);
        progressFill.style.width = pct + '%';
      } else {
        const curr = parseInt(progressFill.style.width) || 0;
        progressFill.style.width = Math.min(100, curr + 5) + '%';
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
