// scripts.js

// URL do seu back-end no Railway
const baseURL = 'https://mellow-commitment-production.up.railway.app';

// Função que dispara o play real via EventSource
function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';

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
    barra.style.width = Math.min(100, (logs.textContent.length / 5)) + '%';
  };
  source.onerror = () => source.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // ── 1) Instanciar gráfico do “Sobre” em escopo externo ────────────────
  let sobreChart = null;
  const chartCanvas = document.getElementById('sobre-chart');
  if (chartCanvas && window.Chart) {
    const ctx = chartCanvas.getContext('2d');
    sobreChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['QA', 'Pentest', 'Automação', 'DevSecOps'],
        datasets: [{
          label: 'Anos de Experiência',
          data: [5, 4, 4, 3],            // ajuste conforme necessidade
          backgroundColor: 'rgba(0,255,224,0.5)',
          borderColor: 'rgba(0,255,224,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // ── 2) Busca dinâmica de Plays ────────────────────────────────────────
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

  // ── 3) Configuração de TODOS os modais (abrir/fechar + ESC + resize) ──
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name  = btn.dataset.modal;               // e.g. "sobre","ajuda","news"
    const modal = document.getElementById(`modal-${name}`);
    if (!modal) return;

    // abrir e, se for Sobre, dar resize no chart
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      if (name === 'sobre' && sobreChart) sobreChart.resize();
    });

    // fechar no “X”
    modal.querySelectorAll('.close-modal').forEach(x =>
      x.addEventListener('click', () => modal.classList.add('hidden'))
    );
    // fechar clicando fora (overlay)
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  // ESC fecha qualquer modal aberto
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
              .forEach(m => m.classList.add('hidden'));
    }
  });

  // ── 4) Carregar notícias “ao vivo” no modal News ─────────────────────
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
        (json.news || []).slice(0, 6).forEach(item => {
          const card = document.createElement('div');
          card.className = 'news-card';
          card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.description || ''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          newsList.appendChild(card);
        });
      })
      .catch(err => {
        console.error(err);
        newsList.innerHTML = `<p>Erro ao carregar notícias: ${err.message}</p>`;
      });
  }

  // ── 5) Modal “Por Dentro”: iframe com a página do play ────────────────
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', () => {
      const card     = btn.closest('.card');
      const playLink = card.querySelector('a.btn').href;
      const modal    = document.getElementById('modal-por-dentro');
      const target   = document.getElementById('modal-play-content');

      target.innerHTML = `<iframe 
        src="${playLink}" 
        style="width:100%;height:80vh;border:none;">
      </iframe>`;
      modal.classList.remove('hidden');
    });
  });
});
