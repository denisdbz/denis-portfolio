// scripts.js

// 1) Função de fábrica de modais
function makeModal(id, title, content) {
  // se já existir, não recria
  if (document.getElementById('modal-' + id)) return;

  const m = document.createElement('div');
  m.id = 'modal-' + id;
  m.className = 'modal hidden';
  m.innerHTML = `
    <div class="modal-content">
      <button class="close-modal" data-close="${id}">&times;</button>
      <h2>${title}</h2>
      ${content}
    </div>`;
  document.body.appendChild(m);
}

// 2) Tudo dentro de DOMContentLoaded para garantir que os elementos existam
document.addEventListener('DOMContentLoaded', () => {
  // inicializa animações on-scroll
  AOS.init();

  // 3) Cria os modais
makeModal('sobre', 'Sobre Mim', `
  <p><strong>Engenheiro de Qualidade e Segurança da Informação</strong> com mais de 12 anos de experiência. Ao longo da minha carreira, atuei em suporte técnico, QA manual e automação de testes, além de me aprofundar em pentest e DevSecOps.</p>

  <hr/>

  <h3>Trajetória Profissional</h3>
  <ul>
    <li><strong>2011</strong>: Início na área de TI — suporte técnico e infraestrutura.</li>
    <li><strong>2014</strong>: Transição para Qualidade de Software (QA Manual).</li>
    <li><strong>2016</strong>: Automação de Testes (Selenium, Cypress, Appium).</li>
    <li><strong>2018</strong>: Foco em Segurança: Pentest Web e Mobile.</li>
    <li><strong>2020</strong>: DevSecOps — integração de segurança no CI/CD.</li>
    <li><strong>2024</strong>: Especialização contínua em Offensive Security e Cloud Security.</li>
  </ul>

  <h3>Habilidades Técnicas</h3>
  <ul>
    <li><strong>Testes & QA</strong>: Cypress, Selenium, Appium, Postman/Newman.</li>
    <li><strong>Pentest & Segurança</strong>: OWASP Top 10, Burp Suite, Nikto, Hydra, SQLMap.</li>
    <li><strong>DevSecOps</strong>: Docker, Jenkins, GitHub Actions, Railway, Vercel, Netlify.</li>
  </ul>

  <h3>Certificações & Estudos</h3>
  <ul>
    <li>CTFL – Certified Tester Foundation Level (em andamento).</li>
    <li>Preparação para CompTIA Security+.</li>
    <li>Práticas OWASP Web Security Testing Guide.</li>
  </ul>

  <hr/>

  <h3>Contato</h3>
  <p>Quer conversar sobre projetos, QA, segurança ou tecnologia?</p>
  <p><a href="mailto:denis.qae.hack@gmail.com" class="btn">denis.qae.hack@gmail.com</a></p>
);
  makeModal('ajuda', 'Central de Ajuda', `
    <p>Este portfólio apresenta plays reais de QA, Pentest e DevSecOps.</p>
    <ul>
      <li><strong>Ver o Play:</strong> Executa o teste real.</li>
      <li><strong>Por Dentro:</strong> Mostra documentação explicativa.</li>
    </ul>
  `);
  makeModal('news', 'Últimas Notícias', `
    <div id="news-list" class="news-grid">
      <p class="loading">Carregando notícias...</p>
    </div>
  `);

  // 4) Ganchos da navbar
  document.getElementById('btn-sobre').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-sobre').classList.remove('hidden');
  });
  document.getElementById('btn-ajuda').addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('modal-ajuda').classList.remove('hidden');
  });
  document.getElementById('btn-news').addEventListener('click', async e => {
    e.preventDefault();
    document.getElementById('modal-news').classList.remove('hidden');
    // se quiser já puxar notícias na abertura:
    await loadNews();
  });

  // 5) Fechar qualquer modal
  document.body.addEventListener('click', e => {
    if (e.target.classList.contains('close-modal')) {
      const id = e.target.getAttribute('data-close');
      document.getElementById('modal-' + id).classList.add('hidden');
    }
  });

  // 6) Busca de plays
  document.getElementById('search-input').addEventListener('input', () => {
    const term = document.getElementById('search-input').value.toLowerCase();
    document.querySelectorAll('#plays .card').forEach(card => {
      card.style.display =
        card.querySelector('h3').textContent.toLowerCase().includes(term)
          ? ''
          : 'none';
    });
  });

  // 7) Botões “Por Dentro”
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const playId = btn.dataset.play.padStart(2, '0');
      const modal = document.getElementById('modal-por-dentro');
      const container = document.getElementById('modal-play-content');

      container.innerHTML = '<p>Carregando conteúdo...</p>';
      modal.classList.remove('hidden');

      try {
        const html = await fetch(`posts/play-${playId}.html`).then(r => r.text());
        container.innerHTML = html;
      } catch {
        container.innerHTML = '<p>Conteúdo “Por Dentro” indisponível.</p>';
      }
    });
  });

  // 8) Toggle de tema
  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });

  // 9) Easter egg Konami (se já importou o script)
  if (typeof Konami === 'function') {
    new Konami(() => {
      alert('Easter egg ativado! 🎉');
    });
  }
});

// 10) Função para puxar notícias via RSS2JSON
async function loadNews() {
  const list = document.getElementById('news-list');
  list.innerHTML = '<p class="loading">Carregando notícias…</p>';

  try {
    const RSS_URL = encodeURIComponent('http://feeds.twit.tv/brickhouse.xml');
    const API_KEY = 'a4dfb3814aee4c04a9efaef4bcf2a82e';
    const res = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${RSS_URL}&api_key=${API_KEY}&count=6`
    );
    const data = await res.json();
    if (data.status !== 'ok') throw new Error(data.message);

    list.innerHTML = data.items
      .map(item => `
        <div class="news-card">
          <img src="${item.thumbnail ||
            item.enclosure.link ||
            'https://via.placeholder.com/300x100'}"
            alt="${item.title}" />
          <div class="news-card-content">
            <h4>${item.title}</h4>
            <small>${item.pubDate.split(' ')[0]}</small>
            <a href="${item.link}" target="_blank">Leia mais →</a>
          </div>
        </div>
      `)
      .join('');
  } catch (err) {
    console.error('News load error:', err);
    list.innerHTML = '<p class="loading error">Erro ao carregar notícias.</p>';
  }
}
