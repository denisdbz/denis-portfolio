async function executarTeste(play) {
    const barra = document.getElementById('barra');
    const barraFill = document.getElementById('barra-fill');
    const logs = document.getElementById('logs');
    const btnExecutar = document.querySelector('button[onclick^="executarTeste"]');

    barra.classList.remove('hidden');
    barraFill.style.width = '0%';
    logs.innerHTML = '';

    if (btnExecutar) {
        btnExecutar.disabled = true;
        btnExecutar.innerHTML = '⏳ Executando...';
    }

    const inicio = Date.now(); // Marca o início

    try {
        const resposta = await fetch('https://web-production-c891.up.railway.app/executar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ play })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            logs.innerHTML = `<span style="color: red;">Erro: ${erro.erro || 'Falha inesperada.'}</span>`;
            return;
        }

        const leitor = resposta.body.getReader();
        const decodificador = new TextDecoder();
        let recebido = '';

        while (true) {
            const { done, value } = await leitor.read();
            if (done) break;

            recebido += decodificador.decode(value, { stream: true });
            const linhas = recebido.split('\n');

            linhas.forEach(linha => {
                if (linha.trim() !== '') {
                    const formatada = formatarLinha(linha.trim());
                    logs.innerHTML += formatada + '<br>';
                    logs.scrollTop = logs.scrollHeight;
                }
            });

            barraFill.style.width = Math.min(100, barraFill.offsetWidth + 5) + '%';
        }

    } catch (erro) {
        logs.innerHTML = `<span style="color: red;">Erro na comunicação com o servidor.</span>`;
    } finally {
        const fim = Date.now(); // Marca o fim
        const tempoTotal = ((fim - inicio) / 1000).toFixed(2);
        logs.innerHTML += `<br><span style="color: #00ffff;">✅ Teste concluído em ${tempoTotal} segundos.</span>`;
        
        if (btnExecutar) {
            btnExecutar.disabled = false;
            btnExecutar.innerHTML = '▶️ Executar Teste';
        }
    }
}

function formatarLinha(linha) {
    if (linha.includes('[INFO]')) {
        return `<span style="color: #00ff00;">${linha}</span>`;
    } else if (linha.includes('[WARN]')) {
        return `<span style="color: #ffff00;">${linha}</span>`;
    } else if (linha.includes('[ERROR]') || linha.includes('[ERRO]')) {
        return `<span style="color: #ff0000;">${linha}</span>`;
    } else {
        return linha;
    }
}
