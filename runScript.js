async function executarTeste() {
  const resultadoDiv = document.getElementById("resultado");
  if (resultadoDiv) {
    resultadoDiv.style.display = "block";
    resultadoDiv.innerHTML = "<pre><code>Executando teste...</code></pre>";
  }

  const playPath = window.location.pathname.split("/")[2];
  const endpoint = `https://web-production-c891.up.railway.app/${playPath}`;

  try {
    const response = await fetch(endpoint, { method: "POST" });
    const data = await response.text();
    resultadoDiv.innerHTML = `<pre><code>${data}</code></pre>`;
  } catch (error) {
    resultadoDiv.innerHTML = `<pre><code>Erro:\n${error}</code></pre>`;
  }
}
