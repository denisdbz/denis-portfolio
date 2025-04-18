function simulateRun(playId) {
  const resultDiv = document.querySelector(`#${playId} .result`);
  resultDiv.innerHTML = "<p class='loading'>Executando teste...</p>";

  setTimeout(() => {
    resultDiv.innerHTML = `<p class='success'>Teste executado com sucesso! ✅</p>
    <p>Relatório disponível em <a href="plays/${playId}/index.html" target="_blank">Relatório HTML</a></p>`;
  }, 2000);
}
