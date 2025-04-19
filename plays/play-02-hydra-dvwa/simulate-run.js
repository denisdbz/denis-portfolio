function executarTeste() {
  const resultado = document.getElementById("resultado");
  resultado.innerText = "Executando o ataque com Hydra...";

  fetch("./run.sh")
    .then(() => {
      fetch("relatorio.html")
        .then((res) => res.text())
        .then((html) => {
          resultado.innerHTML = "Teste concluído. <a href='relatorio.html' target='_blank'>Clique aqui para ver o relatório</a>";
        });
    })
    .catch((err) => {
      resultado.innerText = "Erro ao executar o teste: " + err;
    });
}
