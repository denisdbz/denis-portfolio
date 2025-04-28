// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle
  const text = 'QA • Pentest • DevSecOps';
  let idx = 0;
  const el = document.getElementById('typed-subtitle');
  (function type() {
    if (idx <= text.length) {
      el.textContent = text.slice(0, idx++);
      setTimeout(type, 100);
    }
  })();

  // 2) Theme toggle
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // 3) Create modals
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
  makeModal('sobre','Sobre Mim',`<p>Engenheiro de Qualidade e Segurança... DevSecOps.</p>`);
  makeModal('ajuda','Central de Ajuda',`
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> executa o teste.</li>
      <li><strong>Por Dentro:</strong> mostra o passo a passo.</li>
    </ul>
  `);
  makeModal('news','Últimas Notícias',`
    <ul>
      <li><a href="https://hackerone.com/resources" target="_blank">HackerOne</a></li>
      <li><a href="https://portswigger.net/daily-swig" target="_blank">Daily Swig</a></li>
      <li><a href="https://dev.to/t/qualityassurance" target="_blank">Dev.to QA</a></li>
    </ul>
  `);
  makeModal('por-dentro','Detalhes do Play',`<div id="modal-play-content"></div>`);

  // 4) Wire menu buttons
  document.getElementById('btn-sobre').onclick = e => { e.preventDefault(); document.getElementById('modal-sobre').classList.remove('hidden'); };
  document.getElementById('btn-ajuda').onclick = e => { e.preventDefault(); document.getElementById('modal-ajuda').classList.remove('hidden'); };
  document.getElementById('btn-news').onclick = e => { e.preventDefault(); document.getElementById('modal-news').classList.remove('hidden'); };

  // 5) "Por Dentro" loads HTML from posts/
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2,'0');
      fetch(`posts/play-${id}.html`)
        .then(r => r.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
          document.getElementById('modal-por-dentro').classList.remove('hidden');
        })
        .catch(() => alert('Conteúdo não disponível.'));
    };
  });

  // 6) Busca nos cards
  const search = document.getElementById('search-input');
  if (search) {
    search.oninput = () => {
      const term = search.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.querySelector('h3').textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    };
  }
});
