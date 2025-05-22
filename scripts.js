// scripts.js

// URL do backend SSE
var baseURL = typeof baseURL !== 'undefined'
  ? baseURL
  : 'https://mellow-commitment-production.up.railway.app';

document.addEventListener('DOMContentLoaded', function () {
  // 1) Tema claro/escuro
  var themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });
  }

  // 2) Busca dinâmica
  var search = document.getElementById('search');
  var plays  = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', function () {
      var term = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(function (card) {
        card.style.display =
          card.innerText.toLowerCase().includes(term)
            ? ''
            : 'none';
      });
    });
  }

  // 3) “Por Dentro” posts
document.querySelectorAll('.btn-por-dentro').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var id = btn.getAttribute('data-play-id');
    var posts = {
      '1':'play-01-nmap',
      '2':'play-02-hydra',
      '3':'play-03-sqlmap',
      '4':'play-04-jmeter',
      '5':'play-05-cypress',
      '6':'play-06-bash',
      '7':'play-07-appium',
      '8':'play-08-nikto',
      '9':'play-09-k6',
      '10':'play-10-postman',
      '11':'play-11-xss',
      '12':'play-12-csrf',
      '13':'play-13-fuzz',
      '14':'play-14-curl',
      '15':'play-15-ssl',
      '16':'play-16-docker',
      '17':'play-17-kubernetes',
      '18':'play-18-zap',
      '19':'play-19-bandit',
      '20':'play-20-terraform',
      '21':'play-21-jwt',
      '22':'play-22-api'
    };

    var slug = posts[id];
    if (!slug) return;

    var href = `posts/${slug}/index.html`; // Caminho direto
    var modal = document.getElementById('modal-por-dentro');
    var container = modal.querySelector('.modal-content');

    container.innerHTML = `
      <button class="close-modal" data-close="por-dentro">&times;</button>
      <div class="post-modal-container">
        <div class="post-modal-content">
          <div class="post-modal-actions">
            <button id="go-play" class="btn neon-btn">▶️ Ir ao Play</button>
            <button id="go-home" class="btn neon-btn">⏪ Voltar à Home</button>
          </div>
          <div class="post-iframe-wrapper">
            <iframe src="${href}" style="width:100%; height:400px;"></iframe>
          </div>
          <div class="post-modal-footer">
            <p>🧠 Quer se aprofundar em <strong>${slug.split('-')[2]?.toUpperCase() || 'FERRAMENTA'}</strong>?
              <a href="https://www.google.com/search?q=${slug}" target="_blank">
                Explore a documentação oficial →
              </a>
            </p>
          </div>
        </div>
      </div>`;

    // Marca d'água
    var wc = modal.querySelector('.post-modal-container');
    wc.style.setProperty('--tool-logo-url', `url('assets/img/tools/${slug.split('-')[2]}.png')`);

    document.getElementById('go-play').onclick = function () {
      window.location = `plays/${slug}/index.html`;
    };
    document.getElementById('go-home').onclick = function () {
      modal.classList.add('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    modal.classList.remove('hidden');
  });
});

  // 4) Outros modais (Sobre/Ajuda/News)
  document.querySelectorAll('button[data-modal]').forEach(function (btn) {
    var name = btn.dataset.modal;
    var M    = document.getElementById('modal-' + name);
    if (!M) return;

    btn.addEventListener('click', function () {
      M.classList.remove('hidden');

      if (name === 'sobre' && window.Chart) {
        var canvas = document.getElementById('sobre-chart');
        if (canvas.chartInstance) {
          canvas.chartInstance.destroy();
        }
        var ctx = canvas.getContext('2d');
        canvas.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['2011', '2014', '2016', '2018', '2020', '2024'],
            datasets: [{
              label: 'Anos de XP',
              data: [1, 3, 5, 7, 9, 12],
              backgroundColor: '#00ffe0'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true }
            }
          }
        });
      }
    });
  });

  // 5) Fechamento de modais
  document.querySelectorAll('.close-modal').forEach(function (x) {
    x.addEventListener('click', function () {
      x.closest('.modal').classList.add('hidden');
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
}); // ⬅️ Correção final aqui
