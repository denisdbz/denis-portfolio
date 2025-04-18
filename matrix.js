window.onload = function() {
  var canvas = document.getElementById("matrix");
  var ctx = canvas.getContext("2d");

  // Ajustar tamanho do canvas para cobrir toda a tela
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var columns = canvas.width / 10;
  var rows = canvas.height / 10;

  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%".split("");
  var fontSize = 10;
  var chars = [];

  // Preencher a matriz com letras
  for (var i = 0; i < columns; i++) {
    chars[i] = 0;
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";  // Cor verde
    ctx.font = fontSize + "px monospace";

    for (var i = 0; i < chars.length; i++) {
      var text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, chars[i] * fontSize);

      if (chars[i] * fontSize > canvas.height && Math.random() > 0.975) {
        chars[i] = 0;
      }
      
      chars[i]++;
    }
  }

  setInterval(drawMatrix, 33);
}
