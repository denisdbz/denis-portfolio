// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typed subtitle effect
  const subtitleText = 'QA • Pentest • DevSecOps';
  let subIdx = 0;
  const subtitleEl = document.getElementById('typed-subtitle');
  function typeSubtitle() {
    if (subIdx <= subtitleText.length) {
      subtitleEl.textContent = subtitleText.slice(0, subIdx++);
      setTimeout(typeSubtitle, 100);
    }
  }
  typeSubtitle();

  // 2. Theme toggle (dark / light)
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // 3. Utility to create modals
  function createModal(id, title, htmlContent) {
    if (document.getElementById('modal-' + id)) return;
    const modal = document.createElement('div');
    modal.id = 'modal-' + id;
    modal.className = 'modal hidden';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>
        ${htmlContent}
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  // 4. Define and build your modals
  createModal('sobre', 'Sobre Mim', `
    <p>Engenheiro de Qualidade e Segurança da Informação com +12 anos de experiência em QA, automação de testes e pentest. Especialista em Cypress, Appium, JMeter, Jenkins e Kali Linux. Foco em CI/CD e cultura DevSecOps.</p>
  `);
  createModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta <strong>plays reais</strong> de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> executa o teste em tempo real.</li>
      <li><strong>Por Dentro:</strong> mostra a documentação passo a passo.</li>
    </ul>
  `);
  createModal('news', 'Últimas Notícias', `
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA Trends</a></li>
    </ul>
  `);
  createModal('por-dentro', 'Detalhes do Play', `<div id="modal-play-content"></div>`);

  // 5. Wire up menu buttons to open modals
  document.getElementById('btn-sobre').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-sobre').classList.remove('hidden');
  });
  document.getElementById('btn-ajuda').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-ajuda').classList.remove('hidden');
  });
  // If you add an id="btn-news" to the News link, this will open the modal
  document.getElementById('btn-news')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-news').classList.remove('hidden');
  });

  // 6. "Por Dentro" buttons for each Play
  document.querySelectorAll('.btn-por-dentro').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const playId = button.getAttribute('data-play').padStart(2, '0');
      fetch(`posts/play-${playId}.html`)
        .then(resp => resp.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
          document.getElementById('modal-por-dentro').classList.remove('hidden');
        })
        .catch(() => {
          document.getElementById('modal-play-content').innerHTML = '<p>Conteúdo não disponível.</p>';
          document.getElementById('modal-por-dentro').classList.remove('hidden');
        });
    });
  });

  // 7. Search filter for Plays
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        card.style.display = title.includes(term) ? '' : 'none';
      });
    });
  }
});
