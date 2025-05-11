// scripts.js

const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';
  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const barra = document.getElementById('progress-fill') || document.querySelector('.barra-preenchida');
  const container = document.getElementById('progress-container');
  if (!logs || !barra || !container) return console.error('Elementos de log não encontrados');
  logs.textContent = ''; barra.style.width = '0%'; container.classList.remove('hidden');
  const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  source.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = () => source.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // Toggle tema claro/escuro
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) themeToggle.addEventListener('click', () =>
    document.body.classList.toggle('light-mode')
  );

  // Busca de plays
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

  // “Por Dentro”: carrega posts estáticos via iframe
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const link = btn.closest('.card').querySelector('a.btn').getAttribute('href');
      const slug = link.split('/')[1];
      const postUrl = `posts/${slug}.html`;
      const modal  = document.getElementById('modal-por-dentro');
      const target = document.getElementById('modal-post-content');
      target.innerHTML = `
        <iframe 
          src="${postUrl}" 
          style="width:100%;height:100%;border:none;">
        </iframe>`;
      modal.classList.remove('hidden');
    });
  });

  // Configuração de todos os modais (abrir/fechar + ESC)
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name  = btn.dataset.modal;
    const modal = document.getElementById(`modal-${name}`);
    if (!modal) return;
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      // lazy init do gráfico
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
                backgroundColor: 'rgba(0,255,224,0.7)',
                borderColor: 'rgba(0,255,224,1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: { y: { beginAtZero: true } }
            }
          });
        } else sobreChart.resize();
      }
    });
  });
  // fechar no ×
  document.querySelectorAll('.close-modal').forEach(btn =>
    btn.addEventListener('click', () =>
      btn.closest('.modal').classList.add('hidden')
    )
  );
  // clicar fora
  document.querySelectorAll('.modal').forEach(modal =>
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    })
  );
  // ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal:not(.hidden)')
              .forEach(m => m.classList.add('hidden'));
    }
  });

  // Notícias “ao vivo”
  const NEWS_API_KEY = 'KTeKQv1H4PHbtVhF_fwXVLvA178RVJ6z13A_KqgZuYuxLGp3';
  const newsList = document.getElementById('news-list');
  if (newsList) fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${NEWS_API_KEY}`)
    .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
    .then(j => {
      newsList.innerHTML = '';
      (j.news||[]).slice(0,6).forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
          <h3>${item.title}</h3>
          <p>${item.description||''}</p>
          <a href="${item.url}" target="_blank">Ler mais →</a>`;
        newsList.appendChild(card);
      });
    })
    .catch(e => newsList.innerHTML = `<p>Erro: ${e.message}</p>`);
});
