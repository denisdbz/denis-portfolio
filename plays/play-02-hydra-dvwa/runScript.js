async function executarTeste() {
  const output = document.getElementById("output");
  const barra = document.getElementById("progresso");
  const input = document.getElementById("input-dvwa");

  const ip = input.value.trim();
  if (!ip) {
    output.textContent = "⚠️ Por favor, digite o IP ou domínio da DVWA.";
    return;
  }

  output.textContent = "Iniciando execução...\n";
  barra.style.width = "5%";

  try {
    const resposta = await fetch("https://denisplayback.loca.lt/run/play-02-hydra-dvwa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ alvo: ip }),
    });

    barra.style.width = "50%";

    if (!resposta.ok) throw new Error(`Erro HTTP: ${resposta.status}`);

    const dados = await resposta.json();
    barra.style.width = "100%";
    output.textContent += "\n✅ Resultado:\n\n" + dados.saida;

  } catch (erro) {
    output.textContent += "\n❌ Erro ao executar o teste: " + erro.message;
    barra.style.width = "0";
  }
}
