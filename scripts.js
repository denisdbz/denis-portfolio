document.addEventListener('DOMContentLoaded', () => {
  // Abrir modais
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(`modal-${btn.dataset.modal}`);
      if (modal) {
        modal.classList.remove('hidden');
        if (btn.dataset.modal === 'sobre') {
          inicializarGraficoSobre(); // inicializa o gráfico ao abrir o modal "Sobre"
        }
      }
    });
  });

  // Fechar modais
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

  // Fechar modais com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
      });
    }
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

  // Botões "Por dentro"
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', () => {
      const play = btn.dataset.play;
      fetch(`plays/${play}/details.html`)
        .then(res => res.text())
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
          document.getElementById('modal-por-dentro').classList.remove('hidden');
        })
        .catch(() => alert('Erro ao carregar os detalhes do play.'));
    });
  });
});


// SSE para executar testes reais
function executarTeste() {
  const evt = new EventSource('https://527e-2804-388-c3d2-3100-3c8f-801a-637b-3e18.ngrok-free.app/stream/play-01-nmap-recon');

  const progressContainer = document.getElementById('progress-container');
  const progressFill = document.getElementById('progress-fill');
  const outputBox = document.getElementById('output-box');

  progressContainer.classList.remove('hidden');
  progressFill.style.width = '0%';
  outputBox.textContent = 'Iniciando teste...\n';

  evt.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.progress !== undefined) {
        progressFill.style.width = `${data.progress}%`;
      }
      if (data.log) {
        outputBox.textContent += data.log;
        outputBox.scrollTop = outputBox.scrollHeight;
      }
    } catch (err) {
      console.error('[Erro SSE]', err);
    }
  };

  evt.addEventListener('end', () => {
    evt.close();
    outputBox.textContent += '\n✔️ Teste finalizado com sucesso.';
  });
}


// Função para inicializar gráfico no modal "Sobre"
function inicializarGraficoSobre() {
  const ctx = document.getElementById('sobre-chart');
  if (ctx && typeof Chart !== 'undefined') {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Suporte', 'QA Manual', 'Automação', 'Pentest', 'DevSecOps', 'Cloud Security'],
        datasets: [{
          label: 'Experiência por Área (em anos)',
          data: [3, 2, 2, 2, 2, 1],
          backgroundColor: '#00ffc3',
          borderColor: '#00ffc3',
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          legend: { labels: { color: '#fff' } }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#fff' },
            grid: { color: '#444' }
          },
          x: {
            ticks: { color: '#fff' },
            grid: { color: '#444' }
          }
        }
      }
    });
  }
}