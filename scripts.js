document.addEventListener("DOMContentLoaded", () => {
  // ========= EXECUTAR TESTE =========
  window.executarTeste = function () {
    const outputBox = document.getElementById('output-log');
    const progressBar = document.getElementById('progress-bar-fill');
    const container = document.getElementById('progress-container');

    if (!outputBox || !progressBar || !container) return;

    container.classList.remove('hidden');
    outputBox.textContent = 'Iniciando execução...\n';
    progressBar.style.width = '5%';

    const path = window.location.pathname.split('/');
    const playName = path[path.length - 2];
    const baseURL = 'https://0763-2804-388-c3d3-89b8-ee4b-66fe-8eb4-fadd.ngrok-free.app';

    const evt = new EventSource(`${baseURL}/stream/${playName}`);

    let progresso = 10;
    const progressoInterval = setInterval(() => {
      if (progresso < 95) {
        progresso += 5;
        progressBar.style.width = progresso + '%';
      }
    }, 400);

    evt.onmessage = function (event) {
      outputBox.textContent += event.data + '\n';
      outputBox.scrollTop = outputBox.scrollHeight;
      if (event.data.toLowerCase().includes('teste finalizado')) {
        clearInterval(progressoInterval);
        progressBar.style.width = '100%';
        evt.close();
      }
    };

    evt.onerror = function () {
      clearInterval(progressoInterval);
      evt.close();
      progressBar.style.width = '100%';
      outputBox.textContent += '\n❌ Erro ao conectar ao servidor.';
    };
  };

  // ========= MODAIS =========
  document.querySelectorAll('[data-modal]').forEach(botao => {
    botao.addEventListener('click', () => {
      const modalId = 'modal-' + botao.dataset.modal;
      document.getElementById(modalId)?.classList.remove('hidden');
    });
  });

  document.querySelectorAll('.close-modal').forEach(botao => {
    botao.addEventListener('click', () => {
      botao.closest('.modal')?.classList.add('hidden');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    }
  });

  // ========= BUSCA DE PLAYS =========
  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const termo = searchInput.value.toLowerCase();
      document.querySelectorAll('#plays .card').forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(termo) ? '' : 'none';
      });
    });
  }

  // ========= CHART.JS (gráfico sobre mim) =========
  if (document.getElementById('graficoExperiencia')) {
    const ctx = document.getElementById('graficoExperiencia').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2011', '2014', '2016', '2018', '2020', '2024'],
        datasets: [{
          label: 'Anos de experiência',
          data: [1, 3, 5, 7, 9, 12],
          backgroundColor: '#00ffc3'
        }]
      },
      options: {
        scales: {
          x: { ticks: { color: '#fff' }, grid: { color: '#333' } },
          y: { ticks: { color: '#fff' }, grid: { color: '#333' } }
        },
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  }

  // ========= TEMA CLARO/ESCURO =========
  const themeToggle = document.querySelector('.toggle-theme');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light-mode');
    }
  }
});