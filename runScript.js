document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("executarTeste");
  const resultadoDiv = document.getElementById("resultado");

  if (btn && resultadoDiv) {
    btn.addEventListener("click", async () => {
      resultadoDiv.style.display = "block";
      resultadoDiv.innerText = "Executando...";

      try {
        const resposta = await fetch("https://web-production-4124.up.railway.app/api/run", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ play: document.title }),
        });

        const dados = await resposta.json();
        resultadoDiv.innerText = dados.saida || "Sem retorno.";
      } catch (erro) {
        resultadoDiv.innerText = "Erro ao executar o teste.";
        console.error(erro);
      }
    });
  }
});
