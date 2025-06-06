// scripts.js

// URL do backend SSE
var baseURL = typeof baseURL !== 'undefined'
  ? baseURL
  : 'https://mellow-commitment-production.up.railway.app';

document.addEventListener("DOMContentLoaded", () => {
  // 1) Menu Hamburguer (mobile)
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // 2) Busca dinâmica
  var search = document.getElementById('search');
  var plays  = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', function() {
      var term = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(function(card) {
        card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  // 3) “Por Dentro” posts
  document.querySelectorAll('.btn-por-dentro').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
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

      var href   = 'posts/' + slug + '/index.html';
      var modal  = document.getElementById('modal-por-dentro');
      var container = modal.querySelector('.modal-content');

      // injeta o HTML do modal
      container.innerHTML = `
        <button class="close-modal" data-close>&times;</button>
        <div class="post-modal-content">
          <div class="post-modal-actions">
            <button id="go-play" class="btn neon-btn">▶️ Ir ao Play</button>
            <button id="go-home" class="btn neon-btn">⏪ Voltar à Home</button>
          </div>
          <div class="post-iframe-wrapper">
            <iframe src="${href}" style="width:100%; height:100%;"></iframe>
          </div>
          <div class="post-modal-footer">
            <p>🧠 Quer se aprofundar em <strong>${slug.split('-')[2].toUpperCase()}</strong>?
              <a href="https://www.google.com/search?q=${slug}" target="_blank">
                Explore a documentação oficial →
              </a>
            </p>
          </div>
        </div>
      `;

      // adiciona o logo como marca d’água
      container.style.setProperty(
        '--tool-logo-url',
        `url('assets/img/tools/${slug.split('-')[2]}.png')`
      );

      // remove rodapé estático e aplica tema claro ao iframe
      var iframeEl = container.querySelector('iframe');
      iframeEl.addEventListener('load', function() {
        var doc = iframeEl.contentDocument || iframeEl.contentWindow.document;
        if (!doc) return;

        doc.querySelectorAll('p').forEach(function(p) {
          if (p.textContent.includes('Quer se aprofundar em'))
            p.remove();
        });

        doc.body.classList.remove('neon-dark');
        doc.body.classList.add('light-mode');

        var styleEl = doc.createElement('style');
        styleEl.textContent = `
          body { background: transparent !important; color: #e0e0e0 !important; }
          a { color: var(--neon-color) !important; }
        `;
        doc.head.appendChild(styleEl);
      });

      // exibe o modal e trava scroll de fundo
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // handlers de fechamento e botões
      container.querySelector('[data-close]').addEventListener('click', function() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
      container.querySelector('#go-play').addEventListener('click', function() {
        window.open(href, '_blank');
      });
      container.querySelector('#go-home').addEventListener('click', function() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  });

  // 4) Outros modais (Sobre/Ajuda/News)
  document.querySelectorAll('button[data-modal]').forEach(function(btn) {
    var name = btn.dataset.modal;
    var M    = document.getElementById('modal-' + name);
    if (!M) return;
    btn.addEventListener('click', function() {
      M.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      if (name === 'sobre' && window.Chart) {
        var canvas = document.getElementById('sobre-chart');
        if (canvas.chartInstance) canvas.chartInstance.destroy();
        var ctx = canvas.getContext('2d');
        canvas.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['2011','2014','2016','2018','2020','2024'],
            datasets: [{ label:'Anos de XP', data:[1,3,5,7,9,12], backgroundColor:'#00ffe0' }]
          },
          options: { responsive:true, scales:{ y:{ beginAtZero:true } } }
        });
      }
    });
  });

  // 5) Fechamento geral de modais
  document.querySelectorAll('.close-modal').forEach(function(x) {
    x.addEventListener('click', function() {
      x.closest('.modal').classList.add('hidden');
      document.body.style.overflow = '';
    });
  });
  document.querySelectorAll('.modal').forEach(function(M) {
    M.addEventListener('click', function(e) {
      if (e.target === M) {
        M.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)').forEach(function(m) {
        m.classList.add('hidden');
      });
      document.body.style.overflow = '';
    }
  });
});