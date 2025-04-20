function executarTeste(playId) {
  // Envia uma requisição POST para a API Flask para executar o play
  fetch(`/api/exec/${playId}`, {
    method: 'POST',
  })
    .then(response => response.json())  // Aguarda a resposta em JSON
    .then(data => {
      // Se a execução foi bem-sucedida
      if (data.mensagem) {
        document.getElementById('resultado').innerHTML = `<p>${data.mensagem}</p>`;
      } else {
        document.getElementById('resultado').innerHTML = `<p>Erro: ${data.erro}</p>`;
      }
    })
    .catch(error => {
      // Se houver erro ao fazer a requisição
      document.getElementById('resultado').innerHTML = `<p>Erro na execução: ${error}</p>`;
    });
}
