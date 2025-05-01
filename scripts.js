// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // 1) Typed subtitle animation
  const subtitleText = 'QA • Pentest • DevSecOps';
  let ti = 0;
  const subtitleEl = document.getElementById('typed-subtitle');
  if (subtitleEl) {
    (function type() {
      if (ti <= subtitleText.length) {
        subtitleEl.textContent = subtitleText.slice(0, ti++);
        setTimeout(type, 100);
      }
    })();
  }

  // 2) Theme toggle + persistência
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  themeToggle?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 3) Abrir modais (Sobre, Ajuda, News)
  ['sobre', 'ajuda', 'news'].forEach(id => {
    document.getElementById(`btn-${id}`)?.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById(`modal-${id}`)?.classList.remove('hidden');
      if (id === 'sobre') renderCareerChart();
      if (id === 'news') loadLatestNews();
    });
  });

  // 4) Fechar modais: botão X, ESC e clique fora
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const modalId = btn.dataset.close;
      document.getElementById(`modal-${modalId}`)?.classList.add('hidden');
    });
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // 5) “Por Dentro” de cada Play
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2, '0');
      const modal = document.getElementById('modal-por-dentro');
      const container = document.getElementById('modal-play-content');

      // abre modal e mostra loading
      container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';
      modal.classList.remove('hidden');

      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error('Não encontrado');
        const html = await resp.text();
        container.innerHTML = html;
      } catch (err) {
        console.error(err);
        container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
      }

      // adiciona botões de ação UMA única vez
      const playLink = btn.closest('.card')?.querySelector('a.btn')?.href || `plays/play-${id}/`;
      const actions = document.createElement('div');
      actions.className = 'modal-actions';
      actions.innerHTML = `
        <a href="${playLink}" class="btn">▶️ Ir ao Play</a>
        <button class="btn btn-back" id="btn-close-pordentro">← Voltar à Home</button>
      `;
      container.appendChild(actions);

      // fechar e rolar de volta pra seção Plays
      document.getElementById('btn-close-pordentro')?.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.getElementById('plays')?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });

  // 6) Busca de Plays com debounce
  const searchInput = document.getElementById('search-input');
  let timer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const term = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(term) ? '' : 'none';
      });
    }, 200);
  });

  // 7) Renderizar gráfico de carreira no modal Sobre
  function renderCareerChart() {
    const canvas = document.getElementById('sobre-chart');
    if (!canvas) return;
    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['2010','2012','2016','2017','2018','2019','2020','2024'],
        datasets: [{
          label: 'Evolução de Carreira',
          data:    [1,     2,     3,     4,     5,     6,     7,     8],
          fill: false,
          tension: 0.4,
          borderColor: '#00ff9f'
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#333' } },
          x: { grid: { color: '#333' } }
        }
      }
    });
  }

  // 8) Carregar últimas notícias via RSS2JSON
  async function loadLatestNews() {
    const container = document.getElementById('news-list');
    if (!container) return;
    container.innerHTML = '<p class="loading">Carregando notícias…</p>';
    try {
      const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
      const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`);
      const data = await res.json();
      if (data.items) {
        container.innerHTML = data.items.map(item => `
          <div class="news-card">
            <a href="${item.link}" target="_blank">
              <h3>${item.title}</h3>
              <p>${item.pubDate.split(' ')[0]}</p>
            </a>
          </div>
        `).join('');
      } else {
        container.innerHTML = '<p class="error">Nenhuma notícia disponível.</p>';
      }
    } catch {
      container.innerHTML = '<p class="error">Erro ao buscar notícias.</p>';
    }
  }

  // 9) Easter Egg Konami (opcional)
  if (typeof Konami === 'function') {
    new Konami(() => {
      alert('Easter egg ativado! 🎉');
      new Audio('assets/audio/palpite.mp3').play();
    });
  }
});