// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle animation
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (el && idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // 2) Theme toggle + persistence
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // 3) Initialize AOS (animations on scroll)
  if (window.AOS) AOS.init();

  // 4) Generic modal creation
  function makeModal(id, title, content) {
    if (document.getElementById('modal-' + id)) return;
    const modal = document.createElement('div');
    modal.id = 'modal-' + id;
    modal.className = 'modal hidden';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>
        ${content}
      </div>`;
    document.body.appendChild(modal);
  }

  // 5) Sobre modal (completo)
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
      <li><strong>▶️ Ver o Play:</strong> Executa o teste real.</li>
      <li><strong>Por Dentro:</strong> Documentação explicativa.</li>
    </ul>
  `);

  // 7) News modal
  makeModal('news', 'Últimas Notícias', `
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);

  // 8) Navbar buttons
  ['sobre','ajuda','news'].forEach(id => {
    const btn = document.getElementById(`btn-${id}`);
    if (!btn) return;
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`modal-${id}`).classList.remove('hidden');
      if (id === 'sobre') setTimeout(renderCareerChart, 100);
    });
  });

  // 9) “Por Dentro” buttons
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2,'0');
      const modal = document.getElementById('modal-por-dentro');
      const content = document.getElementById('modal-play-content');
      content.innerHTML = '<p>Carregando conteúdo...</p>';
      modal.classList.remove('hidden');
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        content.innerHTML = resp.ok
          ? await resp.text()
          : '<p>Conteúdo “Por Dentro” não disponível.</p>';
      } catch {
        content.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
      }
    });
  });

  // 10) Busca com debounce
  const search = document.getElementById('search-input');
  if (search) {
    let timer;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const term = search.value.toLowerCase();
        document.querySelectorAll('#plays .card').forEach(card => {
          card.style.display = card.textContent.toLowerCase().includes(term)
            ? ''
            : 'none';
        });
      }, 200);
    });
  }

  // 11) Fechar modais (Esc ou “×”)
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`modal-${btn.dataset.close}`).classList.add('hidden');
    });
  });

  // 12) Renderiza o gráfico de carreira
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
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 } }
        }
      }
    });
  }
});
