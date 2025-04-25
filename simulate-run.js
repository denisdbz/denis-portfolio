/**
 * simulate-run.js
 * Centralizado: faz POST JSON para /executar e exibe barra, logs, relatório.
 */
async function executarTeste(playId) {
  const btn = document.querySelector(`button[onclick*="${playId}"]`);
  const progressBar = document.getElementById('barra');
  const progressFill = document.getElementById('barra-fill');
  const logsEl = document.getElementById('logs');

  // Reset visual
  btn.disabled = true;
  btn.textContent = '⏳ Executando...';
  progressBar.classList.remove('hidden');
  progressFill.style.width = '0%';
  logsEl.textContent = '';

  try {
    // Progress simulation
    let pct = 0;
    const simInterval = setInterval(() => {
      pct = Math.min(90, pct + 10);
      progressFill.style.width = pct + '%';
    }, 200);

    // Fetch JSON backend
    const resp = await fetch('https://web-production-c891.up.railway.app/executar', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({play: playId})
    });
    clearInterval(simInterval);
    progressFill.style.width = '100%';

    const data = await resp.json();
    if (data.saida) {
      logsEl.textContent = data.saida;
    } else if (data.erro) {
      logsEl.textContent = data.erro;
    }

    btn.textContent = '✅ Concluído';
  } catch (err) {
    logsEl.textContent = `❌ ${err.message}`;
    btn.textContent = '⚠️ Erro';
  } finally {
    btn.disabled = false;
  }
}

// Expondo global
window.executarTeste = executarTeste;
