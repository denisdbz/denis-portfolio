// 1) Typed subtitle
document.addEventListener('DOMContentLoaded', () => {
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();
});

// 2) Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// 3) Modals: Sobre, Ajuda, News, Por Dentro
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
}
document.body.addEventListener('click', e => {
  if (e.target.matches('.close-modal')) {
    closeAllModals();
  }
});

// ESC fecha modais
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

// Botão Sobre
document.getElementById('btn-sobre').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('modal-sobre').classList.remove('hidden');
  renderExperienceChart();
});

// Botão Ajuda
document.getElementById('btn-ajuda').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('modal-ajuda').classList.remove('hidden');
});

// Botão News
document.getElementById('btn-news').addEventListener('click', async e => {
  e.preventDefault();
  document.getElementById('modal-news').classList.remove('hidden');
  await loadNews();
});

// Botões "Por Dentro" de cada Play
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2, '0');
    document.getElementById('modal-por-dentro').classList.remove('hidden');
    document.getElementById('modal-play-content').textContent = 
      `Conteúdo detalhado do Play ${id} ainda não implementado.`;
  });
});

// 4) Load notícias via RSS2JSON (sem api_key, free tier)
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
        <img 
          src="${item.thumbnail || item.enclosure.link || 'https://via.placeholder.com/300x100'}" 
          alt="${item.title}" 
        />
        <div class="news-content">
          <h4>${item.title}</h4>
          <small>${item.pubDate.split(' ')[0]}</small>
          <a href="${item.link}" target="_blank">Leia mais →</a>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('News load error:', err);
    list.innerHTML = `<p class="loading-error">Erro ao carregar notícias.</p>`;
  }
}

// 5) Gráfico de experiência (Chart.js)
function renderExperienceChart() {
  if (window.experienceRendered) return;
  window.experienceRendered = true;
  const ctx = document.getElementById('experience-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2011–2014','2014–2016','2016–2018','2018–2020','2020–2025'],
      datasets: [{
        label: 'Anos de experiência',
        data: [3, 2, 2, 2, 5],
        backgroundColor: 'rgba(0,255,159,0.6)'
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      },
      plugins: { legend: { labels: { color: '#e0e0e0' } } }
    }
  });
}

// 6) Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('service-worker.js')
    .catch(err => console.warn('SW registration failed:', err));
}
