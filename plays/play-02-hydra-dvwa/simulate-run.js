let barra = document.getElementById("barra");
let status = document.getElementById("logs");
let resultado = document.getElementById("resultado");

function executarTeste() {
  barra.style.width = "0%";
  barra.style.display = "block";
  status.innerHTML = "Iniciando...";

  fetch('/nmap')
    .then(response => response.json())
    .then(data => {
      resultado.style.display = "block";
      resultado.innerHTML = `<pre>${data.stdout}</pre>`;
      status.innerHTML = "Teste concluído";
    });
  
  let progress = 0;
  let interval = setInterval(function() {
    if (progress < 100) {
      progress += 10;
      barra.style.width = progress + "%";
    } else {
      clearInterval(interval);
    }
  }, 1000);
}
