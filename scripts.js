// ===== Scroll para Seções =====
document.querySelectorAll('nav ul li a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Troca de Tema Claro/Escuro =====
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// ===== Modal Por Dentro =====
const modal = document.getElementById('modal-por-dentro');
const modalContent = document.getElementById('modal-play-content');
const porDentroButtons = document.querySelectorAll('.btn-por-dentro');
const closeModalBtn = document.querySelector('.close-modal');

porDentroButtons.forEach(btn => {
  btn.addEventListener('click', async () => {
    const playNumber = btn.getAttribute('data-play');
    const response = await fetch(`posts/play-${playNumber}.html`);
    const content = await response.text();
    modalContent.innerHTML = content;
    modal.classList.remove('hidden');
  });
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// ===== Buscar Plays =====
const searchInput = document.getElementById('search-input');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  cards.forEach(card => {
    const title = card.querySelector('h3').innerText.toLowerCase();
    card.style.display = title.includes(searchTerm) ? 'block' : 'none';
  });
});
