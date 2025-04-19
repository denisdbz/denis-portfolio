
function executarTeste() {
  const iframe = document.getElementById('resultado');
  iframe.src = 'relatorio.html?run=' + new Date().getTime();
}
