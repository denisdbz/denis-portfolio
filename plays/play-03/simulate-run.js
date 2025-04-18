
function simulateExecution() {
  const output = document.getElementById("output");
  output.textContent = "Executando teste...\n";
  setTimeout(() => {
    output.textContent += "Teste finalizado com sucesso.\nVeja o relatório acima.";
  }, 2000);
}
