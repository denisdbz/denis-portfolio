// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // 1) Typed subtitle animation
  // ================================
  const subtitleText = 'QA • Pentest • DevSecOps';
  let ti = 0;
  const subtitleEl = document.getElementById('typed-subtitle');
  (function typeSubtitle() {
    if (ti <= subtitleText.length) {
      subtitleEl.textContent = subtitleText.slice(0, ti++);
      setTimeout(typeSubtitle, 100);
    }
  })();

  // ================================
  // 2) Theme toggle + persistence
  // ================================
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
  }
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // ================================
  // 3) AOS initialization (on-scroll animations)
  // ================================
  if (typeof AOS !== 'undefined') {
    AOS.init({ once: true, duration: 800 });
  }

  // ================================
  // 4) Render “Sobre Mim” chart
  // ================================
  function renderCareerChart() {
    const ctx = document.getElementById('careerChart');
    if (!ctx) return;
    new Chart(ctx.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['2010', '2012', '2016', '2017', '2018', '2019', '2020', '2024'],
        datasets: [{
          label: 'Evolução de Carreira',
          data:       [1,      2,      3,      4,      5,      6,      7,      8],
          fill: false,
          tension: 0.4,
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#333' } },
          x: { grid: { color: '#333' } }
        },
        plugins: {
          legend: { labels: { color: '#00ff9f' } }
        }
      }
    });
  }

  // ================================
  // 5) Modal open/close utilities
  // ================================
  const openModal = id => {
    document.body.classList.add('modal-open');
    document.getElementById(`modal-${id}`).classList.remove('hidden');
    if (id === 'sobre')      renderCareerChart();
    if (id === 'news')       loadLatestNews();
  };
  const closeModal = id => {
    document.body.classList.remove('modal-open');
    document.getElementById(`modal-${id}`).classList.add('hidden');
  };

  // ================================
  // 6) Navbar buttons → open
  // ================================
  document.getElementById('btn-sobre')?.addEventListener('click', e => {
    e.preventDefault();
    openModal('sobre');
  });
  document.getElementById('btn-ajuda')?.addEventListener('click', e => {
    e.preventDefault();
    openModal('ajuda');
  });
  document.getElementById('btn-news')?.addEventListener('click', e => {
    e.preventDefault();
    openModal('news');
  });

  // ================================
  // 7) Close buttons (“×”) and ESC key
  // ================================
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      closeModal(btn.dataset.close);
    });
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
      document.body.classList.remove('modal-open');
    }
  });
  // clicking outside modal-content also closes
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    });
  });

  // ================================
  // 8) “Por Dentro” buttons → fetch posts + footer buttons
  // ================================
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      const modal = document.getElementById('modal-por-dentro');
      const container = document.getElementById('modal-play-content');
      openModal('por-dentro');
      container.innerHTML = `<p class="loading">Carregando conteúdo…</p>`;
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error('Não encontrado');
        const html = await resp.text();
        container.innerHTML = html;
      } catch {
        container.innerHTML = `<p class="error">Erro ao carregar o conteúdo.</p>`;
      }
      // append footer buttons
      const footer = document.createElement('div');
      footer.classList.add('modal-footer');
      footer.innerHTML = `
        <a href="plays/play-${id}/" class="btn">▶️ Ver o Play</a>
        <a href="#plays" class="btn">← Voltar à Home</a>
      `;
      container.appendChild(footer);
    });
  });

  // ================================
  // 9) Search / filter plays (debounced)
  // ================================
  const searchInput = document.getElementById('search-input');
  let searchTimer;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const term = searchInput.value.toLowerCase();
        document.querySelectorAll('#plays .card').forEach(card => {
          card.style.display = card
            .textContent.toLowerCase()
            .includes(term) ? '' : 'none';
        });
      }, 200);
    });
  }

  // ================================
  // 10) Load latest news via RSS→JSON
  // ================================
  async function loadLatestNews() {
    const container = document.getElementById('news-list');
    if (!container) return;
    const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
    const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
    container.innerHTML = `<p class="loading">Carregando notícias…</p>`;
    try {
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`
      );
      const data = await res.json();
      if (data.items) {
        container.innerHTML = data.items.map(item => `
          <div class="news-card">
            <a href="${item.link}" target="_blank">
              <h3>${item.title}</h3>
              <p>${item.pubDate.split(' ')[0]}</p>
            </a>
          </div>
        `).join('');
      } else {
        container.innerHTML = `<p class="error">Não foi possível carregar as notícias.</p>`;
      }
    } catch {
      container.innerHTML = `<p class="error">Erro ao buscar notícias.</p>`;
    }
  }

  // ================================
  // 11) Konami code Easter Egg
  // ================================
  if (typeof Konami === 'function') {
    new Konami(() => {
      alert('Easter egg ativado! 🎉');
      new Audio('assets/audio/palpite.mp3').play();
    });
  }
});