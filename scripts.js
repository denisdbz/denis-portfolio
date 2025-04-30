// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle animation
  const subtitleText = 'QA • Pentest • DevSecOps';
  let ti = 0;
  const subEl = document.getElementById('typed-subtitle');
  (function type() {
    if (ti <= subtitleText.length) {
      subEl.textContent = subtitleText.slice(0, ti++);
      setTimeout(type, 100);
    }
  })();

  // 2) Theme toggle (neon ↔ light) with persistence
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // 3) Initialize AOS (animations on scroll)
  if (window.AOS) AOS.init({ duration: 600, once: true });

  // 4) Generic modal creation
  function makeModal(id, title, content) {
    if (document.getElementById('modal-' + id)) return;
    const m = document.createElement('div');
    m.id = 'modal-' + id;
    m.className = 'modal hidden';
    m.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>
        ${content}
      </div>`;
    document.body.appendChild(m);
  }

  // 5) Sobre modal (linha do tempo + gráfico)
  makeModal('sobre', 'Sobre Mim', `
    <div class="modal-sobre">
      <h1>Sobre Denis Oliveira Santos</h1>
      <p>Sou Engenheiro de Qualidade de Software e Segurança da Informação com mais de <strong>12 anos</strong> de experiência, atuando desde 2012 em projetos de infraestrutura, QA manual, automação de testes e, nos últimos anos, em pentesting e DevSecOps. Minha missão é integrar qualidade e segurança desde as primeiras etapas do ciclo de desenvolvimento até a entrega final.</p>
      <h2>Trajetória Profissional</h2>
      <ul class="timeline">
        <li><span class="timeline-year">2010 – 2012</span><div class="timeline-content"><h3>Analista de Atendimento Jr. — Droga Raia</h3><p>Suporte técnico Linux/Windows, SQL e manutenção de hardware.</p></div></li>
        <li><span class="timeline-year">2012 – 2015</span><div class="timeline-content"><h3>Analista de Testes — RaiaDrogasil S/A</h3><p>Criação de roteiros de teste, automação com Selenium-IDE, TestLink e Mantis.</p></div></li>
        <li><span class="timeline-year">2016 – 2017</span><div class="timeline-content"><h3>Analista de Testes — Spread Tecnologia</h3><p>Coordenação de casos de teste e projetos de telecom em ambientes ágeis.</p></div></li>
        <li><span class="timeline-year">2017 – 2018</span><div class="timeline-content"><h3>Automação de Testes — Flexvision</h3><p>Desenvolvimento de frameworks em Java/Selenium e integração contínua com Jenkins.</p></div></li>
        <li><span class="timeline-year">2018 – 2019</span><div class="timeline-content"><h3>Test Automation — K2 Partnering Solutions</h3><p>BDD com Ruby/Cucumber, testes mobile e APIs com SOAPUI.</p></div></li>
        <li><span class="timeline-year">2019 – 2020</span><div class="timeline-content"><h3>Analista de Automação — Prime Control</h3><p>Planejamento e execução de testes end-to-end e mobile.</p></div></li>
        <li><span class="timeline-year">2020 – 2023</span><div class="timeline-content"><h3>QA Engineer — VR Benefícios</h3><p>Automação com Cypress, JMeter e pipelines CI/CD no Jenkins.</p></div></li>
        <li><span class="timeline-year">2024 – Presente</span><div class="timeline-content"><h3>Senior Software Quality Engineer — Fiserv Brasil</h3><p>Automação end-to-end com Playwright e Postman, pentests em rede e aplicações, e práticas DevSecOps em fintech.</p></div></li>
      </ul>
      <h2>Principais Competências</h2>
      <ul class="skills-list">
        <li><strong>Testes e QA:</strong> Cypress, Selenium, Appium, Postman/Newman</li>
        <li><strong>Pentest & Segurança:</strong> OWASP Top 10, Burp Suite, Nmap, SQLMap, Hydra</li>
        <li><strong>Performance:</strong> JMeter, k6</li>
        <li><strong>DevSecOps:</strong> Docker, GitHub Actions, Railway, Jenkins</li>
      </ul>
      <h2>Evolução da Carreira</h2>
      <div class="chart-container"><canvas id="careerChart" width="400" height="200"></canvas></div>
    </div>
  `);

  // 6) Ajuda modal
  makeModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>▶️ Ver o Play</strong> → Executa o teste real.</li>
      <li><strong>Por Dentro</strong> → Documentação explicativa.</li>
    </ul>
  `);

  // 7) News modal placeholder
  makeModal('news', 'Últimas Notícias', `
    <div id="news-list" class="news-grid">
      <p class="loading">Carregando notícias…</p>
    </div>
  `);

  // 8) “Por Dentro” modal
  makeModal('por-dentro', 'Detalhes do Play', `<div id="modal-play-content"></div>`);

  // 9) Navbar buttons
  document.getElementById('btn-sobre').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-sobre').classList.remove('hidden');
    // renderiza gráfico após modal aberto
    setTimeout(renderCareerChart, 100);
  };
  document.getElementById('btn-ajuda').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-ajuda').classList.remove('hidden');
  };
  document.getElementById('btn-news').onclick = async e => {
    e.preventDefault();
    const modal = document.getElementById('modal-news');
    const list  = document.getElementById('news-list');
    list.innerHTML = `<p class="loading">Carregando notícias…</p>`;

    try {
      const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
      const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`
      );
      const data = await res.json();
      if (data.status !== 'ok') throw new Error(data.message);

      list.innerHTML = data.items.map(item => `
        <div class="news-card">
          <img src="${item.thumbnail || item.enclosure.link || 'https://via.placeholder.com/300x100'}" alt="${item.title}"/>
          <div class="news-card-content">
            <h4>${item.title}</h4>
            <small>${item.pubDate.split(' ')[0]}</small>
            <a href="${item.link}" target="_blank">Leia mais →</a>
          </div>
        </div>
      `).join('');
    } catch (err) {
      console.error('News load error:', err);
      list.innerHTML = `<p class="loading error">Erro ao carregar notícias.</p>`;
    }

    modal.classList.remove('hidden');
  };

  // 10) “Por Dentro” buttons
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      document.getElementById('modal-play-content').innerHTML = '<p>Carregando conteúdo…</p>';
      document.getElementById('modal-por-dentro').classList.remove('hidden');
      fetch(`posts/play-${id}.html`)
        .then(r => r.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
        })
        .catch(() => {
          document.getElementById('modal-play-content').innerHTML = '<p>Conteúdo indisponível.</p>';
        });
    };
  });

  // 11) Search/filter plays
  const search = document.getElementById('search-input');
  if (search) {
    search.addEventListener('input', () => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    });
  }

  // 12) Konami Code Easter Egg
  if (typeof Konami === 'function') {
    new Konami(() => {
      alert('Easter egg ativado! 🎉');
      new Audio('assets/audio/palpite.mp3').play();
    });
  }

  // 13) Close modals (× button)
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`modal-${btn.dataset.close}`).classList.add('hidden');
    });
  });

  // 14) Auto-close “Por Dentro” when clicking links inside it
  document.getElementById('modal-play-content')
    .addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        document.getElementById('modal-por-dentro').classList.add('hidden');
      }
    });

  // 15) Render the career chart in Sobre modal
  function renderCareerChart() {
    const ctx = document.getElementById('careerChart');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2010','2012','2016','2017','2018','2019','2020','2024'],
        datasets: [{
          label: 'Evolução de Nível',
          data: [1,2,3,4,5,6,7,8],
          fill: false,
          tension: 0.4
        }]
      },
      options: {
        scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
      }
    });
  }
}); 
