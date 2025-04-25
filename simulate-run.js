// simulate-run.js
function executarTeste() {
  const resultadoDiv = document.getElementById('resultado');
  const progresso = document.getElementById('barraProgresso');
  const logOutput = document.getElementById('log-output');
  const voltarBtn = document.getElementById('voltar-btn');

  resultadoDiv.style.display = 'block';
  progresso.style.width = '0%';
  progresso.style.backgroundColor = '#00ffcc';
  logOutput.innerHTML = '';
  voltarBtn.style.display = 'none';

  const logs = [
    '[INFO] Iniciando o teste...',
    '[INFO] Carregando configurações...',
    '[INFO] Executando comandos...',
    '[INFO] Coletando resultados...',
    '[INFO] Finalizando...',
    '[SUCESSO] Teste concluído com sucesso!'
  ];

  let i = 0;

  const intervalo = setInterval(() => {
    if (i < logs.length) {
      logOutput.innerHTML += `<div>${logs[i]}</div>`;
      progresso.style.width = `${((i + 1) / logs.length) * 100}%`;
      i++;
    } else {
      clearInterval(intervalo);
      voltarBtn.style.display = 'inline-block';
    }
  }, 1000);
}
