async function executarTeste() {
  const resultadoBox = document.getElementById("resultado");
  resultadoBox.style.display = "block";
  resultadoBox.innerHTML = "<em>Executando teste...</em>";

  const partes = window.location.pathname.split("/");
  const play = partes[partes.length - 2];

  try {
    const resposta = await fetch(`https://web-production-c891.up.railway.app/${play}`, {
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
  } catch (erro) {
    resultadoBox.innerHTML = `<strong>Erro:</strong> ${erro}`;
  }
}
