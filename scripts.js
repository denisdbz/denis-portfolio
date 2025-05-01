document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle animation
// ===== Typed Subtitle =====
const subtitleText = 'QA • Pentest • DevSecOps';
let ti = 0;
const subtitleEl = document.getElementById('typed-subtitle');
(function typeSubtitle() {
  if (!subtitleEl) return;
  if (ti <= subtitleText.length) {
    subtitleEl.textContent = subtitleText.slice(0, ti++);
    setTimeout(typeSubtitle, 100);
  }
})();

// ===== Theme toggle + persistência =====
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem(
      'theme',
      document.body.classList.contains('light-mode') ? 'light' : 'dark'
    );
  });
}

// ===== Modal genérico =====
function openModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (!modal) return;
  // limpar possíveis footers duplicados
  modal.querySelectorAll('.modal-footer').forEach(f => f.remove());
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// fechar com X e ESC
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    const id = e.target.getAttribute('data-close');
    closeModal(id);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => {
      if (!m.classList.contains('hidden')) {
        m.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});

// abrir os modais fixos (“Sobre”, “Ajuda”, “News”)
['sobre','ajuda','news'].forEach(id => {
  const btn = document.getElementById(`btn-${id}`);
  if (btn) btn.addEventListener('click', e => {
    e.preventDefault();
    openModal(id);
  });
});

// ===== “Por Dentro” de cada play =====
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2, '0');
    const modal = document.getElementById('modal-por-dentro');
    const container = document.getElementById('modal-play-content');

    openModal('por-dentro');
    container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';

    try {
      const resp = await fetch(`posts/play-${id}.html`);
      if (!resp.ok) throw new Error('Não encontrado');
      const html = await resp.text();
      container.innerHTML = html;

      // adicionar rodapé único
      const footer = document.createElement('div');
      footer.className = 'modal-footer';
      footer.innerHTML = `
        <a href="plays/play-${id}-nmap-recon/" class="btn">Ir ao Play</a>
        <a href="index.html" class="btn">← Voltar à Home</a>
      `;
      container.parentNode.appendChild(footer);

    } catch (err) {
      container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
    }
  });
});
