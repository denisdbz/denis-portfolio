function executarTeste() {
  const logs = document.getElementById('logs') || document.getElementById('output-log') || document.getElementById('output-box');
  const barra = document.querySelector('.barra-preenchida') || document.getElementById('progress-bar-fill') || document.getElementById('progress-fill');
  logs.textContent = '';
  barra.style.width = '0%';

  const source = new EventSource('/stream/play-01');
  source.onmessage = function(event) {
    logs.textContent += event.data + '\n';
    logs.scrollTop = logs.scrollHeight;
    barra.style.width = Math.min(100, logs.textContent.length / 5) + '%';
  };
  source.onerror = function() {
    source.close();
  };
}
