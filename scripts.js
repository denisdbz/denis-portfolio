// scripts.js

const baseURL = 'https://mellow-commitment-production.up.railway.app';

function executarTeste() {
  const match = window.location.pathname.match(/play-(\d+)/);
  const playNum = match ? match[1] : '1';
  const logs = document.getElementById('output-box') || document.getElementById('logs');
  const barra = document.getElementById('progress-fill') || document.querySelector('.barra-preenchida');
  const container = document.getElementById('progress-container');
  if (!logs || !barra || !container) return console.error('Log elements missing');

  logs.textContent = '';
  barra.style.width = '0%';
  container.classList.remove('hidden');

  const src = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
  src.onmessage = e => {
    logs.textContent += e.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length/5) + '%';
  };
  src.onerror = () => src.close();
}

document.addEventListener('DOMContentLoaded', () => {
  // 1) Toggle tema
  const themeToggle = document.querySelector('.toggle-theme');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
  });

  // 2) Busca de Plays
  const search = document.getElementById('search');
  const plays = document.getElementById('plays');
  if (search && plays) {
    search.addEventListener('input', () => {
      const t = search.value.toLowerCase();
      plays.querySelectorAll('.card').forEach(c => {
        c.style.display = (c.innerText.toLowerCase().includes(t)) ? '' : 'none';
      });
    });
  }

  // 3) Por Dentro → fetch posts/*.html e inject
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      // busca href do "Ver o Play"
      const href = btn.closest('.card').querySelector('a.btn').getAttribute('href');
      // monta URL do post: "plays/slug/index.html" → "posts/slug.html"
      const postUrl = href.replace(/^plays\//,'posts/').replace(/\/index\.html$/,'.html');
      const slug    = postUrl.split('/').pop().replace('.html','');
      const tool    = slug.split('-')[2] || slug; // ex: 'nmap'

      // carrega o HTML do post
      let html = '';
      try {
        const res = await fetch(postUrl);
        if (!res.ok) throw new Error(res.status);
        html = await res.text();
      } catch(err) {
        html = `<p style="color:#f88;">Erro carregando o post: ${err.message}</p>`;
      }

      // injeta tudo no modal
      const M      = document.getElementById('modal-por-dentro');
      const target = document.getElementById('modal-post-content');
      target.innerHTML = `
        <div class="post-modal-container">
          <div class="post-modal-actions">
            <button class="btn neon-btn" id="go-play">▶️ Ir ao Play</button>
            <button class="btn neon-btn" id="go-home">⏪ Voltar à Home</button>
          </div>
          <div class="post-modal-body">${html}</div>
          <div class="post-modal-footer">
            <p class="curiosity">
              🧠 Quer saber mais sobre <strong>${tool.toUpperCase()}</strong>? 
              <a href="https://www.google.com/search?q=${tool}+documentation" target="_blank">
                Explore a documentação oficial →
              </a>
            </p>
          </div>
        </div>`;

      document.getElementById('go-play')
        .addEventListener('click', () => window.location.href = href);
      document.getElementById('go-home')
        .addEventListener('click', () => {
          M.classList.add('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });

      M.classList.remove('hidden');
    });
  });

  // 4) Modais Sobre/Ajuda/News + lazy init Chart.js
  let sobreChart = null;
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    const name = btn.dataset.modal;
    const M    = document.getElementById(`modal-${name}`);
    if (!M) return;
    btn.addEventListener('click', () => {
      M.classList.remove('hidden');
      if (name==='sobre' && window.Chart) {
        const c = document.getElementById('sobre-chart');
        const ctx = c.getContext('2d');
        if (!sobreChart) {
          sobreChart = new Chart(ctx, {
            type:'bar',
            data:{
              labels:['2011','2014','2016','2018','2020','2024'],
              datasets:[{
                label:'Anos de experiência',
                data:[1,3,5,7,9,12],
                backgroundColor:'rgba(0,255,224,0.7)'
              }]
            },
            options:{responsive:true,scales:{y:{beginAtZero:true}}}
          });
        } else sobreChart.resize();
      }
    });
  });

  // fechar modais (×, overlay e ESC)
  document.querySelectorAll('.close-modal').forEach(b=>{
    b.addEventListener('click',()=>b.closest('.modal').classList.add('hidden'));
  });
  document.querySelectorAll('.modal').forEach(M=>{
    M.addEventListener('click',e=>{ if(e.target===M) M.classList.add('hidden') });
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') document.querySelectorAll('.modal:not(.hidden)')
                            .forEach(m=>m.classList.add('hidden'));
  });

  // 5) Notícias via proxy (/api/news)
  const news = document.getElementById('news-list');
  if (news) {
    fetch(`${baseURL}/api/news`)
      .then(r=>r.ok? r.json() : Promise.reject(r.statusText))
      .then(j=>{
        news.innerHTML='';
        (j.news||[]).slice(0,6).forEach(item=>{
          const d=document.createElement('div');
          d.className='news-card';
          d.innerHTML=`
            <h3>${item.title}</h3>
            <p>${item.description||''}</p>
            <a href="${item.url}" target="_blank">Ler mais →</a>`;
          news.appendChild(d);
        });
      })
      .catch(e=>{
        console.error(e);
        news.innerHTML=`<p>Erro ao carregar notícias: ${e}</p>`;
      });
  }
});
