// Aguarda DOM completamente carregado
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

  // 3) Renderiza gráfico de experiência no modal "Sobre Mim"
  function renderExperienceChart() {
    const ctx = document.getElementById('experienceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['QA', 'Pentest', 'Automação', 'DevSecOps'],
        datasets: [{
          label: 'Anos de experiência',
          data: [12, 5, 8, 4],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 2, color: '#fff' } },
          x: { ticks: { color: '#fff' } }
        },
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  }

  // 4) Abre modal e trava scroll
  function openModal(id) {
    document.getElementById('modal-'+id).classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (id === 'sobre') renderExperienceChart();
    if (id === 'news') loadNews();
  }

  // 5) Fecha modal e libera scroll
  function closeModal(id) {
    document.getElementById('modal-'+id).classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  // 6) Fechar com ESC
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(m => {
        closeModal(m.id.replace('modal-',''));
      });
    }
  });

  // 7) Listeners nos botões do navbar
  document.getElementById('btn-sobre').addEventListener('click', e => {
    e.preventDefault(); openModal('sobre');
  });
  document.getElementById('btn-ajuda').addEventListener('click', e => {
    e.preventDefault(); openModal('ajuda');
  });
  document.getElementById('btn-news').addEventListener('click', e => {
    e.preventDefault(); openModal('news');
  });

  // 8) Fecha modal ao clicar em × ou fora do conteúdo
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('close-modal')) {
      closeModal(e.target.getAttribute('data-close'));
    }
    if (e.target.classList.contains('modal')) {
      closeModal(e.target.id.replace('modal-',''));
    }
  });

  // 9) Botão “Por Dentro”
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2,'0');
      // aqui você pode buscar via fetch o HTML específico
      document.getElementById('modal-por-dentro').classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.getElementById('modal-play-content').textContent =
        'Conteúdo detalhado do Play ' + id + ' ainda não implementado.';
    });
  });

  // 10) Puxa notícias via RSS2JSON
  async function loadNews() {
    const list = document.getElementById('news-list');
    list.innerHTML = '<p class="loading">Carregando notícias…</p>';
    try {
      const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
      const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`
      );
      const data = await res.json();
      if (data.status !== 'ok') throw new Error(data.message);
      list.innerHTML = data.items.map(item => `
        <div class="news-card">
          <img src="${item.thumbnail||item.enclosure.link||'https://via.placeholder.com/300x100'}"
               alt="${item.title}">
          <div class="news-card-content">
            <h4>${item.title}</h4>
            <small>${item.pubDate.split(' ')[0]}</small>
            <a href="${item.link}" target="_blank">Leia mais →</a>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error('Erro ao carregar notícias:', err);
      list.innerHTML = '<p class="loading-error">Erro ao carregar notícias.</p>';
    }
  }

});