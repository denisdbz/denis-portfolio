// scripts.js

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  // 1) Alternar tema claro/escuro
  document.querySelector('.toggle-theme').addEventListener('click', () => {
    body.classList.toggle('light-mode');
  });

  // 2) Funções de abertura/fechamento de modais
  function openModal(id) {
    document.getElementById(`modal-${id}`).classList.remove('hidden');
  }
  function closeModal(id) {
    document.getElementById(`modal-${id}`).classList.add('hidden');
  }

  // 3) Associa botões de modal
  document.querySelectorAll('button[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => closeModal(btn.dataset.close));
  });
  // Fechar modal ao clicar fora do conteúdo
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  });

  // 4) Inicializa o gráfico no modal “Sobre”
  const ctx = document.getElementById('sobre-chart');
  if (ctx) {
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['2011', '2014', '2016', '2018', '2020', '2024'],
        datasets: [{
          label: 'Evolução Profissional',
          data: [1, 2, 3, 4, 5, 6],
          backgroundColor: 'rgba(0, 255, 224, 0.6)',
          borderColor: 'rgba(0, 255, 224, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // 5) Busca de plays (busca em cards) — mantém seu código atual
  //    ...

  // 6) Função para Executar Testes via SSE (EventSource)
  const baseURL = 'https://mellow-commitment-production.up.railway.app';

  window.executarTeste = function () {
    // extrai o número do play da URL: play-04 → "04"
    const match = location.pathname.match(/play-(\d+)/);
    const playNum = match ? match[1] : '01';

    const container = document.getElementById('progress-container');
    const logs      = document.getElementById('output-box');
    const fill      = document.getElementById('progress-fill');

    if (!container || !logs || !fill) {
      console.error('Elementos de progresso/log não encontrados');
      return;
    }

    // limpa e exibe
    logs.textContent = '';
    fill.style.width = '0%';
    container.classList.remove('hidden');

    const source = new EventSource(`${baseURL}/api/play/${playNum}/stream`);
    source.onmessage = e => {
      logs.textContent += e.data + '\n';
      logs.scrollTop = logs.scrollHeight;
      fill.style.width = Math.min(100, logs.textContent.length/5) + '%';
    };
    source.onerror = () => source.close();
  };

});
