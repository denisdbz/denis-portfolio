/* runScript.js
   Envia POST para o backend (Flask no Railway) e mostra a saída no <div id="resultado">
*/
const BACKEND = "https://web-production-4124.up.railway.app";   // ajuste se mudar o domínio

function executarTeste(playId) {
  fetch(`${BACKEND}/api/exec/${playId}`, { method: "POST" })
    .then(resp => resp.json())
    .then(data => {
      const out = document.getElementById("resultado");
      if (data.stdout)        out.textContent = data.stdout;       // saída normal
      else if (data.mensagem) out.textContent = data.mensagem;     // mensagem customizada
      else                    out.textContent = `Erro: ${data.erro || "Falha ao executar"}`;
    })
    .catch(err => {
      document.getElementById("resultado").textContent = `Erro de rede: ${err}`;
    });
}
