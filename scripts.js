// 1) Typed subtitle
const text = 'QA • Pentest • DevSecOps';
let idx = 0;
const el = document.getElementById('typed-subtitle');
(function type() {
  if (idx <= text.length) {
    el.textContent = text.slice(0, idx++);
    setTimeout(type, 100);
  }
})();

// 2) Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// 3) Helpers de modal
function openModal(id) {
  document.getElementById(`modal-${id}`).classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(`modal-${id}`).classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// 4) ESC fecha qualquer modal
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-content').forEach(mc => {
      if (!mc.parentElement.classList.contains('hidden')) {
        const id = mc.querySelector('.close-modal').dataset.close;
        closeModal(id);
      }
    });
  }
});

// 5) Botões do navbar
document.getElementById('btn-sobre').onclick = e => {
  e.preventDefault(); openModal('sobre'); drawChart();
};
document.getElementById('btn-ajuda').onclick = e => {
  e.preventDefault(); openModal('ajuda');
};
document.getElementById('btn-news').onclick = async e => {
  e.preventDefault(); openModal('news'); await loadNews();
};

// 6) Fechar modais
document.body.addEventListener('click', e => {
  if (e.target.classList.contains('close-modal')) {
    closeModal(e.target.dataset.close);
  }
});

// 7) "Por Dentro" buttons
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    openModal('por-dentro');
    document.getElementById('modal-play-content').innerHTML =
      '<p>Conteúdo detalhado do Play ainda não implementado.</p>';
  });
});

// 8) Timeline chart (Chart.js)
function drawChart() {
  const ctx = document.getElementById('experience-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['QA', 'Automação', 'Pentest', 'DevSecOps'],
      datasets: [{
        label: 'Anos de experiência',
        data: [12, 7, 8, 4],
        borderWidth: 1
      }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: true } }
    }
  });
}

// 9) Função para puxar notícias via RSS2JSON
async function loadNews() {
  const list = document.getElementById('news-list');
  list.innerHTML = '<p class="loading">Carregando notícias…</p>';

  try {
    const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
    const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json
        ?rss_url=${RSS_URL}
        &api_key=${API_KEY}
        &count=6`.replace(/\s+/g,''), // remove quebras de linha
      { method: 'GET' }
    );
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message);

    list.innerHTML = data.items.map(item => `
      <div class="news-card">
        <img src="${item.thumbnail || item.enclosure.link || 'https://via.placeholder.com/300x100'}"
             alt="${item.title}" />
        <div class="news-card-content">
          <h4>${item.title}</h4>
          <small>${item.pubDate.split(' ')[0]}</small>
          <a href="${item.link}" target="_blank">Leia mais →</a>
        </div>
      </div>
    `).join('');

  } catch (err) {
    console.error('News load error:', err);
    list.innerHTML = '<p class="loading error">Erro ao carregar notícias.</p>';
  }
}
