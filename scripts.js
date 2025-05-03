document.addEventListener('DOMContentLoaded', () => {
  // Abrir modais
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = `modal-${btn.dataset.modal}`;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');

        // Renderizar gráfico ao abrir "Sobre"
        if (modalId === 'modal-sobre') {
          const chartCanvas = document.getElementById('sobre-chart');
          if (chartCanvas && !chartCanvas.dataset.rendered) {
            new Chart(chartCanvas, {
              type: 'bar',
              data: {
                labels: ['2011', '2014', '2016', '2018', '2020', '2024'],
                datasets: [{
                  label: 'Experiência',
                  data: [1, 3, 5, 7, 9, 12],
                  backgroundColor: '#00ffc3',
                  borderColor: '#00ffc3',
                  borderWidth: 1
                }]
              },
              options: {
                scales: {
                  y: {
                    ticks: { color: '#fff' },
                    grid: { color: '#444' }
                  },
                  x: {
                    ticks: { color: '#fff' },
                    grid: { color: '#444' }
                  }
                },
                plugins: {
                  legend: {
                    labels: { color: '#fff' }
                  }
                }
              }
            });
            chartCanvas.dataset.rendered = "true";
          }
        }
      }
    });
  });

  // Fechar modais (botão)
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
        if (!modal.classList.contains('hidden')) modal.classList.add('hidden');
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

  // Carregar detalhes “Por Dentro”
  document.querySelectorAll('.btn-por-dentro').forEach(btn => {
    btn.addEventListener('click', () => {
      const play = btn.dataset.play;
      fetch(`plays/${play}/details.html`)
        .then(res => res.ok ? res.text() : Promise.reject('Falha ao carregar'))
        .then(html => {
          document.getElementById('modal-play-content').innerHTML = html;
          document.getElementById('modal-por-dentro').classList.remove('hidden');
        })
        .catch(err => {
          console.error(err);
          alert('Erro ao carregar detalhes.');
        });
    });
  });

  // Toggle de tema
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.body.classList.add('light-mode');
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const typeTarget = document.getElementById('typewriter');
  if (typeTarget) {
    typeTarget.textContent = 'QA • Pentest • DevSecOps';
  }
});
