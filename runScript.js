async function executarTeste(play) {
  const resultado = document.getElementById("resultado");
  const progresso = document.getElementById("progresso");

  resultado.textContent = "Executando teste...";
  progresso.style.display = "block";

  try {
    const resposta = await fetch(`https://web-production-c891.up.railway.app/${play}`, {
      method: "POST",
    });

    const dados = await resposta.json();
    resultado.textContent =
      `Código de saída: ${dados.code}\n\n` +
      `Saída:\n${dados.stdout}\n\n` +
      `Erros:\n${dados.stderr}`;
  } catch (erro) {
    resultado.textContent = "Erro ao executar o teste:\n" + erro;
  } finally {
    progresso.style.display = "none";
  }
}
