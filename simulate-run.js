// simulate-run.js → run.js (podemos até renomear pra run.js)
async function executarTeste(real = true) {
  const barra = document.getElementById('barra');
  const barraFill = document.getElementById('barra-fill');
  const logs = document.getElementById('logs');

  barra.classList.remove('hidden');
  barraFill.style.width = '0%';
  logs.textContent = '';

  try {
    if (real) {
      // usa EventSource para consumir SSE
      const playId = window.location.pathname.split('/').slice(-2, -1)[0];
      const evtSource = new EventSource('/executar?play=' + playId);
      let percent = 0;

      evtSource.onmessage = e => {
        logs.textContent += e.data + '\n';
        percent = Math.min(100, percent + 5);
        barraFill.style.width = percent + '%';
        logs.scrollTop = logs.scrollHeight;
      };

      evtSource.onerror = () => {
        evtSource.close();
        logs.textContent += '\n[ERRO] conexão encerrada.';
      };
    } else {
      // código de fallback/simulação (se precisar)
      logs.textContent = '[SIMULAÇÃO] Nenhum teste real disparado.';
    }
  } catch (err) {
    logs.textContent = '[ERRO] ' + err.message;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('button[data-action="run"]');
  btn?.addEventListener('click', () => executarTeste(true));
});
