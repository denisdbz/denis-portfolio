// Typed subtitle
const subtitleText = 'QA • Pentest • DevSecOps';
let ti = 0;
const subtitleEl = document.getElementById('typed-subtitle');
(function type() {
  if (!subtitleEl) return;
  if (ti <= subtitleText.length) {
    subtitleEl.textContent = subtitleText.slice(0, ti++);
    setTimeout(type, 100);
  }
})();

// Theme toggle + persist
const themeToggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');
if (saved === 'light') document.body.classList.add('light-mode');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
  });
}

// Modal logic (open, close, ESC)
function openModal(id) {
  const m = document.getElementById('modal-' + id);
  if (!m) return;
  m.classList.remove('hidden');
  document.body.classList.add('modal-open');
  if (id === 'sobre') renderSobreChart();
}
function closeModal(id) {
  const m = document.getElementById('modal-' + id);
  if (!m) return;
  m.classList.add('hidden');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    closeModal(btn.dataset.close);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal').forEach(m => {
    if (!m.classList.contains('hidden')) m.classList.add('hidden');
    document.body.classList.remove('modal-open');
  });
});

// Navbar buttons
['sobre','ajuda','news'].forEach(id => {
  const btn = document.getElementById('btn-' + id);
  if (btn) btn.addEventListener('click', e => {
    e.preventDefault();
    openModal(id);
  });
});

// News fetch (inside modal-news)
async function loadNews() {
  const grid = document.getElementById('news-list');
  if (!grid) return;
  try {
    const resp = await fetch('https://api.allorigins.win/raw?url=https://hn.algolia.com/api/v1/search?tags=front_page');
    const { hits } = await resp.json();
    grid.innerHTML = hits.slice(0,4).map(h => `
      <div class="news-card">
        <div class="news-card-content">
          <h4>${h.title}</h4>
          <small>${h.author}</small>
          <a href="${h.url}" target="_blank">Ler mais →</a>
        </div>
      </div>
    `).join('');
  } catch {
    grid.innerHTML = '<p>Erro ao carregar notícias.</p>';
  }
}
document.getElementById('btn-news')?.addEventListener('click', loadNews);

// "Por Dentro" buttons
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2,'0');
    openModal('por-dentro');
    const cont = document.getElementById('modal-play-content');
    cont.innerHTML = '<p>Carregando conteúdo…</p>';
    try {
      const resp = await fetch(`posts/play-${id}.html`);
      if (!resp.ok) throw '';
      cont.innerHTML = await resp.text();
      // garante apenas 1 conjunto de botões
      const nav = document.createElement('div');
      nav.innerHTML = `
        <a href="plays/play-${id}-nmap-recon/" class="btn">▶️ Ir ao Play</a>
        <button class="btn" onclick="closeModal('por-dentro')">← Voltar à Home</button>
      `;
      cont.appendChild(nav);
    } catch {
      cont.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
    }
  });
});

// Search/filter cards
document.getElementById('search-input')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#plays .card').forEach(c => {
    c.style.display = c.querySelector('h3').textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

// Render gráfico do Sobre
let sobreChart;
function renderSobreChart() {
  if (sobreChart) return;
  const ctx = document.getElementById('sobre-chart');
  if (!ctx) return;
  sobreChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2011','2014','2016','2018','2020','2024'],
      datasets: [{ label: 'Anos de experiência', data: [1,3,5,7,9,12] }]
    },
    options: { responsive:true, scales:{ y:{ beginAtZero:true } } }
  });
}
