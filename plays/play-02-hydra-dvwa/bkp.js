function executarTeste() {
  const ip = document.getElementById("ipInput").value.trim();
  const output = document.getElementById("output");

  if (!ip) {
    output.innerText = "⚠️ Por favor, digite um IP ou domínio da DVWA.";
    return;
  }

  output.innerText = "Executando...\n";

  fetch("https://denisplayback.loca.lt/run/play-02", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ip: ip })
  })
  .then(response => response.text())
  .then(data => {
    output.innerText = data;
  })
  .catch(error => {
    output.innerText = "Erro ao executar o teste:\n" + error;
  });
}
