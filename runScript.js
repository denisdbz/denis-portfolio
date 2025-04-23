async function executarTeste(playId) {
  const resultado = document.getElementById('resultado');
  resultado.style.display = 'block';
  resultado.innerHTML = '⏳ Executando o teste...';

  try {
    const resposta = await fetch(`https://web-production-4124.up.railway.app/api/exec/${playId}`, {
      method: 'POST',
    });

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`);
    }

    const dados = await resposta.json();
    resultado.innerHTML = `<pre>${dados.resultado}</pre>`;
  } catch (erro) {
    resultado.innerHTML = `<span style="color: red;">⚠️ Erro na requisição: ${erro.message}</span>`;
  }
}
