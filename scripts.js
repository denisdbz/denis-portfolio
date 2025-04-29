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
    <p>Engenheiro de Qualidade e Segurança da Informação com +12 anos de experiência.</p>
    <p>Especialista em QA, Pentest, Automação de Testes e DevSecOps.</p>
  `);

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
