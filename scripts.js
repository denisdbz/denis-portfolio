document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle animation
  const subtitleText = 'QA • Pentest • DevSecOps';
  let ti = 0;
  const subtitleEl = document.getElementById('typed-subtitle');
  (function type() {
    if (ti <= subtitleText.length) {
      subtitleEl.textContent = subtitleText.slice(0, ti++);
      setTimeout(type, 100);
    }
  })();

  // 2) Theme toggle + persistence
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  themeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 3) AOS (scroll animation)
  if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 800 });

  // 4) Render “Sobre Mim” chart (once)
  function renderSobreChart() {
    const canvas = document.getElementById('sobre-chart');
    if (!canvas || canvas.dataset.rendered === 'true') return;
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2011','2014','2016','2018','2020','2024'],
        datasets: [{
          label: 'Anos de experiência',
          data: [1,3,5,7,9,12],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#333' } },
          x: { grid: { color: '#333' } }
        },
        plugins: { legend: { labels: { color: '#00ff9f' } } }
      }
    });
    canvas.dataset.rendered = 'true';
  }

  // 5) Modal helpers
  const openModal = id => {
    document.body.classList.add('modal-open');
    document.getElementById(`modal-${id}`).classList.remove('hidden');
    if (id === 'sobre') renderSobreChart();
    if (id === 'news') loadLatestNews();
  };
  const closeModal = id => {
    document.body.classList.remove('modal-open');
    document.getElementById(`modal-${id}`).classList.add('hidden');
  };

  // 6) Navbar buttons
  document.getElementById('btn-sobre')?.addEventListener('click', e => { e.preventDefault(); openModal('sobre'); });
  document.getElementById('btn-ajuda')?.addEventListener('click', e => { e.preventDefault(); openModal('ajuda'); });
  document.getElementById('btn-news')?.addEventListener('click', e => { e.preventDefault(); openModal('news'); });

  // 7) Close modals (X, ESC, click outside)
  document.querySelectorAll('.close-modal').forEach(btn =>
    btn.addEventListener('click', e => { e.preventDefault(); closeModal(btn.dataset.close); })
  );
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
      document.body.classList.remove('modal-open');
    }
  });
  document.querySelectorAll('.modal').forEach(modal =>
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
      }
    })
  );

  // 8) “Por Dentro” buttons → fetch post + footer
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      const container = document.getElementById('modal-play-content');
      openModal('por-dentro');
      container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';

      // fetch HTML
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error();
        container.innerHTML = await resp.text();
      } catch {
        container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
      }

      // remove duplicados e append footer
      container.querySelectorAll('.modal-footer').forEach(el => el.remove());
      const footer = document.createElement('div');
      footer.classList.add('modal-footer');
      footer.innerHTML = `
        <a href="plays/play-${id}/" class="btn">▶️ Ir ao Play</a>
        <a href="#plays" class="btn">← Voltar à Home</a>
      `;
      container.appendChild(footer);
    });
  });

  // 9) Filter plays
  const searchInput = document.getElementById('search-input');
  let timer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const term = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    }, 200);
  });

  // 10) Load news (via RSS→JSON)
  async function loadLatestNews() {
    const container = document.getElementById('news-list');
    if (!container) return;
    container.innerHTML = '<p class="loading">Carregando notícias…</p>';
    try {
      const url = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}&count=6`);
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
        container.innerHTML = '<p class="error">Não foi possível carregar as notícias.</p>';
      }
    } catch {
      container.innerHTML = '<p class="error">Erro ao buscar notícias.</p>';
    }
  }

  // 11) Easter egg (Konami)
  if (typeof Konami === 'function') new Konami(() => {
    alert('Easter egg ativado! 🎉');
    new Audio('assets/audio/palpite.mp3').play();
  });
});
