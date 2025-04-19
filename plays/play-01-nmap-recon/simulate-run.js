function executarTeste() {
  fetch('run.sh')
    .then(() => {
      document.getElementById("relatorio").src = "relatorio.html?" + new Date().getTime();
    })
    .catch(err => alert("Erro ao executar o teste: " + err));
}
