document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("runBtn").addEventListener("click", async () => {
    const play = document.body.getAttribute("data-play");
    const responseDiv = document.getElementById("response");
    responseDiv.textContent = "Executando teste...";

    try {
      const res = await fetch(`https://web-production-4124.up.railway.app/${play}`);
      const data = await res.text();
      responseDiv.innerHTML = `<pre>${data}</pre>`;
    } catch (err) {
      responseDiv.innerHTML = `<span style="color:red;">Erro ao executar o teste.<br>${err}</span>`;
    }
  });
});
