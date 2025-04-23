async function executarTeste(play) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = "Executando teste...";

  const progresso = document.getElementById("progresso");
  const barra = document.getElementById("barra");
  progresso.style.display = "block";
  barra.style.width = "0%";
  barra.style.animation = "carregando 5s linear forwards";

  try {
    const resposta = await fetch(`https://web-production-c891.up.railway.app/${play}`, {
      method: "POST",
    });

    const dados = await resposta.json();
    resultado.textContent = `Código de saída: ${dados.code}\n\nSaída:\n${dados.stdout}\n\nErros:\n${dados.stderr}`;
  } catch (erro) {
    resultado.textContent = "Erro ao executar o teste:\n" + erro;
  }
}
