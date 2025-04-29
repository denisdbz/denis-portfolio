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

  // 2) Theme toggle (neon ↔ light)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }

  // 3) Build modals dynamically
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

  makeModal('sobre', 'Sobre Mim', `
<div class="modal-sobre">
  <h1>Sobre Denis Oliveira Santos</h1>
  <p>
    Sou Engenheiro de Qualidade de Software e Segurança da Informação com mais de
    <strong>12 anos</strong> de experiência, atuando desde 2012 em projetos de 
    infraestrutura, QA manual, automação de testes e, nos últimos anos, em 
    pentesting e DevSecOps. Minha missão é integrar qualidade e segurança 
    desde as primeiras etapas do ciclo de desenvolvimento até a entrega final.
  </p>

  <h2>Trajetória Profissional</h2>
  <ul class="timeline">
    <li>
      <span class="timeline-year">2010 – 2012</span>
      <div class="timeline-content">
        <h3>Analista de Atendimento Jr. — Droga Raia</h3>
        <p>Suporte técnico Linux/Windows, SQL e manutenção de hardware.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2012 – 2015</span>
      <div class="timeline-content">
        <h3>Analista de Testes — RaiaDrogasil S/A</h3>
        <p>Criação de roteiros de teste, automação com Selenium-IDE, TestLink e Mantis.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2016 – 2017</span>
      <div class="timeline-content">
        <h3>Analista de Testes — Spread Tecnologia</h3>
        <p>Coordenação de casos de teste e projetos de telecom em ambientes ágeis.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2017 – 2018</span>
      <div class="timeline-content">
        <h3>Automação de Testes — Flexvision</h3>
        <p>Desenvolvimento de frameworks em Java/Selenium e integração contínua com Jenkins.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2018 – 2019</span>
      <div class="timeline-content">
        <h3>Test Automation — K2 Partnering Solutions</h3>
        <p>BDD com Ruby/Cucumber, testes mobile e APIs com SOAPUI.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2019 – 2020</span>
      <div class="timeline-content">
        <h3>Analista de Automação — Prime Control</h3>
        <p>Planejamento e execução de testes end-to-end e mobile.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2020 – 2023</span>
      <div class="timeline-content">
        <h3>QA Engineer — VR Benefícios</h3>
        <p>Automação com Cypress, JMeter e pipelines CI/CD no Jenkins.</p>
      </div>
    </li>
    <li>
      <span class="timeline-year">2024 – Presente</span>
      <div class="timeline-content">
        <h3>Senior Software Quality Engineer — Fiserv Brasil</h3>
        <p>
          Automação end-to-end com Playwright e Postman, pentests em rede e 
          aplicações, e práticas DevSecOps em fintech.
        </p>
      </div>
    </li>
  </ul>

  <h2>Principais Competências</h2>
  <ul class="skills-list">
    <li><strong>Testes e QA:</strong> Cypress, Selenium, Appium, Postman/Newman</li>
    <li><strong>Pentest & Segurança:</strong> OWASP Top 10, Burp Suite, Nmap, SQLMap, Hydra</li>
    <li><strong>Performance:</strong> JMeter, k6</li>
    <li><strong>DevSecOps:</strong> Docker, GitHub Actions, Railway, Jenkins</li>
  </ul>

  <h2>Evolução da Carreira</h2>
  <div class="chart-container">
    <canvas id="careerChart" width="400" height="200"></canvas>
  </div>
</div>

  makeModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> Executa o teste real.</li>
      <li><strong>Por Dentro:</strong> Mostra documentação explicativa.</li>
    </ul>
  `);

  makeModal('news', 'Últimas Notícias', `
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);

  makeModal('por-dentro', 'Detalhes do Play', `<div id="modal-play-content"></div>`);

  // 4) Hook navbar buttons
  document.getElementById('btn-sobre').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-sobre').classList.remove('hidden');
  };
  document.getElementById('btn-ajuda').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-ajuda').classList.remove('hidden');
  };
  document.getElementById('btn-news').onclick = e => {
    e.preventDefault();
    document.getElementById('modal-news').classList.remove('hidden');
  };

  // 5) "Por Dentro" buttons for each play
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      document.getElementById('modal-play-content').innerHTML = '<p>Carregando conteúdo...</p>';
      document.getElementById('modal-por-dentro').classList.remove('hidden');
      fetch(`posts/play-${id}.html`)
        .then(r => r.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
        })
        .catch(() => {
          document.getElementById('modal-play-content').innerHTML = '<p>Conteúdo "Por Dentro" ainda não disponível.</p>';
        });
    };
  });

  // 6) Search/filter plays
  const search = document.getElementById('search-input');
  if (search) {
    search.oninput = () => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display =
          card.querySelector('h3').textContent.toLowerCase().includes(term)
          ? ''
          : 'none';
      });
    };
  }

  // 7) Konami Code Activation (Desktop + Mobile)
  if (typeof Konami === 'function') {
    const easterEgg = new Konami(() => {
      alert('Easter egg ativado! Segredo desbloqueado!');
      const audio = new Audio('assets/audio/palpite.mp3');
      audio.play();
    });
  }

  // 8) Fechar modais ao clicar no botão de fechar (X)
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-close');
      const modal = document.getElementById('modal-' + modalId);
      if (modal) {
        modal.classList.add('hidden');
      }
    };
  });

  // 9) Fechar o modal "Por Dentro" automaticamente ao clicar nos links dentro dele
  document.getElementById('modal-play-content').addEventListener('click', e => {
    if (e.target.tagName === 'A' && e.target.closest('#modal-play-content')) {
      document.getElementById('modal-por-dentro').classList.add('hidden');
    }
  });

});
