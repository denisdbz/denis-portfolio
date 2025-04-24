
function executarTeste(playId) {
  const relatorio = document.getElementById("relatorio-" + playId);
  relatorio.innerHTML = "<img src='loading.gif' alt='Executando...' style='height:50px'><br>Executando teste...";
  relatorio.style.display = "block";

  setTimeout(() => {
    fetch('relatorios/' + playId + '.html')
      .then(response => response.text())
      .then(data => {
        relatorio.innerHTML = data;
      });
  }, 2000);
}

function executarTodos() {
  executarTeste('play-01');
  setTimeout(() => executarTeste('play-02'), 2500);
  setTimeout(() => executarTeste('play-03'), 5000);
}
