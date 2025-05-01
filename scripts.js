// ======================================================================
// scripts.js
// ======================================================================

// 1) Typed subtitle animation
(function() {
  const subtitleEl = document.getElementById('typed-subtitle');
  const subtitleText = 'QA • Pentest • DevSecOps';
  let idx = 0;
  function type() {
    if (idx <= subtitleText.length) {
      subtitleEl.textContent = subtitleText.slice(0, idx++);
      setTimeout(type, 100);
    }
  }
  type();
})();

// 2) Theme toggle + persistence
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('light-mode') ? 'light' : 'dark'
  );
});

// 3) Abre modais "Sobre", "Ajuda", "News"
['sobre','ajuda','news'].forEach(id => {
  document.getElementById(`btn-${id}`).addEventListener('click', e => {
    e.preventDefault();
    document.getElementById(`modal-${id}`).classList.remove('hidden');
  });
});

// 4) Fecha qualquer modal (botão × ou ESC)
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.close;
    document.getElementById(`modal-${modalId}`).classList.add('hidden');
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  }
});

// 5) "Por Dentro" de cada Play, carrega HTML e monta UM só conjunto de botões
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2, '0');
    const modal = document.getElementById('modal-por-dentro');
    const container = document.getElementById('modal-play-content');

    // abre modal e indica loading
    modal.classList.remove('hidden');
    container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';

    try {
      const resp = await fetch(`posts/play-${id}.html`);
      if (!resp.ok) throw new Error('Não encontrado');
      const html = await resp.text();
      container.innerHTML = html;
    } catch (err) {
      console.error(err);
      container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
      return;
    }

    // remove qualquer bloco de ações já existente
    const antigo = container.querySelector('.modal-actions');
    if (antigo) antigo.remove();

    // monta o bloco de botões
    const playUrl = btn.closest('.card').querySelector('a.btn').href;
    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    actions.innerHTML = `
      <a href="${playUrl}" class="btn"><i class="icon-play"></i> Ir ao Play</a>
      <button class="btn-por-dentro" id="btn-close-pordentro">← Voltar à Home</button>
    `;
    container.appendChild(actions);

    // fecha e rola de volta à grid
    document.getElementById('btn-close-pordentro').addEventListener('click', () => {
      modal.classList.add('hidden');
      document.getElementById('plays').scrollIntoView({ behavior: 'smooth' });
    });
  });
});
