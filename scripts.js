document.addEventListener('DOMContentLoaded', () => {
  // Abrir modais
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(`modal-${btn.dataset.modal}`);
      if (modal) modal.classList.remove('hidden');
    });
  });

  // Fechar modais pelo botão
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      if (modal) modal.classList.add('hidden');
    });
  });

  // Fechar modal clicando fora do conteúdo
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  // Busca de Plays
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const termo = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(termo) ? '' : 'none';
      });
    });
  }

  // Carregar detalhes “Por Dentro” dinamicamente
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', () => {
      const play = btn.dataset.play;
      fetch(`plays/${play}/details.html`)
        .then(res => {
          if (!res.ok) throw new Error('Falha ao carregar detalhes');
          return res.text();
        })
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
          document.getElementById('modal-por-dentro').classList.remove('hidden');
        })
        .catch(err => {
          console.error(err);
          alert('Erro ao carregar os detalhes do play.');
        });
    });
  });

  // Toggle de tema claro/escuro
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem(
        'theme',
        document.body.classList.contains('light-mode') ? 'light' : 'dark'
      );
    });
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') document.body.classList.add('light-mode');
  }
});

// Função SSE para executar testes e mostrar progresso/log
function startTest(playId) {
  const progressContainer = document.getElementById('progress-container');
  const fill = document.getElementById('progress-fill');
  const output = document.getElementById('output-box');
  if (!progressContainer || !fill || !output) return;

  progressContainer.classList.remove('hidden');
  fill.style.width = '0%';
  output.textContent = '';

  const evt = new EventSource(`/stream/${playId}`);
  evt.onmessage = e => {
    try {
      const data = JSON.parse(e.data);
      if (data.progress !== undefined) {
        fill.style.width = `${data.progress}%`;
      }
      if (data.log !== undefined) {
        output.textContent += data.log;
        output.scrollTop = output.scrollHeight;
      }
    } catch (err) {
      console.error('Erro ao processar SSE:', err);
    }
  };
  evt.addEventListener('end', () => evt.close());
}
