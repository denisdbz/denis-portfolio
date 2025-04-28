// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // Typed subtitle
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // Modals
  function makeModal(id, title, content) {
    if (document.getElementById('modal-'+id)) return;
    const m = document.createElement('div');
    m.id = 'modal-'+id;
    m.className = 'modal hidden';
    m.innerHTML = `
      <div class="modal-content">
        <button class="close-modal" data-close="${id}">&times;</button>
        <h2>${title}</h2>${content}
      </div>`;
    document.body.appendChild(m);
    m.querySelector('.close-modal').onclick = () => m.classList.add('hidden');
  }
  makeModal('sobre','Sobre Mim',`<p>Engenheiro de Qualidade e Segurança...</p>`);
  makeModal('ajuda','Central de Ajuda',`
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
  `);
  makeModal('news','Últimas Notícias',`
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);

  // Menu buttons
  ['sobre','ajuda','news'].forEach(id => {
    document.getElementById('btn-'+id).onclick = e => {
      e.preventDefault();
      document.getElementById('modal-'+id).classList.remove('hidden');
    };
  });

  // Search
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
});
