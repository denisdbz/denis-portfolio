const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let letters = Array(256).join(1).split('');

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#0F0';
  letters.forEach((y_pos, index) => {
    const text = String.fromCharCode(3e4 + Math.random() * 33);
    const x_pos = index * 10;
    ctx.fillText(text, x_pos, y_pos);
    letters[index] = y_pos > 758 + Math.random() * 1e4 ? 0 : y_pos + 10;
  });
}
setInterval(drawMatrix, 33);
