/* simulate-run.js  */
async function executarTeste(playId) {
  // ─── 1. Descobrir URL do backend ──────────────────────────────────────────
  const BACKEND =
    window.BACKEND_URL                                  // var. de ambiente
    || (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)
        ? "http://127.0.0.1:5000"                       // dev local
        : "https://web-production-c891.up.railway.app"  // produção default
       );

  // ─── 2. Elementos de UI ──────────────────────────────────────────────────
  const btn  = document.querySelector("button");
  const bar  = document.getElementById("barra");
  const fill = document.getElementById("barra-fill");
  const logs = document.getElementById("logs");

  btn.disabled   = true;
  btn.textContent = "⏳ Iniciando…";
  bar.classList.remove("hidden");
  fill.style.width = "0%";
  logs.textContent = "";

  try {
    /* --- anima progress bar enquanto faz o fetch --- */
    let pct = 0;
    const simInterval = setInterval(() => {
      pct = Math.min(90, pct + 10);
      fill.style.width = pct + "%";
    }, 250);

    /* --- requisição ao backend --- */
    const resp = await fetch(`${BACKEND}/executar`, {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({ play: playId })
    });

    clearInterval(simInterval);
    fill.style.width = "100%";

    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

    const data = await resp.json();
    if (data.saida) logs.textContent = data.saida;
    else if (data.erro) logs.textContent = data.erro;
  } catch (e) {
    logs.textContent = e.message || "Erro desconhecido";
  } finally {
    btn.disabled   = false;
    btn.textContent = "▶️ Executar Teste";
  }
}
