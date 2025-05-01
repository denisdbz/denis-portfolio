async function executarTeste(play) {
    const endpoint = `https://web-production-4124.up.railway.app/${play}`;
    
    const botao = document.querySelector("button");
    const saida = document.getElementById("saida");
    const erro = document.getElementById("erro");
    const status = document.getElementById("status");

    // Resetando campos
    saida.textContent = "";
    erro.textContent = "";
    status.textContent = "";

    // Estilizando o botão durante execução
    botao.disabled = true;
    botao.style.opacity = 0.5;
    botao.innerText = "Executando...";

    try {
        const resposta = await fetch(endpoint, { method: "POST" });
        const dados = await resposta.json();

        if (dados.stdout) saida.textContent = dados.stdout;
        if (dados.stderr) erro.textContent = dados.stderr;
        if (dados.code !== undefined) status.textContent = dados.code;

    } catch (e) {
        erro.textContent = e.message;
    } finally {
        botao.disabled = false;
        botao.style.opacity = 1;
        botao.innerText = "Executar Teste";
    }
}
