/**
 * simulate-run.js
 * Envia requisição ao back-end e exibe barra de progresso e logs em tempo real.
 */
async function executarTeste(playId) {
  const btn = document.querySelector(`button[onclick*="${playId}"]`);
  const barra = document.getElementById('barra');
  const barraFill = document.getElementById('barra-fill');
  const logsEl = document.getElementById('logs');

  btn.disabled = true;
  btn.textContent = '⏳ Iniciando…';
  barra.classList.remove('hidden');
  barraFill.style.width = '0%';
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
    let recebido = 0, total = 0;
    const partes = [];
    btn.textContent = '▶️ Executando…';

    const lenHeader = resp.headers.get('Content-Length');
    total = lenHeader ? parseInt(lenHeader, 10) : 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const texto = decoder.decode(value, {stream: true});
      partes.push(texto);
      recebido += value.length;
      logsEl.textContent = partes.join('');

      if (total) {
        const pct = Math.floor((recebido / total) * 100);
        barraFill.style.width = pct + '%';
      } else {
        const atual = parseInt(barraFill.style.width) || 0;
        barraFill.style.width = Math.min(100, atual + 5) + '%';
      }
    }

    barraFill.style.width = '100%';
    btn.textContent = '✅ Concluído';
  } catch (err) {
    logsEl.textContent = `❌ ${err.message}`;
    btn.textContent = '⚠️ Erro';
  } finally {
    btn.disabled = false;
  }
}