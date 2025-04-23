function executarTeste() {
  const progresso = document.getElementById("progresso");
  const resultado = document.getElementById("resultado");

  progresso.style.display = "block";
  resultado.style.display = "none";
  progresso.textContent = "Executando...";

  fetch("https://web-production-4124.up.railway.app/play01", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      progresso.style.display = "none";
      resultado.style.display = "block";
      resultado.innerHTML = `
        <strong>Status:</strong> ${data.code}<br>
        <strong>Saída:</strong><pre>${data.stdout || "Sem saída."}</pre>
        <strong>Erros:</strong><pre>${data.stderr || "Sem erros."}</pre>
      `;
    })
    .catch(err => {
      progresso.style.display = "none";
      resultado.style.display = "block";
      resultado.innerHTML = `<strong>Erro:</strong><pre>${err}</pre>`;
    });
}
