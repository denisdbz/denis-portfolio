const logOutput = document.getElementById("log-output");
const progressBar = document.getElementById("progress-bar");

function executarTeste() {
  logOutput.textContent = "Iniciando simulação...\n";
  progressBar.style.width = "10%";

  setTimeout(() => {
    logOutput.textContent += "Executando JMeter...\n";
    progressBar.style.width = "50%";
  }, 1000);

  setTimeout(() => {
    logOutput.textContent += "Teste de carga concluído com sucesso.\n";
    progressBar.style.width = "100%";
  }, 3000);
}