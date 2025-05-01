// scripts.js

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

// 3) Função para renderizar o gráfico “Sobre Mim”
function renderSobreChart() {
  const ctx = document.getElementById('sobre-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['QA', 'Pentest', 'Automação', 'DevSecOps'],
      datasets: [{
        label: 'Anos de experiência',
        data: [12, 5, 8, 4],
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// 4) Constrói modais dinamicamente (Sobre, Ajuda, News já no HTML)
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

// 5) Listeners para abrir cada modal
document.getElementById('btn-sobre').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('modal-sobre').classList.remove('hidden');
  renderSobreChart();
});

document.getElementById('btn-ajuda').addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('modal-ajuda').classList.remove('hidden');
});

document.getElementById('btn-news').addEventListener('click', async e => {
  e.preventDefault();
  document.getElementById('modal-news').classList.remove('hidden');
  // aqui você pode chamar loadNews() se quiser puxar RSS/gifs/vídeos
});

// 6) Fechar qualquer modal ao clicar no “×” ou fora
document.body.addEventListener('click', e => {
  if (e.target.classList.contains('close-modal')) {
    const id = e.target.getAttribute('data-close');
    document.getElementById('modal-' + id).classList.add('hidden');
  }
});

// 7) “Por Dentro” buttons
document.querySelectorAll('.btn-por-dentro').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const id = btn.dataset.play.padStart(2, '0');
    document.getElementById('modal-por-dentro').classList.remove('hidden');
    // carrega conteúdo dinamicamente...
  });
});

// 8) Search/filter plays
const search = document.getElementById('search-input');
if (search) {
  search.addEventListener('input', () => {
    const term = search.value.toLowerCase();
    document.querySelectorAll('#plays .card').forEach(card => {
      card.style.display = card
        .querySelector('h3')
        .textContent
        .toLowerCase()
        .includes(term) ? '' : 'none';
    });
  });
}

// 9) Konami Code Easter Egg
if (typeof Konami === 'function') {
  new Konami(() => {
    alert('Easter egg ativado! Segredo desbloqueado!');
    new Audio('assets/audio/palpite.mp3').play();
  });
}
