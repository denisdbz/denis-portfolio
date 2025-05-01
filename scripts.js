// scripts.js

// 1) Typed subtitle animation
const subtitleText = 'QA • Pentest • DevSecOps';
let ti = 0;
const subtitleEl = document.getElementById('typed-subtitle');
(function typeSubtitle() {
  if (ti <= subtitleText.length) {
    subtitleEl.textContent = subtitleText.slice(0, ti++);
    setTimeout(typeSubtitle, 100);
  }
})();

// 2) Theme toggle + persistência
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') document.body.classList.add('light-mode');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// 3) Funções genéricas de modal
function openModal(id) {
  const modal = document.getElementById('modal-' + id);
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  if (id === 'sobre') renderCareerChart();
}
function closeModal(id) {
  const modal = document.getElementById('modal-' + id);
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}
// fechar ao ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
    document.body.style.overflow = '';
  }
});

// 4) Hook nos botões do navbar
document.getElementById('btn-sobre').addEventListener('click', e => {
  e.preventDefault();
  openModal('sobre');
});
document.getElementById('btn-ajuda').addEventListener('click', e => {
  e.preventDefault();
  openModal('ajuda');
});
document.getElementById('btn-news').addEventListener('click', async e => {
  e.preventDefault();
  openModal('news');
  await loadNews();
});
document.getElementById('btn-plays').addEventListener('click', e => {
  e.preventDefault();
  openModal('plays');
});

// 5) Fechar qualquer modal ao clicar no “×”
document.body.addEventListener('click', e => {
  if (e.target.classList.contains('close-modal')) {
    const id = e.target.getAttribute('data-close');
    closeModal(id);
  }
});

// 6) Carregar notícias (RSS → JSON)
async function loadNews() {
  const list = document.getElementById('news-list');
  list.innerHTML = '<p class="loading">Carregando notícias…</p>';
  try {
    const RSS_URL   = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
    const API_KEY   = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
    const res       = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`);
    const data      = await res.json();
    if (data.status !== 'ok') throw new Error(data.message);
    list.innerHTML = data.items.map(item => `
      <div class="news-card">
        <img src="${item.thumbnail || 'fallback.jpg'}" alt="${item.title}">
        <h4><a href="${item.link}" target="_blank">${item.title}</a></h4>
        <p>${item.pubDate.split(' ')[0]}</p>
      </div>
    `).join('');
  } catch {
    list.innerHTML = '<p class="error">Erro ao carregar notícias.</p>';
  }
}

// 7) Função para renderizar o gráfico no Modal “Sobre”
let careerChartInstance = null;
function renderCareerChart() {
  const ctxEl = document.getElementById('sobre-chart');
  if (!ctxEl) return;
  // destruir instância anterior (se existir)
  if (careerChartInstance) careerChartInstance.destroy();
  const ctx = ctxEl.getContext('2d');
  careerChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2011','2014','2016','2018','2020','2024'],
      datasets: [{
        label: 'Anos de experiência',
        data:    [1,      3,      5,      7,      9,      12],
        backgroundColor: 'rgba(0,255,159,0.8)'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      },
      plugins: {
        legend: { labels: { color: '#fff' } }
      }
    }
  });
}

// 8) Carregar conteúdo “Por Dentro” de cada Play
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2, '0');
    const modal = document.getElementById('modal-por-dentro');
    const container = document.getElementById('modal-play-content');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';
    try {
      const resp = await fetch(`posts/play-${id}.html`);
      if (!resp.ok) throw new Error();
      const html = await resp.text();
      container.innerHTML = html + `
        <div class="play-actions">
          <a href="plays/play-${id}.html" class="btn">Ir ao Play</a>
          <button class="btn" onclick="closeModal('por-dentro')">← Voltar à Home</button>
        </div>`;
    } catch {
      container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
    }
  });
});