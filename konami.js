/* konami.js – Easter-egg com senha e multimídia */
(() => {
  // ================== CONFIGURAÇÃO ==================
  const secretKey = '01092024';
  const audioSrc  = 'assets/easter/palpite.mp3';
  const videoSrc  = 'assets/easter/2025-05-02.mp4';
  const fotos     = [
    'assets/easter/foto1.jpg',
    'assets/easter/foto2.jpg',
    'assets/easter/foto3.jpg',
    'assets/easter/foto4.jpg'
  ];

  // ==================== KONAMI ======================
  const pattern = [38,38,40,40,37,39,37,39,66,65];
  let buffer = [];

  window.addEventListener('keydown', ev => {
    if (ev.key === 'Escape') {
      ocultarEasterEgg();
    }

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    // só ao completar a sequência
    if (pattern.every((v,i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  });

  // ==================== MODAL DE SENHA =======================
  function solicitarSenha() {
    const modal = document.getElementById('easter-modal');
    const btn   = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro  = document.getElementById('easter-erro');

    modal.classList.remove('hidden');
    erro.classList.add('hidden');
    input.value = '';
    input.focus();

    // garante que este handler só exista aqui
    btn.onclick = () => {
      if (input.value.trim() === secretKey) {
        modal.classList.add('hidden');
        ativarEasterEgg();
      } else {
        erro.classList.remove('hidden');
      }
    };
  }
  window.solicitarSenha = solicitarSenha;

  // ==================== EASTER EGG ======================
  let iniciado = false;
  let audio;

  function ativarEasterEgg() {
    const galeria = document.getElementById('easter-gallery');

    if (!iniciado) {
      galeria.innerHTML = ''; // limpa

      // vídeo
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.style.maxWidth = '90%';
      video.style.marginBottom = '1rem';
      galeria.appendChild(video);

      // grid de fotos
      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gap = '1rem';
      grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px,1fr))';
      fotos.forEach(src => {
        const img = new Image();
        img.src = src;
        img.style.width = '100%';
        img.style.border = '2px solid var(--neon-color)';
        img.style.borderRadius = '4px';
        grid.appendChild(img);
      });
      galeria.appendChild(grid);

      iniciado = true;
    }

    galeria.classList.remove('hidden');

    // áudio de fundo
    audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play();

    galeria.onclick = ocultarEasterEgg;
  }

  // ==================== FECHAR ======================
  function ocultarEasterEgg() {
    const modal   = document.getElementById('easter-modal');
    const galeria = document.getElementById('easter-gallery');

    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
    if (!galeria.classList.contains('hidden')) {
      galeria.classList.add('hidden');
    }
    if (audio) {
      audio.pause();
      audio = null;
    }
  }

})();
