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
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light-mode');
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });

  // 3) Modals genéricos (Sobre, Ajuda, News, Plays and Por Dentro)
  function openModal(id) {
    document.getElementById('modal-' + id)?.classList.remove('hidden');
    document.body.classList.add('modal-open');
    if (id === 'sobre') renderSobreChart();
    if (id === 'news') loadNews();
  }
  ['sobre','ajuda','news','plays'].forEach(id => {
    document.getElementById('btn-' + id)
      ?.addEventListener('click', e => {
        e.preventDefault();
        openModal(id);
      });
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
      document.body.classList.remove('modal-open');
    });
  });

  // 4) Search/filter plays
  const search = document.getElementById('search-input');
  search?.addEventListener('input', () => {
    const term = search.value.toLowerCase();
    document.querySelectorAll('#plays .card').forEach(card => {
      card.style.display =
        card.querySelector('h3').textContent.toLowerCase().includes(term)
        ? ''
        : 'none';
    });
  });

  // 5) Load news (modal News)
  async function loadNews() {
    const list = document.getElementById('news-list');
    if (!list) return;
    try {
      const res = await fetch('https://api.allorigins.win/raw?url=https://hn.algolia.com/api/v1/search?tags=front_page');
      const data = await res.json();
      list.innerHTML = data.hits.slice(0,5).map(hit =>
        `<a href="${hit.url}" target="_blank">${hit.title}</a>`
      ).join('<br>');
    } catch {
      list.textContent = 'Falha ao carregar notícias.';
    }
  }

  // 6) “Por Dentro” de cada play
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const id = btn.dataset.play.padStart(2,'0');
      const modal = document.getElementById('modal-por-dentro');
      document.getElementById('modal-play-content').innerHTML = 'Carregando…';
      openModal('por-dentro');
      fetch(`plays/play-${id}-${btn.closest('.card').title.split('—')[1].trim().toLowerCase().replace(/\s+/g,'-')}/post.html`)
        .then(r => r.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
        })
        .catch(() => {
          document.getElementById('modal-play-content').innerHTML = 'Conteúdo não disponível.';
        });
    });
  });

  // 7) Gráfico do modal Sobre
  let sobreChart;
  function renderSobreChart() {
    if (sobreChart) return;
    const ctx = document.getElementById('sobre-chart');
    if (!ctx) return;
    sobreChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2011','2014','2016','2018','2020','2024'],
        datasets: [{
          label: 'Anos de experiência',
          data: [1,3,5,7,9,12],
          backgroundColor: 'rgba(0,255,159,0.6)'
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true } }
      }
    });
  }
});
