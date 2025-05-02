document.addEventListener('DOMContentLoaded', () => {
  // abre modais
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(`modal-${btn.dataset.modal}`)
        .classList.remove('hidden');
    });
  });

  // fechar modais
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.add('hidden');
    });
  });
  // fechar clicando fora
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  // busca de Plays
  const search = document.querySelector('.search');
  if (search) {
    search.addEventListener('input', () => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('.card').forEach(card => {
        card.style.display =
          card.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }
});

// inicia SSE para executar teste
function startTest(playId) {
  const pc = document.getElementById('progress-container');
  const fill = document.querySelector('.fill');
  const out  = document.getElementById('output-box');
  if (!pc||!fill||!out) return;

  pc.classList.remove('hidden');
  fill.style.width = '0%';
  out.textContent = '';

  const es = new EventSource(`/stream/${playId}`);
  es.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.progress !== undefined)
      fill.style.width = d.progress + '%';
    if (d.log !== undefined) {
      out.textContent += d.log + "\n";
      out.scrollTop = out.scrollHeight;
    }
  };
  es.addEventListener('end', () => es.close());
}
