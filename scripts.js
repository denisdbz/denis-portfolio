// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // --- 1) Typed subtitle animation (já existente) ---
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // --- 2) Theme toggle (já existente) ---
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () =>
      document.body.classList.toggle('light-mode')
    );
  }

  // --- Funções utilitárias para abrir/fechar modais ---
  function openModal(id) {
    document.getElementById(`modal-${id}`).classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
  function closeModal(id) {
    document.getElementById(`modal-${id}`).classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  // --- 3) Listeners nos botões de menu ---
  document.getElementById('btn-sobre')
    .addEventListener('click', e => { e.preventDefault(); openModal('sobre'); });
  document.getElementById('btn-ajuda')
    .addEventListener('click', e => { e.preventDefault(); openModal('ajuda'); });
  document.getElementById('btn-news')
    .addEventListener('click', e => { e.preventDefault(); openModal('news'); /* opcional: loadNews(); */ });

  // --- 4) Botões “Por Dentro” ---
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      openModal('por-dentro');
      document.getElementById('modal-play-content').innerHTML = '<p>Carregando conteúdo...</p>';
      fetch(`posts/play-${id}.html`)
        .then(r => r.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
        })
        .catch(() => {
          document.getElementById('modal-play-content').innerHTML = '<p>Conteúdo ainda não disponível.</p>';
        });
    });
  });

  // --- 5) Fechar ao clicar no “×” (qualquer modal) ---
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('close-modal')) {
      const id = e.target.getAttribute('data-close');
      closeModal(id);
    }
  });

  // --- 6) Fechar com ESC ---
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
      document.body.classList.remove('modal-open');
    }
  });

  // --- 7) Restante do seu código (busca, Konami, etc) ---
  const search = document.getElementById('search-input');
  if (search) {
    search.addEventListener('input', () => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.querySelector('h3')
          .textContent.toLowerCase()
          .includes(term)
          ? '' : 'none';
      });
    });
  }

  if (typeof Konami === 'function') {
    new Konami(() => {
      alert('Easter egg ativado! Segredo desbloqueado!');
      new Audio('assets/audio/palpite.mp3').play();
    });
  }
});
k
