// simulate-run.js (corrigido – substitua o arquivo inteiro por este)
/**
 * Gatilho unificado para executar o play correto,
 * mostrar progress bar real e stream de logs/relatório.
 */
async function executarTeste(playId) {
  const btn   = document.querySelector(`button[onclick*="${playId}"]`);
  const bar   = document.getElementById('barra');
  const fill  = document.getElementById('barra-fill') || bar?.firstElementChild;
  const logs  = document.getElementById('logs');

  // Reset
  btn.disabled = true;
  btn.textContent = '⏳ Iniciando…';
  bar?.classList.remove('hidden');
  if (fill) fill.style.width = '0%';
  if (logs) logs.innerHTML = '';

  try {
    /* --- animação simples da barra durante o fetch --- */
    let pct = 0;
    const simInterval = setInterval(() => {
      pct = Math.min(90, pct + 10);
      if (fill) fill.style.width = pct + '%';
    }, 250);

    /* --- requisição ao backend --- */
    const resp = await fetch('https://web-production-c891.up.railway.app/executar', {
      method : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify({ play: playId })
    });

    clearInterval(simInterval);
    if (fill) fill.style.width = '100%';

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    /* --- exibe saída com quebras de linha --- */
    const data = await resp.json();
    if (data.saida && logs) {
      logs.innerHTML = data.saida
        .replace(/&/g, '&amp;')   // escaping mínimo
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
    }

    btn.textContent = '✅ Concluído';
  } catch (err) {
    if (logs) logs.textContent = `❌ ${err.message}`;
    btn.textContent = '⚠️ Erro';
  } finally {
    btn.disabled = false;
  }
}
