document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // 1) Typed subtitle animation
  // ================================
  const subtitleText = 'QA • Pentest • DevSecOps';
  let ti = 0;
  const subtitleEl = document.getElementById('typed-subtitle');
  if (subtitleEl) {
    (function typeSubtitle() {
      if (ti <= subtitleText.length) {
        subtitleEl.textContent = subtitleText.slice(0, ti++);
        setTimeout(typeSubtitle, 100);
      }
    })();
  }

  // ================================
  // 2) Theme toggle + persistence
  // ================================
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      const m = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem('theme', m);
    });
  }

  // ================================
  // 3) Modais: abrir/fechar com click e ESC
  // ================================
  function openModal(id) {
    document.getElementById(id)?.classList.remove('hidden');
  }
  function closeModal(id) {
    document.getElementById(id)?.classList.add('hidden');
  }
  // Botões da navbar
  document.querySelector('[id="btn-sobre"]')?.addEventListener('click', e => {
    e.preventDefault();
    openModal('modal-sobre');
    renderCareerChart();
  });
  document.getElementById('btn-ajuda')?.addEventListener('click', e => {
    e.preventDefault();
    openModal('modal-ajuda');
  });
  document.getElementById('btn-news')?.addEventListener('click', async e => {
    e.preventDefault();
    openModal('modal-news');
    await loadNews();
  });
  // Fechar modais com X
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.getAttribute('data-close');
      closeModal(`modal-${id}`);
    });
  });
  // Fechar modais com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });

  // ================================
  // 4) Carregar notícias (RSS→JSON)
  // ================================
  async function loadNews() {
    const list = document.getElementById('news-list');
    if (!list) return;
    list.innerHTML = '<p class="loading">Carregando notícias…</p>';
    try {
      const RSS_URL = encodeURIComponent('https://feeds.twit.tv/brickhouse.xml');
      const API_KEY = 'a4dfb3814aee4c04a9efae4bcf2a82e';
      const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`);
      const data = await res.json();
      if (data.status !== 'ok') throw new Error(data.message);
      list.innerHTML = data.items.map(item => `
        <div class="news-card">
          <h4><a href="${item.link}" target="_blank">${item.title}</a></h4>
        </div>
      `).join('');
    } catch (err) {
      list.innerHTML = `<p class="error">Erro ao carregar notícias.</p>`;
    }
  }

  // ================================
  // 5) “Por Dentro” — carregar posts dinâmicos
  // ================================
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const id = btn.dataset.play?.padStart(2, '0');
      if (!id) return;
      const modal = document.getElementById('modal-por-dentro');
      const container = document.getElementById('modal-play-content');
      modal?.classList.remove('hidden');
      container.innerHTML = '<p class="loading">Carregando conteúdo…</p>';
      try {
        const resp = await fetch(`posts/play-${id}.html`);
        if (!resp.ok) throw new Error('Não encontrado');
        container.innerHTML = await resp.text();
      } catch {
        container.innerHTML = '<p class="error">Erro ao carregar o conteúdo.</p>';
      }
    });
  });

  // ================================
  // 6) Chart.js no modal “Sobre”
  // ================================
  let careerChartInstance = null;
  function renderCareerChart() {
    const ctx = document.getElementById('careerChart');
    if (!ctx || careerChartInstance) return;
    careerChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2011','2014','2016','2018','2020','2024'],
        datasets: [{
          label: 'Anos de experiência',
          data: [1,5,8,7,9,12],
          backgroundColor: 'var(--green)',
        }]
      },
      options: {
        plugins: { legend: { labels: { color: '#fff' }}},
        scales: {
          x: { ticks: { color: '#fff' }, grid: { display: false }},
          y: { ticks: { color: '#fff' }, grid: { color: '#333' }}
        }
      }
    });
  }

  // ================================
  // 7) “Ver o Play” — streaming de testes
  // ================================
  window.executarTeste = async function(play) {
    const barra = document.getElementById('barra');
    const barraFill = document.getElementById('barra-fill');
    const logs = document.getElementById('logs');
    const btn = document.querySelector('button.executar');
    barra.style.display = 'block';
    barraFill.style.width = '0%';
    logs.textContent = '';
    btn.disabled = true;
    try {
      const res = await fetch('/executar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ play })
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let received = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        received += decoder.decode(value, { stream: true });
        received.split('\n').forEach(line => {
          if (!line.trim()) return;
          let color = '#fff';
          if (line.includes('[INFO]')) color = var(--green);
          if (line.includes('[WARN]')) color = '#ff0';
          if (line.includes('[ERROR]')) color = '#f00';
          logs.innerHTML += `<span style="color:${color}">${line}</span>\n`;
          logs.scrollTop = logs.scrollHeight;
          barraFill.style.width = Math.min(100, barraFill.offsetWidth + 5) + '%';
        });
      }
    } catch {
      logs.textContent = 'Erro de comunicação.';
    } finally {
      btn.disabled = false;
      barraFill.style.width = '100%';
    }
  };
});