/* runScript.js (execução com log + barra) */
const botao = document.querySelector("button");
const saida = document.getElementById("saida");
const erro = document.getElementById("erro");
const status = document.getElementById("status");
const barra = document.getElementById("barra");

async function executarTeste() {
  saida.innerHTML = "";
  erro.textContent = "";
  status.textContent = "Iniciando...";
  barra.style.width = "10%";
  barra.classList.remove("hidden");

  botao.disabled = true;
  botao.innerText = "Executando...";
  try {
    const resposta = await fetch("https://denis-backend.railway.app/nmap", {
      method: "POST"
    });
    const dados = await resposta.json();
    if (dados.stdout) {
      saida.innerHTML = `<pre>${dados.stdout}</pre>`;
      status.textContent = "Concluído";
      barra.style.width = "100%";
    }
  } catch (e) {
    erro.textContent = "Erro ao executar o teste.";
    status.textContent = "Erro";
  }
  botao.disabled = false;
  botao.innerText = "Executar Teste";
}
