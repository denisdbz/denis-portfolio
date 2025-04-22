function executarTeste(playId) {
  const resultadoDiv = document.getElementById("resultado");
  if (resultadoDiv) {
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = `<p style="color: yellow;">⏳ Executando o teste... Aguarde...</p>`;
  }

  fetch(`https://web-production-4124.up.railway.app/api/exec/${playId}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.stdout || data.stderr) {
        const output = `
          <div class="output-box">
            <strong style="color: #0f0;">Saída:</strong><br>
            <pre>${data.stdout || "Nenhuma saída"}</pre>
            <strong style="color: #f00;">Erros:</strong><br>
            <pre>${data.stderr || "Nenhum erro"}</pre>
            <strong style="color: #ccc;">Código de Retorno:</strong> ${data.code}
          </div>
        `;
        resultadoDiv.innerHTML = output;
      } else if (data.erro) {
        resultadoDiv.innerHTML = `<p style="color: red;">Erro: ${data.erro}</p>`;
      } else {
        resultadoDiv.innerHTML = `<p style="color: red;">Erro inesperado na resposta da API.</p>`;
      }
    })
    .catch((err) => {
      resultadoDiv.innerHTML = `<p style="color: red;">Erro ao executar requisição: ${err.message}</p>`;
    });
}
