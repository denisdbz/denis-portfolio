async function executarTeste(play) {
    const barra = document.getElementById('barra');
    const barraFill = document.getElementById('barra-fill');
    const logs = document.getElementById('logs');
    const btnExecutar = document.querySelector('button[onclick^="executarTeste"]');

    // Mostrar barra e spinner
    barra.classList.remove('hidden');
    barraFill.style.width = '100%';  
    logs.innerHTML = '<div class="spinner">⏳ Executando...</div>';

    btnExecutar.disabled = true;

    try {
        const resposta = await fetch('/executar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ play })
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            logs.innerHTML = `<span class="log-erro">Erro: ${erro.erro || 'Falha inesperada.'}</span>`;
            return;
        }

        logs.innerHTML = '';  // limpa spinner
        const leitor = resposta.body.getReader();
        const decodificador = new TextDecoder();
        let recebido = '';

        while (true) {
            const { done, value } = await leitor.read();
            if (done) break;

            recebido += decodificador.decode(value, { stream: true });
            const linhas = recebido.split('\n');
            recebido = linhas.pop() || '';  // última linha pode estar incompleta

            linhas.forEach(linha => {
                if (linha.trim()) {
                    const formatada = formatarLinha(linha.trim());
                    logs.innerHTML += formatada + '<br>';
                    logs.scrollTop = logs.scrollHeight;
                }
            });
        }

    } catch {
        logs.innerHTML = '<span class="log-erro">Erro na comunicação com o servidor.</span>';
    } finally {
        btnExecutar.disabled = false;
        barra.classList.add('hidden');
    }
}

function formatarLinha(linha) {
    if (linha.includes('[INFO]')) {
        return `<span class="log-info">${linha}</span>`;
    } else if (linha.includes('[WARN]')) {
        return `<span style="color: #ffff00;">${linha}</span>`;
    } else if (linha.includes('[ERROR]') || linha.includes('[ERRO]')) {
        return `<span class="log-erro">${linha}</span>`;
    }
    return linha;
}
