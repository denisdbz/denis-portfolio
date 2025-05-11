// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

// Dispara o play real via Server-Sent Events (SSE)
function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const barra = document.getElementById('progress-fill') || document.querySelector('.barra-preenchida');
  const container = document.getElementById('progress-container');
  if (!logs || !barra || !container) {
    console.error('Elementos de log não encontrados');
    return;
  }
  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  source.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => source.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // ── 1) Toggle tema claro/escuro ────────────────────────────────
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });
  }

  // ── 2) Busca dinâmica de Plays ─────────────────────────────────
  const searchInput = document.getElementById('search');
  const playsSection = document.getElementById('plays');
  if (searchInput && playsSection) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      playsSection.querySelectorAll('.card').forEach(card => {
        const txt = (
          card.querySelector('h3').textContent +
          card.querySelector('p').textContent
        ).toLowerCase();
        card.style.display = txt.includes(term) ? '' : 'none';
      });
    });
  }

  // ── 3) “Por Dentro”: carrega post estático via iframe + botões ───
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      // href relativo ex: "plays/play-01-nmap-recon/index.html"
      const href = btn.closest('.card').querySelector('a.btn').getAttribute('href');

      // converte em "posts/play-01-nmap-recon.html"
      const postUrl = href
        .replace(/^plays\//, 'posts/')
        .replace(/\/index\.html$/, '.html');

      // extrai slug e ferramenta para curiosidade
      const slug = postUrl.split('/').pop().replace('.html','');
      const tool = slug.split('-')[2] || 'ferramenta';

      const modal  = document.getElementById('modal-por-dentro');
      const target = document.getElementById('modal-post-content');

      target.innerHTML = `
        <div class="post-modal-container">
          <div class="post-modal-actions">
            <button class="btn neon-btn" id="go-to-play-btn">▶️ Ir ao Play</button>
            <button class="btn neon-btn" id="back-home-btn">⏪ Voltar à Home</button>
          </div>
          <iframe src="${postUrl}"
                  style="width:100%; height:70vh; border:none;"
                  title="${slug}"></iframe>
          <div class="post-modal-footer">
            <p class="curiosity">
              🧠 Curiosidade: quer se aprofundar? Consulte a documentação oficial de
              <a href="https://www.google.com/search?q=${tool}+documentation"
                 target="_blank"
                 class="resource-link">${tool.toUpperCase()}</a>.
            </p>
          </div>
        </div>
      `;

      document.getElementById('go-to-play-btn')
        .addEventListener('click', () => window.location.href = href);
      document.getElementById('back-home-btn')
        .addEventListener('click', () => {
          modal.classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

      modal.classList.remove('hidden');
    });
  });

  // ── 4) Modais Gerais (Sobre/Ajuda/News) + Lazy-init do Gráfico ───
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name  = btn.dataset.modal;                     // "sobre","ajuda","news"
    const modal = document.getElementById(`modal-${name}`);
    if (!modal) return;

    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      if (name === 'sobre' && window.Chart) {
        const canvas = document.getElementById('sobre-chart');
        const ctx    = canvas.getContext('2d');
        if (!sobreChart) {
          sobreChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['2011','2014','2016','2018','2020','2024'],
              datasets: [{
                label: 'Anos de Experiência',
                data: [1,3,5,7,9,12],
                backgroundColor: 'rgba(0,255,224,0.7)',
                borderColor: 'rgba(0,255,224,1)',
                borderWidth: 1
              }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
          });
        } else {
          sobreChart.resize();
        }
      }
    });
  });

  // fechar no “×”
  document.querySelectorAll('.close-modal').forEach(btn =>
    btn.addEventListener('click', () =>
      btn.closest('.modal').classList.add('hidden')
    )
  );
  // fechar clicando fora
  document.querySelectorAll('.modal').forEach(modal =>
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    })
  );
  // fechar com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
              .forEach(m => m.classList.add('hidden'));
    }
  });

  // ── 5) Notícias via proxy  ───────────────────────────────────────
  const newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(`${baseURL}/api/news`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        newsList.innerHTML = '';
        (json.news || []).slice(0,6).forEach(item => {
          const card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description||''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        newsList.innerHTML = `<p>Erro ao carregar notícias: ${err.message}</p>`;
      });
  }
});
