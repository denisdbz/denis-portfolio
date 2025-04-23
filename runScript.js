const API_URL = 'https://web-production-c891.up.railway.app'; // URL centralizada

function executarTeste(play) {
  const resultadoBox = document.getElementById("resultado");
  resultadoBox.style.display = "block";
  resultadoBox.innerHTML = `
    <div class="progress neon-bar">
      <div class="progress-bar" id="barra"></div>
    </div>
    <p><em>Executando teste...</em></p>
  `;

  const barra = document.getElementById("barra");
  let progresso = 0;
  const intervalo = setInterval(() => {
    progresso += 1;
    barra.style.width = `${progresso}%`;
    if (progresso >= 100) clearInterval(intervalo);
  }, 50);

  fetch(`${API_URL}/${play}`, {
    method: 'POST'
  })
    .then(resposta => resposta.json())
    .then(dados => {
      clearInterval(intervalo);
      if (dados.stdout || dados.stderr) {
        resultadoBox.innerHTML = `
          <pre><strong>Saída:</strong>\n${dados.stdout}</pre>
          <pre><strong>Erros:</strong>\n${dados.stderr}</pre>
          <pre><strong>Status:</strong> ${dados.code}</pre>
        `;
      } else {
        resultadoBox.innerHTML = `<pre>${JSON.stringify(dados, null, 2)}</pre>`;
      }
    })
    .catch(erro => {
      clearInterval(intervalo);
      resultadoBox.innerHTML = `<p style="color:red;"><strong>Erro:</strong> ${erro}</p>`;
    });
}
