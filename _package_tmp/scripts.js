// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Inicia AOS
  AOS.init({ duration: 800, once: true });

  // 2) Typed subtitle animation
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // 3) Theme toggle com persistência
  const themeToggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light-mode');
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 4) Função genérica de criação de modal
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

  // 5) Modais fixos
  makeModal('sobre', 'Sobre Denis Oliveira', `
    <div class="modal-sobre">
      <h1>Minha Trajetória Profissional</h1>
      <ul class="timeline">
        <li>
          <button class="timeline-toggle">2010 – 2012</button>
          <div class="timeline-detail">Analista de Atendimento Jr. — Droga Raia: suporte técnico Linux e SQL.</div>
        </li>
        <li>
          <button class="timeline-toggle">2012 – 2015</button>
          <div class="timeline-detail">Analista de Testes — RaiaDrogasil: automação Selenium-IDE, TestLink, Mantis.</div>
        </li>
        <li>
          <button class="timeline-toggle">2016 – 2017</button>
          <div class="timeline-detail">Analista de Testes — Spread Tecnologia: gestão de casos e telecom.</div>
        </li>
        <li>
          <button class="timeline-toggle">2017 – 2018</button>
          <div class="timeline-detail">Automação — Flexvision: Jenkins CI, automação Java/Selenium, Jira.</div>
        </li>
        <li>
          <button class="timeline-toggle">2018 – 2019</button>
          <div class="timeline-detail">Test Automation — K2 Partnering: Ruby/Cucumber, SOAPUI.</div>
        </li>
        <li>
          <button class="timeline-toggle">2019 – 2020</button>
          <div class="timeline-detail">Analista de Automação — Prime Control: testes end-to-end e mobile.</div>
        </li>
        <li>
          <button class="timeline-toggle">2020 – 2023</button>
          <div class="timeline-detail">QA Engineer — VR Benefícios: Cypress, JMeter, Jenkins CI.</div>
        </li>
        <li>
          <button class="timeline-toggle">2024 – Presente</button>
          <div class="timeline-detail">Senior QA Engineer — Fiserv: Playwright, Postman, DevSecOps.</div>
        </li>
      </ul>
    </div>
  `);
  makeModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> Executa o teste real.</li>
      <li><strong>Por Dentro:</strong> Mostra documentação detalhada.</li>
    </ul>
  `);
  makeModal('news', 'Últimas Notícias', `
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);

  // 6) Hook navbar buttons
  ['sobre', 'ajuda', 'news'].forEach(id => {
    document.getElementById(`btn-${id}`).onclick = e => {
      e.preventDefault();
      document.getElementById(`modal-${id}`).classList.remove('hidden');
    };
  });

  // 7) Botões “Por Dentro”
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      const modal = document.getElementById('modal-por-dentro');
      const content = document.getElementById('modal-play-content');
      content.innerHTML = '<p>Carregando conteúdo...</p>';
      modal.classList.remove('hidden');
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        content.innerHTML = resp.ok ? await resp.text() : '<p>Conteúdo indisponível.</p>';
      } catch {
        content.innerHTML = '<p>Erro ao carregar conteúdo.</p>';
      }
    };
  });

  // 8) Busca com debounce
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

  // 9) Fechar modais
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

  // 10) Service Worker registration
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }
});
