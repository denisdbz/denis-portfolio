window.onload = function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    let cols = canvas.width / 20;
    let ypos = Array(cols).fill(0);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0F0';
        ctx.font = '20px monospace';
        
        for (let i = 0; i < ypos.length; i++) {
            let text = String.fromCharCode(Math.random() * 128);
            ctx.fillText(text, i * 20, ypos[i] * 20);
            if (ypos[i] * 20 > canvas.height && Math.random() > 0.975) {
                ypos[i] = 0;
            }
            ypos[i]++;
        }
    }

    setInterval(draw, 50);
};
