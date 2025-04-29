// simulate-run.js

async function executarTeste(play) {
  const barra = document.getElementById('barra');
  const barraFill = document.getElementById('barra-fill');
  const logs = document.getElementById('logs');

  barra.classList.remove('hidden');
  barraFill.style.width = '0%';
  logs.textContent = '';

  try {
    const resposta = await fetch('https://web-production-c891.up.railway.app/executar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ play })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      logs.textContent = JSON.parse(recebido).saida.replace(/\\n/g, '\n').replace(/\\u2014/g, '—');
      return;
    }

    const leitor = resposta.body.getReader();
    const decodificador = new TextDecoder();
    let recebido = '';

    while (true) {
      const { done, value } = await leitor.read();
      if (done) break;
      recebido += decodificador.decode(value);
      logs.textContent = recebido;

      // Atualiza a barra de progresso conforme tamanho recebido
      let larguraAtual = Math.min(100, (recebido.length / 50)) + '%';
      barraFill.style.width = larguraAtual;
    }

    barraFill.style.width = '100%';

  } catch (error) {
    logs.textContent = "Erro ao conectar: " + error.message;
  }
}
