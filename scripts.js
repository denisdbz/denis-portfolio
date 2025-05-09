// --------------------------------------------------------------------------
// TEMA (Dark / Light)
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('dark-mode', savedTheme === 'dark');
themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeToggle.textContent = isDark ? '🌙' : '☀️';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --------------------------------------------------------------------------
// FUNÇÃO GENÉRICA DE MODAL
function setupModal(btnId, modalId) {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modalId);
  const close = modal.querySelector('.modal-close');
  btn.addEventListener('click', () => modal.classList.remove('hidden'));
  close.addEventListener('click', () => modal.classList.add('hidden'));
}
setupModal('sobre-btn', 'sobre-modal');
setupModal('ajuda-btn', 'ajuda-modal');
setupModal('news-btn', 'news-modal');

// --------------------------------------------------------------------------
// FILTRO DE BUSCA NOS PLAYS
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.play-card');
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  cards.forEach(card => {
    const txt = (card.querySelector('h2').textContent +
                 card.querySelector('p').textContent).toLowerCase();
    card.style.display = txt.includes(q) ? '' : 'none';
  });
});
