/**
 * Executa o run.sh do Play escolhido.
 * Em GitHub Pages a API não existe, então mostramos aviso
 * e evitamos o erro 405.
 */
function executarTeste(playId) {
  const host = window.location.hostname;
  const isPages = host.endsWith("github.io");

  if (isPages) {
    document.getElementById("resultado").innerHTML =
      '<p style="color:#f33">⚠️ Execute localmente (python app.py) ou na Railway para rodar o teste.</p>';
    return;
  }

  fetch(`/api/exec/${playId}`, { method: "POST" })
    .then((r) => r.json())
    .then((d) => {
      const out = document.getElementById("resultado");
      if (d.stdout) out.innerHTML = `<pre>${d.stdout}</pre>`;
      else if (d.mensagem) out.textContent = d.mensagem;
      else out.innerHTML = `<p>Erro: ${d.erro || "desconhecido"}</p>`;
    })
    .catch((e) => {
      document.getElementById("resultado").innerHTML =
        `<p style="color:#f33">Erro de rede: ${e}</p>`;
    });
}
