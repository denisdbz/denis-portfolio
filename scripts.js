// scripts.js

// Funções de abertura e fechamento de modais
function openModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
  }
}
function closeModal(id) {
  const modal = document.getElementById(`modal-${id}`);
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle
  const subtitleText = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const subtitleEl = document.getElementById('typed-subtitle');
  if (subtitleEl) {
    (function type() {
      if (idx <= subtitleText.length) {
        subtitleEl.textContent = subtitleText.slice(0, idx++);
        setTimeout(type, 100);
      }
    })();
  }

  // 2) Theme toggle (neon ↔ light)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }

  // 3) Menu “Sobre”
  const btnSobre = document.getElementById('btn-sobre');
  if (btnSobre) {
    btnSobre.addEventListener('click', e => {
      e.preventDefault();
      openModal('sobre');
      renderSobreChart();
    });
  }

  // 4) Menu “Ajuda”
  const btnAjuda = document.getElementById('btn-ajuda');
  if (btnAjuda) {
    btnAjuda.addEventListener('click', e => {
      e.preventDefault();
      openModal('ajuda');
    });
  }

  // 5) Menu “News”
  const btnNews = document.getElementById('btn-news');
  if (btnNews) {
    btnNews.addEventListener('click', async e => {
      e.preventDefault();
      openModal('news');
      await loadNews();
    });
  }

  // 6) Botões “Por Dentro” de cada Play
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      openModal('por-dentro');
      const container = document.getElementById('modal-play-content');
      container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error('Não encontrado');
        container.innerHTML = await resp.text();
      } catch (err) {
        console.error('Erro ao carregar Play:', err);
        container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
      }
    });
  });

  // 7) Fechar modais com “X”
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('close-modal')) {
      const id = e.target.getAttribute('data-close');
      closeModal(id);
    }
  });

  // 8) Fechar modais com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        if (!modal.classList.contains('hidden')) {
          modal.classList.add('hidden');
        }
      });
      document.body.classList.remove('modal-open');
    }
  });

  // 9) Busca/filtra plays
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        const matches = card.querySelector('h3').textContent
          .toLowerCase()
          .includes(term);
        card.style.display = matches ? '' : 'none';
      });
    });
  }
});

// 10) Função para carregar notícias via RSS2JSON
async function loadNews() {
  const list = document.getElementById('news-list');
  list.innerHTML = '<p class="loading">Carregando notícias…</p>';
  try {
    const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&count=6`
    );
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message);
    list.innerHTML = data.items.map(item => `
      <div class="news-card">
        <img src="${item.thumbnail || item.enclosure.link || 'https://via.placeholder.com/300x100'}"
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
    list.innerHTML = '<p class="error">Falha ao carregar notícias.</p>';
  }
}

// 11) Gráfico de experiência no modal “Sobre”
function renderSobreChart() {
  if (window.sobreChartRendered) return;
  window.sobreChartRendered = true;
  const canvas = document.getElementById('sobre-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2011', '2014', '2016', '2018', '2020', '2024'],
      datasets: [{
        label: 'Anos de experiência',
        data: [1, 3, 5, 7, 9, 12],
        backgroundColor: 'rgba(0,255,159,0.6)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 2 } }
      },
      plugins: {
        legend: { labels: { color: '#e0e0e0' } }
      }
    }
  });
}

// 12) Service Worker (PWA)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .catch(err => console.warn('SW registration falhou:', err));
}