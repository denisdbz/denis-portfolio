// simulate-run.js
function executarTeste() {
  const resultado = document.getElementById('resultado');
  const barra = document.getElementById('barra');
  const logs = document.getElementById('logs');
  const voltar = document.getElementById('voltar-btn');

  // Reset
  resultado.style.display = 'none';
  barra.style.width = '0%';
  barra.classList.remove('hidden');
  logs.innerHTML = '';
  voltar.style.display = 'none';

  // Simulação passo a passo
  const steps = [
    '[INFO] Iniciando o teste...',
    '[INFO] Carregando configurações...',
    '[INFO] Executando comandos...',
    '[INFO] Coletando resultados...',
    '[INFO] Finalizando...',
    '[SUCESSO] Teste concluído com sucesso!'
  ];
  let i = 0;
  const interval = setInterval(() => {
    logs.innerHTML += `<div>${steps[i]}</div>`;
    barra.style.width = `${((i + 1) / steps.length) * 100}%`;
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      resultado.style.display = 'block';
      voltar.style.display = 'inline-block';
    }
  }, 800);
}
