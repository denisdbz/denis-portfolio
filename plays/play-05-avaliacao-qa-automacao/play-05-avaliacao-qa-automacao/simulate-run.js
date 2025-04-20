function simulateRun(reportFile) {
  const iframe = document.getElementById("iframe-relatorio");
  iframe.src = reportFile;
  iframe.style.display = "block";
  document.getElementById("resultado-teste").innerHTML = "Teste executado com sucesso!";
}
