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
  if (!logs || !barra || !container) return console.error('Log elements missing');

  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  const src = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  src.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length/5) + '%';
  };
  src.onerror = () => src.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // ── 1) Toggle tema claro/escuro
  const themeToggle = document.querySelector('.toggle-theme');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode')
      ? '🌙'
      : '☀️';
  });

  // ── 2) Busca dinâmica de Plays
  const search = document.getElementById('search');
  const plays = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', () => {
      const t = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(t) ? '' : 'none';
      });
    });
  }

// scripts.js
// ── 3) “Por Dentro”: <iframe> + botões + marca-d’água ─────────────
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();

    // 1) href do “Ver o Play”
    const href = btn
      .closest('.card')
      .querySelector('a.btn')
      .getAttribute('href');

    // 2) monta URL do post: posts/slug.html
    const postUrl = href
      .replace(/^plays\//, 'posts/')
      .replace(/\/index\.html$/, '.html');

    // 3) extrai slug e nome da ferramenta
    const slug = postUrl.split('/').pop().replace('.html','');
    const tool = slug.split('-')[2] || slug;  // ex: "nmap"

    // 4) injeta o HTML do modal
    const modal  = document.getElementById('modal-por-dentro');
    const target = document.getElementById('modal-post-content');
    target.innerHTML = `
      <div class="post-modal-container">
        <div class="post-modal-actions">
          <button class="btn neon-btn" id="go-play">▶️ Ir ao Play</button>
          <button class="btn neon-btn" id="go-home">⏪ Voltar à Home</button>
        </div>

        <iframe 
          src="${postUrl}" 
          style="width:100%; height:calc(100vh - 160px); border:none;"
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

    // ←=== AQUI É QUE MUDAMOS: busca o container **dentro** do modal
-   const container = document.querySelector('.post-modal-container');
+   const container = modal.querySelector('.post-modal-container');

    // 5) aplica a variável CSS para o watermark
    container.style.setProperty(
      '--tool-logo-url',
      `url('assets/img/tools/${tool}.png')`
    );

    // 6) listeners dos botões
    document.getElementById('go-play')
      .addEventListener('click', () => window.location.href = href);
    document.getElementById('go-home')
      .addEventListener('click', () => {
        modal.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

    // 7) exibe o modal
    modal.classList.remove('hidden');
  });
});

  // ── 4) Modais “Sobre”, “Ajuda” e “News” + lazy-init do gráfico “Sobre”
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name = btn.dataset.modal;                     // ex: "sobre","ajuda","news"
    const M    = document.getElementById(`modal-${name}`);
    if (!M) return;
    btn.addEventListener('click', () => {
      M.classList.remove('hidden');
      if (name === 'sobre' && window.Chart) {
        const c   = document.getElementById('sobre-chart');
        const ctx = c.getContext('2d');
        if (!sobreChart) {
          sobreChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['2011','2014','2016','2018','2020','2024'],
              datasets: [{
                label: 'Anos de Experiência',
                data:   [1,3,5,7,9,12],
                backgroundColor: 'rgba(0,255,224,0.7)',
                borderColor:     'rgba(0,255,224,1)',
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

  // fechar modais (×, overlay e ESC)
  document.querySelectorAll('.close-modal').forEach(b =>
    b.addEventListener('click', () =>
      b.closest('.modal').classList.add('hidden')
    )
  );
  document.querySelectorAll('.modal').forEach(M =>
    M.addEventListener('click', e => {
      if (e.target === M) M.classList.add('hidden');
    })
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
              .forEach(m => m.classList.add('hidden'));
    }
  });

  // ── 5) Carregar notícias via proxy (/api/news)
  const newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(`${baseURL}/api/news`)
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
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
        newsList.innerHTML = `<p>Erro ao carregar notícias: ${err}</p>`;
      });
  }
});
