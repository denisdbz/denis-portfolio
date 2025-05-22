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
        '1':'play-01-nmap-recon','2':'play-02-hydra-dvwa','3':'play-03-sqlmap-dvwa',
        '4':'play-04-jmeter-loadtest','5':'play-05-qa-automacao','6':'play-06-carga-bash',
        '7':'play-07-mobile-tests','8':'play-08-nikto-scan','9':'play-09-k6-loadtest',
        '10':'play-10-api-validation','11':'play-11-xss-scanner','12':'play-12-csrf-checker',
        '13':'play-13-api-fuzzing','14':'play-14-dependency-cve-audit',
        '15':'play-15-ssl-tls-health-check','16':'play-16-docker-vulnerability-scan',
        '17':'play-17-kubernetes-config-audit','18':'play-18-owasp-zap-automated-scan',
        '19':'play-19-static-analysis-python-bandit','20':'play-20-iac-security-audit-terraform',
        '21':'play-21-jwt-token-penetration-test','22':'play-22-dependency-supply-chain-check'
      };
      var slug = posts[id];
      if (!slug) return;

      var href  = window.location.origin + '/denis-portfolio/posts/' + slug + '.html';
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
            <iframe src="${href}" frameborder="0" style="width:100%; height:400px;"></iframe>
            <div class="post-modal-footer">
              <p>🧠 Quer se aprofundar em <strong>${slug.split('-')[2].toUpperCase()}</strong>?
                <a href="https://www.google.com/search?q=${slug}" target="_blank">
                  Explore a documentação oficial →
                </a>
              </p>
            </div>
          </div>
        </div>`;

      // watermark
      var wc = modal.querySelector('.post-modal-container');
      wc.style.setProperty('--tool-logo-url',
        `url('assets/img/tools/${slug.split('-')[2]}.png')`);

      document.getElementById('go-play').onclick = function () {
        window.location = href;
      };
      document.getElementById('go-home').onclick = function () {
        modal.classList.add('hidden');
        window.scrollTo({ top:0, behavior:'smooth' });
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
});
