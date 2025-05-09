// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  // Extrai o número do play da URL (play-04 → 4)
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

  // Elementos de log/progresso
  const logs = document.getElementById('output-log')
            || document.getElementById('output-box')
            || document.getElementById('logs');
  const barra = document.getElementById('progress-fill')
             || document.querySelector('.barra-preenchida')
             || document.querySelector('.fill');
  const container = document.getElementById('progress-container');

  if (!logs || !barra || !container) {
    console.error('Container de log/barra não encontrado:', logs, barra, container);
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

document.addEventListener('DOMContentLoaded', () => {
  // ── 1) Toggle de tema claro/escuro ───────────────────────────────────────
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
    });
  }

  // ── 2) Busca dinâmica de Plays ─────────────────────────────────────────
  const searchInput = document.getElementById('search');
  const playsSection = document.getElementById('plays');
  if (searchInput && playsSection) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.toLowerCase();
      playsSection.querySelectorAll('.card').forEach(card => {
        const text = (card.querySelector('h3').textContent +
                      card.querySelector('p').textContent).toLowerCase();
        card.style.display = text.includes(term) ? '' : 'none';
      });
    });
  }

  // ── 3) Modais via data-modal + fechamento fora do conteúdo ─────────────
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name  = btn.dataset.modal;               // ex: "sobre", "ajuda", "news", "por-dentro"
    const modal = document.getElementById(`modal-${name}`);
    if (!modal) return;

    btn.addEventListener('click', () => modal.classList.remove('hidden'));
    modal.querySelectorAll('.close-modal').forEach(x =>
      x.addEventListener('click', () => modal.classList.add('hidden'))
    );
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  // ── 4) Fechar todos modais pressionando ESC ────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
              .forEach(m => m.classList.add('hidden'));
    }
  });

  // ── 5) Inicializar gráfico do modal “Sobre” ────────────────────────────
  const canvas = document.getElementById('sobre-chart');
  if (canvas && window.Chart) {
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['QA','Pentest','Automação','DevSecOps'],
        datasets: [{
          label: 'Anos de Experiência',
          data: [5,4,4,3],  // ajuste para seus valores reais
          backgroundColor: 'rgba(0,255,224,0.5)',
          borderColor:     'rgba(0,255,224,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // ── 6) Carregar notícias “ao vivo” no modal “News” ──────────────────────
  const newsList = document.getElementById('news-list');
  if (newsList) {
    fetch('https://api.currentsapi.services/v1/latest-news?apiKey=YOUR_API_KEY')
      .then(res => res.json())
      .then(json => {
        newsList.innerHTML = '';
        (json.news || []).slice(0,6).forEach(item => {
          const card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description||''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>
          `;
          newsList.appendChild(card);
        });
      })
      .catch(() => {
        newsList.innerHTML = '<p>Falha ao carregar notícias.</p>';
      });
  }

  // ── 7) Modal “Por Dentro”: carrega conteúdo do play via API ─────────────
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', () => {
      const playNum = btn.dataset.play;
      const modal   = document.getElementById('modal-por-dentro');
      const target  = document.getElementById('modal-play-content');

      target.innerHTML = '<p>Carregando…</p>';
      fetch(`${baseURL}/api/play/${playNum}`)
        .then(res => res.text())
        .then(html => target.innerHTML = html)
        .catch(() => target.innerHTML = `<p>Erro ao carregar Play ${playNum}.</p>`)
        .finally(() => modal.classList.remove('hidden'));
    });
  });
});
