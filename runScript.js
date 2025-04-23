document.addEventListener('DOMContentLoaded', () => {
  const executarBtn = document.getElementById('executar-teste');
  const resultadoBox = document.getElementById('resultado');
  const barraProgresso = document.getElementById('barra-progresso');

  executarBtn.addEventListener('click', async () => {
    resultadoBox.style.display = 'block';
    resultadoBox.innerHTML = `<em>Executando teste...</em>`;
    barraProgresso.style.width = '100%';

    const urlParts = window.location.pathname.split('/');
    const playFolder = urlParts.find(part => part.startsWith('play-'));
    const play = playFolder?.replace('/index.html', '');

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
      resultadoBox.innerHTML = `<span style="color: red;"><strong>Erro:</strong> ${erro}</span>`;
    } finally {
      barraProgresso.style.width = '0%';
    }
  });
});
