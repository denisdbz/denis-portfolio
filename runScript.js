async function executarTeste(play) {
  const resultado = document.getElementById("resultado");
  resultado.textContent = "Executando teste...";

  try {
    const resposta = await fetch(`https://web-production-4124.up.railway.app/${play}`, {
      method: "POST",
    });

    const dados = await resposta.json();
    resultado.textContent = `Código de saída: ${dados.code}\n\nSaída:\n${dados.stdout}\n\nErros:\n${dados.stderr}`;
  } catch (erro) {
    resultado.textContent = "Erro ao executar o teste:\n" + erro;
  }
}
