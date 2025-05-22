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
  // objeto com slug de cada play
  var posts = {
    '1':  'play-01-nmap-recon',
    '2':  'play-02-hydra-dvwa',
    '3':  'play-03-sqlmap-dvwa',
    '4':  'play-04-jmeter-loadtest',
    '5':  'play-05-qa-automacao',
    '6':  'play-06-carga-bash',
    '7':  'play-07-mobile-tests',
    '8':  'play-08-nikto-scan',
    '9':  'play-09-k6-loadtest',
    '10': 'play-10-api-validation',
    '11': 'play-11-xss-scanner',
    '12': 'play-12-csrf-checker',
    '13': 'play-13-api-fuzzing',
    '14': 'play-14-dependency-cve-audit',
    '15': 'play-15-ssl-tls-health-check',
    '16': 'play-16-docker-vulnerability-scan',
    '17': 'play-17-kubernetes-config-audit',
    '18': 'play-18-owasp-zap-automated-scan',
    '19': 'play-19-static-analysis-python-bandit',
    '20': 'play-20-iac-security-audit-terraform',
    '21': 'play-21-jwt-token-penetration-test',
    '22': 'play-22-dependency-supply-chain-check'
  };

  // objeto com nome de arquivo de logo para cada play
  var toolLogos = {
    '1':  'nmap',
    '2':  'hydra',
    '3':  'sqlmap',
    '4':  'jmeter',
    '5':  'cypress',
    '6':  'bash',
    '7':  'appium',       // agora apontando para assets/img/tools/appium.png
    '8':  'nikto',
    '9':  'k6',
    '10': 'postman',
    '11': 'xss',
    '12': 'csrf',
    '13': 'fuzz',
    '14': 'dependency-check',
    '15': 'ssl',
    '16': 'trivy',
    '17': 'kubernetes',
    '18': 'zap',
    '19': 'bandit',
    '20': 'terraform',
    '21': 'jwt',
    '22': 'grype'
  };

  document.querySelectorAll('.btn-por-dentro').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var id   = btn.getAttribute('data-play-id');
      var slug = posts[id];
      if (!slug) return;

      var href   = window.location.origin + '/denis-portfolio/plays/' + slug + '/index.html';
      var modal  = document.getElementById('modal-por-dentro');
      var content = modal.querySelector('.modal-content');

      content.innerHTML = `
        <button class="close-modal">×</button>
        <div class="post-modal-actions">
          <button id="go-play" class="btn neon-btn">▶️ Ir ao Play</button>
          <button id="go-home" class="btn neon-btn">⏪ Voltar à Home</button>
        </div>
        <div class="post-modal-container">
          <div class="post-modal-content">
            <iframe src="${href}" frameborder="0"></iframe>
          </div>
        </div>
        <div class="post-modal-footer">
          <p>🧠 Quer se aprofundar em <strong>${(slug.split('-')[2]||'').toUpperCase()}</strong>?
            <a href="https://www.google.com/search?q=${toolLogos[id]}" target="_blank">
              Explore a documentação oficial →
            </a>
          </p>
        </div>`;

      // watermark centralizado
      var logoName = toolLogos[id] || slug.split('-')[2];
      var container = content.querySelector('.post-modal-container');
      container.style.setProperty('--tool-logo-url',
        `url('assets/img/tools/${logoName}.png')`
      );

      // botões internos
      document.getElementById('go-play').onclick = function () {
        window.location = href;
      };
      document.getElementById('go-home').onclick = function () {
        modal.classList.add('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      content.querySelector('.close-modal').onclick = function () {
        modal.classList.add('hidden');
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
        var ctx = document.getElementById('sobre-chart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['2011','2014','2016','2018','2020','2024'],
            datasets:[{
              label:'Anos de XP',
              data:[1,3,5,7,9,12],
              backgroundColor: '#00ffe0'
            }]
          },
          options:{
            responsive:true,
            scales:{ y:{ beginAtZero:true } }
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
    if (e.key==='Escape')
      document.querySelectorAll('.modal:not(.hidden)')
        .forEach(function(m){m.classList.add('hidden');});
  });

  // 6) Notícias via API
  var newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(baseURL + '/api/news')
      .then(r=> r.ok? r.json(): Promise.reject(r.statusText))
      .then(json=>{
        newsList.innerHTML='';
        (json.news||[]).slice(0,6).forEach(item=>{
          var card = document.createElement('div');
          card.className='news-card';
          card.innerHTML=`
            <h3>${item.title}</h3>
            <p>${item.description||''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(err=>{
        newsList.innerHTML=`<p>Erro ao carregar notícias: ${err}</p>`;
      });
  }

  // 7) expor execução global
  window.executarTeste = executarTeste;
});

// ===== fun­ção SSE global =====
function executarTeste() {
  var m = window.location.pathname.match(/play-(\d+)/);
  var num = m? m[1] : '1';

  var logs = document.getElementById('output-box');
  var bar  = document.getElementById('progress-fill');
  var cont = document.getElementById('progress-container');
  var done = document.getElementById('final-msg');
  if (!logs||!bar||!cont) {
    console.error('Log elements missing');
    return;
  }
  logs.textContent = '';
  bar.style.width = '0%';
  cont.classList.remove('hidden');
  if (done) done.classList.add('hidden');

  var es = new EventSource(baseURL + '/api/play/' + num + '/stream');
  es.onmessage = function(e) {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    var prog = Math.min(100, logs.textContent.length/5);
    bar.style.width = prog + '%';
    if (/\[✓\]|\[✔️\]|concluída/i.test(e.data)) {
      bar.style.width='100%';
      if (done) done.classList.remove('hidden');
      es.close();
      alert('✔️ Execução concluída com sucesso!');
    }
  };
}
