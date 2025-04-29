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

  // 3) Função genérica de criação de modal
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

  // 4) Criação dos modais fixos
  makeModal('sobre', 'Sobre Denis', `
    <p>Engenheiro de Qualidade e Segurança da Informação com +12 anos de experiência.</p>
    <p>Especialista em QA, Pentest, Automação de Testes e DevSecOps.</p>
  `);

  makeModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> Executa o teste real.</li>
      <li><strong>Por Dentro:</strong> Mostra documentação explicativa.</li>
      <li><strong>Dashboard:</strong> Histórico de execuções e exportação de relatórios.</li>
    </ul>
  `);

  makeModal('news', 'Últimas Notícias', `
    <ul>
      <li><a href="https://thehackernews.com" target="_blank">The Hacker News</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);

  // 5) Associa botões da navbar
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

  // 6) Fechar modais com “×” ou ESC
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      document.getElementById('modal-' + btn.dataset.close).classList.add('hidden');
    };
  });

  // 7) “Por Dentro” e busca permanecem como antes...
  // [... seu código de Por Dentro, debounce na busca etc]
});