function executarTeste(playId) {
  fetch(`https://web-production-4124.up.railway.app/api/exec/${playId}`, {
    method: 'POST',
  })
    .then(response => response.json())
    .then(data => {
      const resultado = document.getElementById('resultado');
      if (data.stdout || data.stderr) {
        resultado.innerHTML = `
          <div style="background:#111;padding:10px;border-radius:6px;color:#0f0;">
            <strong>Saída:</strong><pre>${data.stdout}</pre>
            ${data.stderr ? `<strong>Erros:</strong><pre>${data.stderr}</pre>` : ''}
            <strong>Status:</strong> ${data.code}
          </div>`;
      } else {
        resultado.innerHTML = `<p style="color:red;">Erro: ${data.erro || "Falha desconhecida."}</p>`;
      }
    })
    .catch(error => {
      document.getElementById('resultado').innerHTML = `<p style="color:red;">Erro: ${error}</p>`;
    });
}
