function executarTeste(playId) {
  fetch(`/api/exec/${playId}`, {
    method: 'POST',  // Enviando a requisição como POST
  })
    .then(response => response.json())  // Aguarda a resposta como JSON
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
