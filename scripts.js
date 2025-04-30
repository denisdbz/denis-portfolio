// scripts.js
document.addEventListener('DOMContentLoaded', () => {

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

  // 2) Theme toggle (neon ↔ light)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }

  // 3) Make modals
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

  // Sobre
  makeModal('sobre', 'Sobre Mim', `
    <!-- seu conteúdo de Sobre -->
    ...
  `);

  // Ajuda
  makeModal('ajuda', 'Central de Ajuda', `
    <!-- seu conteúdo de Ajuda -->
    ...
  `);

  // News (agora dinâmico)
  makeModal('news', 'Últimas Notícias', `
    <div id="news-list" class="news-grid">
      <p class="loading">Carregando notícias...</p>
    </div>
  `);

  // “Por Dentro”
  makeModal('por-dentro', 'Detalhes do Play', `<div id="modal-play-content"></div>`);

  // 4) Hook navbar buttons
  document.getElementById('btn-sobre').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-sobre').classList.remove('hidden');
  };
  document.getElementById('btn-ajuda').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-ajuda').classList.remove('hidden');
  };

  // 5) News: ao abrir, dispara fetch
  const NEWS_API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
  document.getElementById('btn-news').onclick = async e => {
    e.preventDefault();
    const modal = document.getElementById('modal-news');
    const list = document.getElementById('news-list');

    // mostra loading
    list.innerHTML = `<p class="loading">Carregando notícias...</p>`;

    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?category=technology&language=pt&pageSize=8&apiKey=${NEWS_API_KEY}`
      );
      const json = await res.json();
      if (json.status !== 'ok') throw new Error(json.message);

      const cards = json.articles.map(a => `
        <div class="news-card">
          <img src="${a.urlToImage|| 'https://via.placeholder.com/300x100?text=No+Image'}" alt="${a.title}"/>
          <div class="news-card-content">
            <h4>${a.title}</h4>
            <small>${a.source.name}</small>
            <a href="${a.url}" target="_blank">Leia mais</a>
          </div>
        </div>
      `).join('');

      list.innerHTML = cards || '<p class="loading">Nenhuma notícia encontrada.</p>';
    } catch (err) {
      console.error(err);
      list.innerHTML = `<p class="loading">Erro ao carregar notícias.</p>`;
    }

    modal.classList.remove('hidden');
  };

  // 6) “Por Dentro” buttons para cada play
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      document.getElementById('modal-play-content').innerHTML = '<p>Carregando...</p>';
      document.getElementById('modal-por-dentro').classList.remove('hidden');
      fetch(`posts/play-${id}.html`)
        .then(r => r.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
        })
        .catch(() => {
          document.getElementById('modal-play-content').innerHTML = '<p>Conteúdo indisponível.</p>';
        });
    };
  });

  // 7) Search/filter plays
  const search = document.getElementById('search-input');
  if (search) {
    search.oninput = () => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display =
          card.querySelector('h3').textContent.toLowerCase().includes(term)
          ? ''
          : 'none';
      });
    };
  }

  // 8) Konami Code (Easter egg)
  if (typeof Konami === 'function') {
    new Konami(() => {
      alert('Easter egg ativado! 🎉');
    });
  }

  // 9) Fechar qualquer modal
  document.body.addEventListener('click', e => {
    if (e.target.matches('.close-modal')) {
      const id = e.target.dataset.close;
      document.getElementById('modal-' + id).classList.add('hidden');
    }
  });

});
