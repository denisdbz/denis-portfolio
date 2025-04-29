document.addEventListener('DOMContentLoaded', () => {
  // ===== Typed subtitle animation =====
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // ===== Theme toggle + persistência =====
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // ===== Modals =====
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

  // (criação de modais idêntica ao anterior…)

  // ===== Hook navbar buttons =====
  ['sobre','ajuda','news'].forEach(id => {
    document.getElementById(`btn-${id}`).onclick = e => {
      e.preventDefault();
      document.getElementById(`modal-${id}`).classList.remove('hidden');
    };
  });

  // ===== "Por Dentro" =====
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      const modal = document.getElementById('modal-por-dentro');
      const content = document.getElementById('modal-play-content');
      content.innerHTML = '<p>Carregando conteúdo...</p>';
      modal.classList.remove('hidden');
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error();
        content.innerHTML = await resp.text();
      } catch {
        content.innerHTML = '<p>Conteúdo "Por Dentro" não disponível.</p>';
      }
    };
  });

  // ===== Busca com debounce =====
  const search = document.getElementById('search-input');
  let timer;
  search.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
      });
    }, 200);
  };

  // ===== Fechar modais =====
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      document.getElementById('modal-' + btn.dataset.close).classList.add('hidden');
    };
  });
});
