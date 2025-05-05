async function executarTeste() {
  const ip = document.getElementById("ipInput").value;
  const botao = document.querySelector("button");
  const logs = document.getElementById("output");
  const barra = document.getElementById("progresso");

  logs.textContent = "Aguardando execução...";
  logs.style.color = "#00ffff";
  barra.style.width = "0%";

  botao.disabled = true;
  botao.textContent = "Executando...";

  try {
    barra.style.width = "20%";

    const res = await fetch("https://denisplayback.loca.lt/run/play-02-hydra-dvwa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ip })
    });

    barra.style.width = "60%";

    const resultado = await res.json();

    logs.innerText = resultado.log || "Nenhuma saída capturada.";
    barra.style.width = "100%";

    if (resultado.status === "ok") {
      logs.innerText += "\n\n✅ Teste finalizado com sucesso.";
    } else {
      logs.innerText += "\n\n❌ Teste finalizado com erros.";
    }
  } catch (err) {
    logs.innerText = "Erro ao executar o teste: " + err.message;
    barra.style.width = "100%";
  } finally {
    botao.disabled = false;
    botao.textContent = "🚀 Executar Teste";
  }
}
