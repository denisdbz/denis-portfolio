// scripts.js

// 0) URL do backend
const baseURL = 'https://mellow-commitment-production.up.railway.app';

// 1) Função de streaming SSE
function executarTeste() {
  const m = window.location.pathname.match(/play-(\d+)/);
  const num = m ? m[1] : '1';
  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const bar  = document.getElementById('progress-fill') || document.querySelector('.barra-preenchida');
  const cont = document.getElementById('progress-container');
  if (!logs || !bar || !cont) return console.error('Elementos de log/barra não encontrados');
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

// 2) DOMContentLoaded: inicializações gerais
document.addEventListener('DOMContentLoaded', () => {
  // 2.1) Toggle tema claro/escuro
  const themeBtn = document.querySelector('.toggle-theme');
  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeBtn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  });

  // 2.2) Busca dinâmica de Plays
  const search = document.getElementById('search');
  const plays  = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', () => {
      const t = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(c => {
        c.style.display = c.innerText.toLowerCase().includes(t) ? '' : 'none';
      });
    });
  }

  // 3) Modal “Por Dentro” via <iframe> + botões + watermark
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();

      // href relativo do “Ver o Play”
      const href = btn.closest('.card')
                      .querySelector('a.btn')
                      .getAttribute('href');
      // monta URL do post: posts/slug.html
      const postUrl = href.replace(/^plays\//,'posts/')
                          .replace(/\/index\.html$/,'.html');
      // extrai slug e ferramenta
      const slug = postUrl.split('/').pop().replace('.html','');
      const tool = slug.split('-')[2] || slug;

      // injeta estrutura do modal
      const modal  = document.getElementById('modal-por-dentro');
      const target = document.getElementById('modal-post-content');
      target.innerHTML = `
        <div class="post-modal-container">
          <div class="post-modal-actions">
            <button id="go-play" class="btn neon-btn">▶️ Ir ao Play</button>
            <button id="go-home" class="btn neon-btn">⏪ Voltar à Home</button>
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

      // watermark: define a variável CSS no container correto
      const container = modal.querySelector('.post-modal-container');
      container.style.setProperty(
        '--tool-logo-url',
        `url('assets/img/tools/${tool}.png')`
      );

      // listeners dos botões
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

  // 4) Modais “Sobre”/“Ajuda”/“News” + Chart.js lazy-init
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name = btn.dataset.modal;
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
                data: [1,3,5,7,9,12],
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

  // 5) Fechamento de modais (×, overlay e ESC)
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

  // 6) Carregar notícias via proxy no back-end
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