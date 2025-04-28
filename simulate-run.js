/**
 * simulate-run.js
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
    const resp = await fetch('/executar', {
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

      // Atualiza a barra e a cor
      const pct = total
        ? Math.floor((received / total) * 100)
        : Math.min(100, parseInt(progressFill.style.width) + 5);
      progressFill.style.width = pct + '%';

      // cor dinâmica: verde <50, amarelo <80, vermelho ≥80
      if (pct < 50) progressFill.style.background = '#00ff9f';
      else if (pct < 80) progressFill.style.background = '#ffe600';
      else progressFill.style.background = '#ff4d4d';
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
