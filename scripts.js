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

// 2) Theme toggle (neon ↔ light)
const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// 3) Render experience chart inside “Sobre” modal
function renderExperienceChart() {
  const ctx = document.getElementById('experienceChart').getContext('2d');
  // limpa chart anterior, caso exista
  if (window.exChart) window.exChart.destroy();
  window.exChart = new Chart(ctx, {
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
        y: { beginAtZero: true, ticks: { stepSize: 2 } }
      },
      plugins: {
        legend: { labels: { color: '#fff' } }
      }
    }
  });
}

// 4) Abrir/fechar modais
function openModal(id) {
  document.body.classList.add('modal-open');
  document.getElementById('modal-' + id).classList.remove('hidden');
}
function closeModal(id) {
  document.body.classList.remove('modal-open');
  document.getElementById('modal-' + id).classList.add('hidden');
}

// “Sobre” com gráfico e timeline
document.getElementById('btn-sobre').addEventListener('click', e => {
  e.preventDefault();
  openModal('sobre');
  renderExperienceChart();
});

// “Ajuda”
document.getElementById('btn-ajuda').addEventListener('click', e => {
  e.preventDefault();
  openModal('ajuda');
});

// “News” + carregamento pelo RSS2JSON
document.getElementById('btn-news').addEventListener('click', e => {
  e.preventDefault();
  openModal('news');
  loadNews();
});

// “Por Dentro” de cada Play (dá para completar conforme a lógica de API que tiver)
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    openModal('por-dentro');
    const playId = btn.dataset.play.padStart(2, '0');
    // aqui você carrega e injeta em #modal-play-content
    document.getElementById('modal-play-content').textContent =
      'Conteúdo detalhado do Play ' + playId + ' ainda não implementado.';
  });
});

// Fechar ao clicar no “×”
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    closeModal(btn.getAttribute('data-close'));
  });
});
// Fechar também ao clicar fora do conteúdo
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal(modal.id.replace('modal-', ''));
    }
  });
});

// 5) Search/filter plays
const searchInput = document.getElementById('search-input');
searchInput?.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  document.querySelectorAll('#plays .card').forEach(card => {
    card.style.display = card.querySelector('h3')
      .textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

// 6) Carregar notícias via RSS2JSON
async function loadNews() {
  const list = document.getElementById('news-list');
  list.innerHTML = '<p class="loading">Carregando notícias...</p>';
  try {
    const RSS_URL = encodeURIComponent('https://feeds.twit.tv/brickhouse.xml');
    const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`
    );
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message);
    list.innerHTML = data.items.map(item => `
      <div class="news-card">
        <img src="${item.thumbnail || item.enclosure.link || 'https://via.placeholder.com/300x100'}" alt="${item.title}">
        <div class="news-card-content">
          <h4>${item.title}</h4>
          <small>${new Date(item.pubDate).toLocaleDateString()}</small>
          <a href="${item.link}" target="_blank">Leia mais →</a>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error('News load error:', err);
    list.innerHTML = '<p class="loading error">Erro ao carregar notícias.</p>';
  }
}

// 7) Iniciar AOS (se estiver usando)
if (window.AOS) AOS.init();

// 8) Konami Code Easter Egg
if (typeof Konami === 'function') {
  new Konami(() => {
    alert('Easter egg ativado! Segredo desbloqueado!');
    new Audio('assets/audio/palpite.mp3').play();
  });
}
