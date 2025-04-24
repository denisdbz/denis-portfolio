function executarTeste() {
  fetch('run.sh')
    .then(() => setTimeout(() => {
      document.getElementById('relatorioFrame').src = 'relatorio.html?' + new Date().getTime();
    }, 2000));
}
