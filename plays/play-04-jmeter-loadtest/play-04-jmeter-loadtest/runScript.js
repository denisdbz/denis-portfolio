async function executarTeste() {
  const logOutput = document.getElementById("log-output");
  const progressBar = document.getElementById("progress-bar");
  logOutput.textContent = "Iniciando teste...\n";
  progressBar.style.width = "10%";

  try {
    const response = await fetch("https://denis-play-backend.fly.dev/run/play-04-jmeter-loadtest");
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let received = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += decoder.decode(value, { stream: true });
      logOutput.textContent = received;
      progressBar.style.width = "80%";
    }

    progressBar.style.width = "100%";
    logOutput.textContent += "\n✔️ Teste finalizado com sucesso.";
  } catch (error) {
    logOutput.textContent += "\n❌ Erro ao executar o teste: " + error;
    progressBar.style.width = "100%";
  }
}