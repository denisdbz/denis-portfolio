// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 🚀 0) Inicializa o AOS (animações on-scroll)
  if (window.AOS) {
    AOS.init({
      duration: 600,  // duração das animações em ms
      once: true      // anima apenas uma vez
    });
  }

  // 1) Typed subtitle animation
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // 2) Theme toggle + persistência
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // 3) Função genérica de criação de modal
  function makeModal(id, title, content) {
    if (document.getElementById('modal-' + id)) return;
    const m = document.createElement('div');
    m.id = 'modal-' + id;
    m.className = 'modal hidden';
    m.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>
        ${content}
      </div>`;
    document.body.appendChild(m);
  }

  // 4) Criação dos modais fixos
  makeModal('sobre', 'Sobre Mim', `
    <!-- aqui vai todo o HTML do seu modal Sobre -->
  `);
  makeModal('ajuda', 'Central de Ajuda', `
    <!-- conteúdo do modal Ajuda -->
  `);
  makeModal('news', 'Últimas Notícias', `
    <!-- conteúdo do modal News -->
  `);

  // 5) Associa botões da navbar
  ['sobre','ajuda','news'].forEach(id => {
    const btn = document.getElementById(`btn-${id}`);
    if (btn) btn.onclick = e => {
      e.preventDefault();
      document.getElementById(`modal-${id}`).classList.remove('hidden');
    };
  });

  // 6) “Por Dentro” (carrega o post dentro do modal)
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const play = btn.dataset.play.padStart(2,'0');
      const modal = document.getElementById('modal-por-dentro');
      const content = document.getElementById('modal-play-content');
      content.innerHTML = '<p>Carregando conteúdo...</p>';
      modal.classList.remove('hidden');
      try {
        const resp = await fetch(`posts/play-${play}.html`);
        if (!resp.ok) throw new Error();
        content.innerHTML = await resp.text();
      } catch {
        content.innerHTML = '<p>Conteúdo “Por Dentro” não disponível.</p>';
      }
    });
  });

  // 7) Busca com debounce
  const search = document.getElementById('search-input');
  let timer;
  if (search) {
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const term = search.value.toLowerCase();
        document.querySelectorAll('#plays .card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(term)
            ? ''
            : 'none';
        });
      }, 200);
    });
  }

  // 8) Fechar modais via ESC ou botão “×”
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`modal-${btn.dataset.close}`).classList.add('hidden');
    });
  });
});