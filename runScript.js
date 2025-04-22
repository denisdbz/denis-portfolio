function executarTeste(playId) {
  const resultado = document.getElementById("resultado");
  resultado.style.display = "block";
  resultado.innerHTML = "<em>Executando teste...</em>";

  fetch(`/api/exec/${playId}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
      if (data.stdout) {
        resultado.innerHTML = `<pre>${data.stdout}</pre>`;
      } else if (data.erro) {
        resultado.innerHTML = `<p style="color:red;">Erro: ${data.erro}</p>`;
      } else {
        resultado.innerHTML = `<p style="color:red;">Erro desconhecido ao executar.</p>`;
      }
    })
    .catch(error => {
      resultado.innerHTML = `<p style="color:red;">Falha na requisição: ${error}</p>`;
    });
}
