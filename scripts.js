// scripts.js

// URL do seu backend (caso já não esteja definida)
var baseURL = typeof baseURL !== 'undefined' ? baseURL : 'https://mellow-commitment-production.up.railway.app';

document.addEventListener('DOMContentLoaded', function () {

  // 1) Toggle tema claro/escuro
  var themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });
  }

  // 2) Busca dinâmica de Plays
  var search = document.getElementById('search');
  var plays = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', function () {
      var term = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(function (card) {
        card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  // 3) Modal “Por Dentro” com marca-d’água
  document.querySelectorAll('.btn-por-dentro').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      var card = btn.closest('.card');
      var link = card ? card.querySelector('a.btn') : null;
      if (!link) return;

      var href = link.href;
      var parts = href.replace(/\/index\.html$/, '').split('/');
      var slug = parts[parts.length - 1];
      var tool = slug.split('-')[2] || slug;
      var postUrl = window.location.origin + '/denis-portfolio/posts/' + slug + '.html';

      var modal = document.getElementById('modal-por-dentro');
      var target = document.getElementById('modal-post-content');
      if (!modal || !target) return;

      target.innerHTML = `
        <div class="post-modal-container">
          <div class="post-modal-actions">
            <button id="go-play" class="btn neon-btn">&#9654; Ir ao Play</button>
            <button id="go-home" class="btn neon-btn">&#9194; Voltar à Home</button>
          </div>
          <iframe src="${postUrl}" title="${slug}"></iframe>
          <div class="post-modal-footer">
            <p class="curiosity">
              🧠 Quer se aprofundar em <strong>${tool.toUpperCase()}</strong>?
              <a href="https://www.google.com/search?q=${tool}+documentation" target="_blank">
                Explore a documentação oficial →
              </a>
            </p>
          </div>
        </div>`;

      var container = modal.querySelector('.post-modal-container');
      if (container) {
        container.style.setProperty('--tool-logo-url', `url('assets/img/tools/${tool}.png')`);
      }

      var goPlay = document.getElementById('go-play');
      if (goPlay) goPlay.addEventListener('click', function () {
        window.location.href = href;
      });

      var goHome = document.getElementById('go-home');
      if (goHome) goHome.addEventListener('click', function () {
        modal.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      modal.classList.remove('hidden');
    });
  });

  // 4) Modais Sobre, Ajuda e News
  var sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(function (btn) {
    var name = btn.dataset.modal;
    var M = document.getElementById('modal-' + name);
    if (!M) return;

    btn.addEventListener('click', function () {
      M.classList.remove('hidden');
      if (name === 'sobre' && window.Chart) {
        var c = document.getElementById('sobre-chart');
        if (c && c.getContext) {
          var ctx = c.getContext('2d');
          if (!sobreChart) {
            sobreChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: ['2011', '2014', '2016', '2018', '2020', '2024'],
                datasets: [{ label: 'Anos de Experiência', data: [1, 3, 5, 7, 9, 12] }]
              },
              options: { responsive: true, scales: { y: { beginAtZero: true } } }
            });
          } else {
            sobreChart.resize();
          }
        }
      }
    });
  });

  // 5) Fechamento de modais
  document.querySelectorAll('.close-modal').forEach(function (x) {
    x.addEventListener('click', function () {
      var modal = x.closest('.modal');
      if (modal) modal.classList.add('hidden');
    });
  });
  document.querySelectorAll('.modal').forEach(function (M) {
    M.addEventListener('click', function (e) {
      if (e.target === M) M.classList.add('hidden');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(function (m) {
        m.classList.add('hidden');
      });
    }
  });

  // 6) Notícias via API
  var newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(baseURL + '/api/news')
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.statusText); })
      .then(function (json) {
        newsList.innerHTML = '';
        (json.news || []).slice(0, 6).forEach(function (item) {
          var card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description || ''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(function (err) {
        console.error(err);
        newsList.innerHTML = '<p>Erro ao carregar notícias: ' + err + '</p>';
      });
  }

  // 7) Botão global “Executar Teste”
  var btnExec = document.getElementById('btn-executar');
  if (btnExec) {
    btnExec.addEventListener('click', executarTeste);
  }
});

// === Função de execução SSE ===
function executarTeste() {
  var m = window.location.pathname.match(/play-(\d+)/);
  var num = m ? m[1] : '1';

  var logs = document.getElementById('output-box') || document.getElementById('logs');
  var bar  = document.getElementById('progress-fill') || document.querySelector('.barra-preenchida');
  var cont = document.getElementById('progress-container');
  var done = document.getElementById('final-msg');
  if (!logs || !bar || !cont) {
    console.error('Log elements missing');
    return;
  }

  logs.textContent = '';
  bar.style.width = '0%';
  cont.classList.remove('hidden');
  if (done) done.classList.add('hidden');

  var es = new EventSource(baseURL + '/api/play/' + num + '/stream');
  es.onmessage = function (e) {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;

    const progress = Math.min(100, logs.textContent.length / 5);
    bar.style.width = progress + '%';

    const finalizado = /\[✓\]|\[✔️\]|finalizado com sucesso|fim do teste|Testes simulados concluídos/i.test(e.data.trim());
    if (finalizado) {
      bar.style.width = '100%';
      if (done) done.classList.remove('hidden');
      es.close(); // fecha conexão SSE ao final
    }
  };
}
