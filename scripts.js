// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

// Dispara o play real via SSE
function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const barra = document.querySelector('.barra-preenchida') || document.getElementById('progress-fill');
  const container = document.getElementById('progress-container');
  if (!logs || !barra || !container) {
    console.error('Não encontrei elementos de log/barra/container:', logs, barra, container);
    return;
  }

  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  source.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => source.close();
}

// Conteúdo “Por Dentro” (mantido conforme sua lógica)
const playPosts = { /* ... seus 22 posts ... */ };
function openModalPorDentro(id) {
  /* ... seu código que popula #modal-por-dentro ... */
}

// Espera o DOM carregar para inicializar tudo
document.addEventListener('DOMContentLoaded', () => {
  // ─── 1) Toggle de tema claro/escuro ───────────────────────────
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
    });
  }

  // ─── 2) Filtrar Plays ─────────────────────────────────────────
  const searchInput = document.getElementById('search');
  const playsSection = document.getElementById('plays');
  if (searchInput && playsSection) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      playsSection.querySelectorAll('.card').forEach(card => {
        const txt = (card.querySelector('h3').textContent +
                     card.querySelector('p').textContent).toLowerCase();
        card.style.display = txt.includes(term) ? '' : 'none';
      });
    });
  }

  // ─── 3) Eventos “Por Dentro” ─────────────────────────────────
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModalPorDentro(btn.getAttribute('data-play-id'));
    });
  });

  // ─── 4) Modal: abrir da navbar, fechar “×”, fora e Esc ────────
  let sobreChart = null;
  // abre via data-modal
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name  = btn.dataset.modal;
    const modal = document.getElementById(`modal-${name}`);
    if (!modal) return;

    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');

      // lazy init do gráfico “Sobre”
      if (name === 'sobre' && window.Chart) {
        const canvas = document.getElementById('sobre-chart');
        const ctx    = canvas.getContext('2d');
        if (!sobreChart) {
          sobreChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['2011','2014','2016','2018','2020','2024'],
              datasets: [{
                label: 'Anos de Experiência',
                data: [1,3,5,7,9,12],
                backgroundColor: 'rgba(0,255,224,0.7)'
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Anos' } }
              }
            }
          });
        } else {
          sobreChart.resize();
        }
      }
    });
  });

  // fechar no “×”
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.add('hidden');
    });
  });
  // fechar clicando fora do conteúdo
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });
  // fechar com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
              .forEach(m => m.classList.add('hidden'));
    }
  });

  // ─── 5) Carregar notícias ao vivo ─────────────────────────────
  const NEWS_API_KEY = 'KTeKQv1H4PHbtVhF_fwXVLvA178RVJ6z13A_KqgZuYuxLGp3';
  const newsList = document.getElementById('news-list');
  if (newsList) {
    fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${NEWS_API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(json => {
        newsList.innerHTML = '';
        (json.news || []).slice(0,6).forEach(item => {
          const card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description||''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        newsList.innerHTML = `<p>Erro ao carregar notícias: ${err.message}</p>`;
      });
  }
});
