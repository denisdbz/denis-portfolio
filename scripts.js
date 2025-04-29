// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle animation
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // 2) Theme toggle + persistência
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');

  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 3) Cria modais
  function makeModal(id, title, content) {
    if (document.getElementById('modal-' + id)) return;
    const m = document.createElement('div');
    m.id = 'modal-' + id;
    m.className = 'modal hidden';
    m.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>${content}
      </div>`;
    document.body.appendChild(m);
  }

  // Modal Sobre com linha do tempo e chart
  makeModal('sobre', 'Sobre Denis Oliveira', `
    <div class="modal-sobre">
      <h1>Minha Trajetória Profissional</h1>
      <ul class="timeline">
        <li>
          <span class="timeline-year">2010 – 2012</span>
          <div class="timeline-content">
            <h3>Analista de Atendimento Jr. — Droga Raia</h3>
            <p>Suporte a usuários, manutenção de hardware, SQL e administração Linux.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2012 – 2015</span>
          <div class="timeline-content">
            <h3>Analista de Testes — RaiaDrogasil S/A</h3>
            <p>Criação de cenários, automação com Selenium-IDE, TestLink e Mantis; testes de caixa preta, integração e smoke.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2016 – 2017</span>
          <div class="timeline-content">
            <h3>Analista de Testes — Spread Tecnologia</h3>
            <p>Projetos de telecom, coordenação de equipes e documentação de casos de teste.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2017 – 2018</span>
          <div class="timeline-content">
            <h3>Analista de Automação — Flexvision</h3>
            <p>Automação em Java/Selenium, Jenkins CI e gestão de defeitos via Jira.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2018 – 2019</span>
          <div class="timeline-content">
            <h3>Test Automation — K2 Partnering Solutions</h3>
            <p>BDD com Ruby/Cucumber, Mobile Testing e SOAPUI.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2019 – 2020</span>
          <div class="timeline-content">
            <h3>Analista de Automação — Prime Control</h3>
            <p>Planejamento e execução de testes automatizados e manuais em múltiplos ambientes.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2020 – 2023</span>
          <div class="timeline-content">
            <h3>QA Engineer — VR Benefícios</h3>
            <p>Automação com Cypress, JMeter e integração contínua via Jenkins.</p>
          </div>
        </li>
        <li>
          <span class="timeline-year">2024 – Presente</span>
          <div class="timeline-content">
            <h3>Senior Software Quality Engineer — Fiserv Brasil</h3>
            <p>Automação end-to-end (Playwright, Postman), Pentest e DevSecOps em fintech.</p>
          </div>
        </li>
      </ul>

      <h2>Principais Competências</h2>
      <ul class="skills-list">
        <li>Automação: Cypress, Playwright, Selenium, Appium</li>
        <li>Performance: JMeter, k6</li>
        <li>Pentest: OWASP Top 10, Burp Suite, Nmap, SQLMap, Hydra</li>
        <li>DevOps: Docker, GitHub Actions, Railway, Jenkins</li>
      </ul>

      <div class="chart-container">
        <canvas id="careerChart" width="400" height="200"></canvas>
      </div>
    </div>
  `);

  // Modal Ajuda
  makeModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> Executa o teste real.</li>
      <li><strong>Por Dentro:</strong> Mostra documentação explicativa.</li>
    </ul>
  `);

  // Modal News
  makeModal('news', 'Últimas Notícias', `
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);

  // 4) Hook navbar buttons
  ['sobre','ajuda','news'].forEach(id => {
    document.getElementById(`btn-${id}`).onclick = e => {
      e.preventDefault();
      document.getElementById(`modal-${id}`).classList.remove('hidden');
      if (id === 'sobre') setTimeout(renderCareerChart, 100);
    };
  });

  // 5) Por Dentro
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2,'0');
      const modal = document.getElementById('modal-por-dentro');
      const content = document.getElementById('modal-play-content');
      content.innerHTML = '<p>Carregando conteúdo...</p>';
      modal.classList.remove('hidden');
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error();
        content.innerHTML = await resp.text();
      } catch {
        content.innerHTML = '<p>Conteúdo “Por Dentro” não disponível.</p>';
      }
    };
  });

  // 6) Busca com debounce
  const search = document.getElementById('search-input');
  let timer;
  search.oninput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    }, 200);
  };

  // 7) Fechar modais
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      document.getElementById(`modal-${btn.dataset.close}`).classList.add('hidden');
    };
  });

  // 8) Função para renderizar o gráfico
  function renderCareerChart() {
    const ctx = document.getElementById('careerChart').getContext('2d');
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
