function updateProgressBar(percent) {
  const progress = document.getElementById('progress');
  progress.style.width = percent + '%';
}

function showReport(testId, content) {
  const report = document.getElementById(testId);
  report.innerHTML = content;
  report.style.display = 'block';
}

function executeTest(testName, testId) {
  document.getElementById('loadingBar').style.display = 'block';
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    updateProgressBar(progress);
    if (progress >= 100) {
      clearInterval(interval);
      showReport(testId, `<h3>Resultado do ${testName}</h3><p>Teste concluído com sucesso!</p>`);
      document.getElementById('loadingBar').style.display = 'none';
    }
  }, 500);
}

document.getElementById('runTest01').addEventListener('click', () => {
  executeTest('Teste 1 (Nmap Recon)', 'reportTest01');
});

document.getElementById('runTest02').addEventListener('click', () => {
  executeTest('Teste 2 (Hydra vs DVWA)', 'reportTest02');
});

document.getElementById('runTest03').addEventListener('click', () => {
  executeTest('Teste 3 (SQLMap vs DVWA)', 'reportTest03');
});

document.getElementById('runAllTests').addEventListener('click', () => {
  executeTest('Todos os Testes', 'reportTest01');
  executeTest('Todos os Testes', 'reportTest02');
  executeTest('Todos os Testes', 'reportTest03');
});
