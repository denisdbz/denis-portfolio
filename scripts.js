document.addEventListener('DOMContentLoaded', () => {
  // === Abrir modais ===
  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.getElementById(`modal-${btn.dataset.modal}`);
      if (modal) modal.classList.remove('hidden');

      // Se for o modal "sobre", renderiza o gráfico (uma única vez)
      if (btn.dataset.modal === "sobre") {
        const canvas = document.getElementById("sobre-chart");
        if (canvas && !canvas.classList.contains("renderizado")) {
          new Chart(canvas, {
            type: "bar",
            data: {
              labels: ["2011", "2014", "2016", "2018", "2020", "2024"],
              datasets: [{
                label: "Experiência",
                data: [1, 3, 5, 7, 9, 12],
                backgroundColor: "#00ffc3",
                borderColor: "#00ffc3",
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  ticks: { color: "#ffffff" },
                  grid: { color: "#333" }
                },
                x: {
                  ticks: { color: "#ffffff" },
                  grid: { color: "#333" }
                }
              },
              plugins: {
                legend: {
                  labels: { color: "#ffffff" }
                }
              }
            }
          });
          canvas.classList.add("renderizado");
        }
      }
    });
  });

  // === Fechar modais ===
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.close;
      const modal = document.getElementById(`modal-${modalId}`);
      if (modal) modal.classList.add('hidden');
    });
  });

  // === Alternância de tema claro/escuro ===
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
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
    }
  }

  // === Busca dinâmica de plays ===
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const termo = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        const conteudo = card.textContent.toLowerCase();
        card.style.display = conteudo.includes(termo) ? '' : 'none';
      });
    });
  }

  // === Conteúdo Por Dentro via fetch ===
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
});

// === Execução de testes com logs e progresso ===
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
