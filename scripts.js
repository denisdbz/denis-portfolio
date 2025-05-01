// 1) Typed subtitle (máquina de escrever)
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

// 2) Theme toggle + persistência
const themeToggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('light-mode') ? 'light' : 'dark'
  );
});

// 3) Abrir/fechar modais via X e ESC
function openModal(id) {
  document.getElementById(`modal-${id}`)?.classList.remove('hidden');
  document.body.classList.add('modal-open');
  if (id === 'sobre') renderSobreChart();
}
function closeModal(id) {
  document.getElementById(`modal-${id}`)?.classList.add('hidden');
  document.body.classList.remove('modal-open');
}
document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    document.body.classList.remove('modal-open');
  }
});

// 4) Navbar
['sobre','ajuda','news'].forEach(id => {
  document.getElementById(`btn-${id}`)?.addEventListener('click', e => {
    e.preventDefault();
    openModal(id);
  });
});

// 5) Carregar notícias (modal News)
async function loadNews() {
  const grid = document.getElementById('news-list');
  if (!grid) return;
  try {
    const r = await fetch('https://api.allorigins.win/raw?url=https://hn.algolia.com/api/v1/search?tags=front_page');
    const { hits } = await r.json();
    grid.innerHTML = hits.slice(0,4).map(h => `
      <div class="news-card">
        <h4>${h.title}</h4>
        <small>${h.author}</small>
        <a href="${h.url}" target="_blank">Ler mais →</a>
      </div>
    `).join('');
  } catch {
    grid.innerHTML = '<p>Erro ao carregar notícias.</p>';
  }
}
document.getElementById('btn-news')?.addEventListener('click', loadNews);

// 6) “Por Dentro” de cada play
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', async e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2,'0');
    openModal('por-dentro');
    const cont = document.getElementById('modal-play-content');
    cont.innerHTML = '<p>Carregando conteúdo…</p>';
    try {
      const r = await fetch(`posts/play-${id}.html`);
      if (!r.ok) throw '';
      cont.innerHTML = await r.text();
      // Garante apenas 1 grupo de botões
      const grp = document.createElement('div');
      grp.className = 'modal-btn-group';
      grp.innerHTML = `
        <a href="plays/play-${id}-nmap-recon/" class="btn">▶️ Ir ao Play</a>
        <button class="btn" onclick="closeModal('por-dentro')">← Voltar à Home</button>
      `;
      cont.appendChild(grp);
    } catch {
      cont.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
    }
  });
});

// 7) Filtrar cards
document.getElementById('search-input')?.addEventListener('input', e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll('#plays .card').forEach(c => {
    c.style.display = c.querySelector('h3').textContent.toLowerCase().includes(term) ? '' : 'none';
  });
});

// 8) Gráfico do Sobre (Chart.js)
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
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
