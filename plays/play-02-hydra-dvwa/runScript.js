const botao = document.querySelector("button");
const output = document.getElementById("output-log");
const barra = document.getElementById("progress-bar-fill");

botao.addEventListener("click", async () => {
  botao.disabled = true;
  botao.textContent = "Executando...";
  output.textContent = "Iniciando teste...\n";
  barra.style.width = "5%";

  try {
    const res = await fetch("https://7479-2804-388-c3d3-89b8-ee4b-66fe-8eb4-fadd.ngrok-free.app/run/play-02-hydra-dvwa");
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let texto = "";

    barra.style.width = "25%";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      texto += decoder.decode(value, { stream: true });
      output.textContent = texto;
      output.scrollTop = output.scrollHeight;
    }

    barra.style.width = "100%";
    botao.textContent = "✅ Concluído";
  } catch (err) {
    output.textContent += "\nErro: " + err.message;
    botao.textContent = "Erro";
    barra.style.width = "100%";
  } finally {
    botao.disabled = false;
    setTimeout(() => {
      botao.textContent = "🚀 Executar Teste";
      barra.style.width = "0%";
    }, 3000);
  }
});