function executarTeste() {
  const frame = document.getElementById("relatorioFrame");
  frame.src = "relatorio.html?t=" + new Date().getTime(); // força recarregamento
}
