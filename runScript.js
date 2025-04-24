const botao = document.querySelector("button");
const saida = document.getElementById("saida");
const erro = document.getElementById("erro");
const status = document.getElementById("status");
const barra = document.getElementById("progresso");

async function executarTeste(play) {
  saida.textContent = "";
  erro.textContent = "";
  status.textContent = "";
  barra.style.width = "0%";
  barra.parentElement.style.display = "block";

  botao.disabled = true;
  botao.style.opacity = 0.5;
  botao.innerText = "Executando...";

  const endpoint = `https://web-production-c891.up.railway.app/${play}`;

  try {
    const resposta = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const dados = await resposta.json();

    if (dados.stdout) {
      const linhas = dados.stdout.split("\\n");
      for (let i = 0; i < linhas.length; i++) {
        saida.textContent += linhas[i] + "\\n";
        barra.style.width = `${Math.min(100, (i + 1) * 100 / linhas.length)}%`;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    if (dados.stderr) erro.textContent = dados.stderr;
    if (dados.status) status.textContent = "Status: " + dados.status;

  } catch (err) {
    erro.textContent = "Erro: " + err;
  }

  botao.disabled = false;
  botao.style.opacity = 1;
  botao.innerText = "Executar Teste";
}
