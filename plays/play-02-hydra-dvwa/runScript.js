async function executarTeste() {
  const target = document.getElementById('target').value;
  if (!target) return alert("Digite o IP da DVWA.");
  document.getElementById("progress-container").classList.remove("hidden");
  document.getElementById("output-box").textContent = "Iniciando execução...\n";

  const res = await fetch("https://denis-play-backend.fly.dev/run/play-02-hydra-dvwa?target=" + encodeURIComponent(target));
  const data = await res.text();
  document.getElementById("progress-fill").style.width = "100%";
  document.getElementById("output-box").textContent += data;
}
