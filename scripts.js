// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // Inicia AOS
  AOS.init({ duration: 800, once: true });

  // Typed subtitle
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // Theme toggle + persistência
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // Função genérica de criação de modal
  function makeModal(id, title, content) {
    if (document.getElementById('modal-' + id)) return;
    const m = document.createElement('div');
    m.id = 'modal-' + id;
    m.className = 'modal hidden';
    m.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>${content}
      </div>`;
    document.body.appendChild(m);
  }

  // Modais fixos (Sobre, Ajuda, News) já configurados antes...

  // Timeline interativa no modal “Sobre”
  document.querySelectorAll('.timeline-toggle').forEach(btn => {
    const detail = btn.nextElementSibling;
    detail.classList.add('hidden');
    btn.addEventListener('click', () => detail.classList.toggle('hidden'));
  });

  // “Por Dentro” de cada Play (idem ao anterior)

  // Busca com debounce
  const search = document.getElementById('search-input');
  let timer;
  search.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    }, 200);
  };

  // Fechar modais com ESC ou “×”
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      document.getElementById(`modal-${btn.dataset.close}`).classList.add('hidden');
    };
  });

  // Registrar Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado'))
        .catch(err => console.error('Falha no SW:', err));
    });
  }
});
