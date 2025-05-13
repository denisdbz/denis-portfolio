// scripts.js

// URL do seu backend
const baseURL = 'https://mellow-commitment-production.up.railway.app';

// Dispara o play real via SSE
function executarTeste() {
  const m = window.location.pathname.match(/play-(\d+)/);
  const num = m ? m[1] : '1';
  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const bar  = document.getElementById('progress-fill') || document.querySelector('.barra-preenchida');
  const cont = document.getElementById('progress-container');
  if (!logs || !bar || !cont) return console.error('Log elements missing');

  logs.textContent = '';
  bar.style.width = '0%';
  cont.classList.remove('hidden');

  const es = new EventSource(`${baseURL}/api/play/${num}/stream`);
  es.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    bar.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  es.onerror = () => es.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Toggle tema claro/escuro
  const themeToggle = document.querySelector('.toggle-theme');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  });

  // 2) Busca dinâmica de Plays
  const search = document.getElementById('search');
  const plays  = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', () => {
      const term = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  // 3) Modal “Por Dentro” com marca-d’água da ferramenta
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      const href = btn.closest('.card').querySelector('a.btn').href;
      const parts = href.replace(/\/index\.html$/, '').split('/');
      const slug = parts[parts.length - 1];
      const tool = slug.split('-')[2] || slug;
      const postUrl = `${window.location.origin}/denis-portfolio/posts/${slug}.html`;

      const modal  = document.getElementById('modal-por-dentro');
      const target = document.getElementById('modal-post-content');

      target.innerHTML = `
        <div class="post-modal-container">
          <div class="post-modal-actions">
            <button id="go-play" class="btn neon-btn">&#9654; Ir ao Play</button>
            <button id="go-home" class="btn neon-btn">&#9194; Voltar à Home</button>
          </div>
<iframe
  src="${postUrl}"
  title="${slug}">
</iframe>
          <div class="post-modal-footer">
            <p class="curiosity">
              🧠 Quer se aprofundar em <strong>${tool.toUpperCase()}</strong>? 
              <a href="https://www.google.com/search?q=${tool}+documentation" target="_blank">
                Explore a documentação oficial →
              </a>
            </p>
          </div>
        </div>
      `;

      // Aplica o logo no fundo via CSS
      const container = modal.querySelector('.post-modal-container');
      if (container) {
        container.style.setProperty('--tool-logo-url',
          `url('assets/img/tools/${tool}.png')`
        );
      }

      document.getElementById('go-play')
        .addEventListener('click', () => window.location.href = href);

      document.getElementById('go-home')
        .addEventListener('click', () => {
          modal.classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

      modal.classList.remove('hidden');
    });
  });

  // 4) Modais Sobre, Ajuda e News
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name = btn.dataset.modal;
    const M    = document.getElementById(`modal-${name}`);
    if (!M) return;
    btn.addEventListener('click', () => {
      M.classList.remove('hidden');
      if (name === 'sobre' && window.Chart) {
        const c = document.getElementById('sobre-chart');
        const ctx = c.getContext('2d');
        if (!sobreChart) {
          sobreChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['2011','2014','2016','2018','2020','2024'],
              datasets: [{ label: 'Anos de Experiência', data: [1,3,5,7,9,12] }]
            },
            options: { responsive: true, scales: { y: { beginAtZero: true } } }
          });
        } else {
          sobreChart.resize();
        }
      }
    });
  });

  // 5) Fechamento de modais (×, overlay, esc)
  document.querySelectorAll('.close-modal').forEach(x =>
    x.addEventListener('click', () => x.closest('.modal').classList.add('hidden'))
  );
  document.querySelectorAll('.modal').forEach(M =>
    M.addEventListener('click', e => e.target === M && M.classList.add('hidden'))
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(m => m.classList.add('hidden'));
    }
  });

  // 6) Notícias
  const newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(`${baseURL}/api/news`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(json => {
        newsList.innerHTML = '';
        (json.news || []).slice(0,6).forEach(item => {
          const card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `<h3>${item.title}</h3><p>${item.description||''}</p>
                            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        newsList.innerHTML = `<p>Erro ao carregar notícias: ${err}</p>`;
      });
  }
});
