async function executarTeste() {
  const botao = document.querySelector("button");
  const logs = document.getElementById("logs");
  const barra = document.getElementById("progresso");

  logs.innerText = "Iniciando teste...";
  botao.disabled = true;
  barra.style.width = "10%";

  try {
    const res = await fetch("https://denisplayback.loca.lt/run/play-01-nmap-recon");
    const data = await res.json();

    logs.innerText += "\n" + data.log;
    barra.style.width = "100%";
    logs.innerHTML += `\n\n✅ Teste finalizado!`;
  } catch (err) {
    logs.innerText += "\n❌ Erro ao executar o teste.";
    console.error(err);
  } finally {
    botao.disabled = false;
  }
}
