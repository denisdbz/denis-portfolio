async function executarTeste(play) {
  const resultadoBox = document.getElementById('resultado');
  resultadoBox.style.display = 'block';
  resultadoBox.innerHTML = "<em>Executando teste...</em>";

  try {
    const resposta = await fetch(`https://web-production-4124.up.railway.app/${play}`, {
      method: 'POST'
    });
    const dados = await resposta.json();

    if (dados.stdout || dados.stderr) {
      resultadoBox.innerHTML = `
        <strong>Saída:</strong><pre>${dados.stdout}</pre>
        <strong>Erros:</strong><pre>${dados.stderr}</pre>
        <strong>Status:</strong> ${dados.code}
      `;
    } else {
      resultadoBox.innerHTML = `<pre>${JSON.stringify(dados, null, 2)}</pre>`;
    }

    const img = document.getElementById('evidencia');
    if (img) img.style.display = 'block';
  } catch (error) {
    resultadoBox.innerHTML = `<strong>Erro:</strong> ${error}`;
  }
}
