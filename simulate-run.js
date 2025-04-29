// simulate-run.js

async function executarTeste(play) {
  const barra = document.getElementById('barra');
  const barraFill = document.getElementById('barra-fill');
  const logs = document.getElementById('logs');
  const btnExecutar = document.querySelector('button[onclick*="executarTeste"]');

  barra.classList.remove('hidden');
  barraFill.style.width = '0%';
  logs.innerHTML = '';

  // Adiciona spinner e desativa botão
  if (btnExecutar) {
    btnExecutar.disabled = true;
    btnExecutar.innerHTML = '⏳ Executando...';
  }

  try {
    const resposta = await fetch('https://web-production-c891.up.railway.app/executar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ play })
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      logs.innerHTML = `<span class="log-erro">Erro: ${erro.erro || 'Falha inesperada.'}</span>`;
      return;
    }

    const leitor = resposta.body.getReader();
    const decodificador = new TextDecoder();
    let recebido = '';

    while (true) {
      const { done, value } = await leitor.read();
      if (done) break;
      recebido += decodificador.decode(value);

      let saidaBruta = '';
      try {
        saidaBruta = JSON.parse(recebido).saida;
      } catch (err) {
        saidaBruta = recebido;
      }

      const linhas = saidaBruta
        .replace(/\\n/g, '\n')
        .replace(/\\u2014/g, '—')
        .split('\n')
        .map(linha => {
          if (linha.includes('[ERROR]')) {
            return `<div class="log-erro">${linha}</div>`;
          } else if (linha.includes('[INFO]')) {
            return `<div class="log-info">${linha}</div>`;
          } else {
            return `<div>${linha}</div>`;
          }
        })
        .join('');

      logs.innerHTML = linhas;

      // Atualiza barra
      let larguraAtual = Math.min(100, (recebido.length / 50)) + '%';
      barraFill.style.width = larguraAtual;
    }

    barraFill.style.width = '100%';

  } catch (error) {
    logs.innerHTML = `<span class="log-erro">Erro ao conectar: ${error.message}</span>`;
  } finally {
    // Reativa o botão após terminar
    if (btnExecutar) {
      btnExecutar.disabled = false;
      btnExecutar.innerHTML = '▶️ Executar Teste';
    }
  }
}
