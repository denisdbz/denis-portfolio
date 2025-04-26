const API_BASE_URL = 'https://web-production-4124.up.railway.app'; // URL pública da API

function executarTeste(playId) {
  // Caso especial para o Play 01 (Nmap Recon)
  if (playId === 'play-01-nmap-recon') {
    fetch('run.sh')
      .then(() => setTimeout(() => {
        document.getElementById('relatorioFrame').src = 'relatorio.html?' + new Date().getTime();
      }, 2000));
    return;
  }

  // Outros plays: comunicação com API Flask
  fetch(`${API_BASE_URL}/api/exec/${playId}`, {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      const resultado = document.getElementById('resultado');
      if (!resultado) return;
      if (data.mensagem) {
        resultado.innerHTML = `<p>${data.mensagem}</p>`;
      } else {
        resultado.innerHTML = `<p>Erro: ${data.erro}</p>`;
      }
    })
    .catch(error => {
      const resultado = document.getElementById('resultado');
      if (resultado) {
        resultado.innerHTML = `<p>Erro na execução: ${error}</p>`;
      }
    });
}
