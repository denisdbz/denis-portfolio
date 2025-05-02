/* konami.js – Easter-egg com senha e multimídia */
(() => {
  // ================== CONFIGURAÇÃO ==================
  const secretKey = '01092024';
  const audioSrc  = 'assets/easter/palpite.mp3';
  const videoSrc  = 'assets/easter/VID-20250502-WA0032.mp4'; // seu novo vídeo
  const fotos     = [
    'assets/easter/foto1.jpg',
    'assets/easter/foto2.jpg',
    'assets/easter/foto3.jpg',
    'assets/easter/foto4.jpg'
  ];

  // ==================== VARIÁVEIS ======================
  const pattern = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A
  let buffer = [];
  let iniciado = false;
  let audio;

  // ==================== KONAMI ======================
  function onKeyDown(ev) {
    if (ev.key === 'Escape') {
      fecharTudo();
    }

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    // só chama solicitarSenha se bater a sequência
    if (pattern.every((v,i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  }

  // ==================== MODAL DE SENHA =======================
  function solicitarSenha() {
    const modal = document.getElementById('easter-modal');
    const btn   = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro  = document.getElementById('easter-erro');

    // Reset visual
    erro.classList.add('hidden');
    input.value = '';
    modal.classList.remove('hidden');
    input.focus();

    // Remove listener anterior (se houver) e adiciona o atual
    btn.replaceWith(btn.cloneNode(true));
    const novoBtn = document.getElementById('easter-submit');
    novoBtn.addEventListener('click', () => {
      if (input.value.trim() === secretKey) {
        modal.classList.add('hidden');
        abrirEasterEgg();
      } else {
        erro.classList.remove('hidden');
      }
    });
  }

  // ==================== EASTER EGG ======================
  function abrirEasterEgg() {
    const galeria = document.getElementById('easter-gallery');

    if (!iniciado) {
      galeria.innerHTML = ''; // limpa

      // Vídeo no topo
      const video = document.createElement('video');
      video.id = 'easter-video';
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.style.maxWidth = '90%';
      video.style.marginBottom = '1rem';
      galeria.appendChild(video);

      // Grid de fotos
      const grid = document.createElement('div');
      grid.className = 'easter-images';
      fotos.forEach(src => {
        const img = new Image();
        img.src = src;
        grid.appendChild(img);
      });
      galeria.appendChild(grid);

      iniciado = true;
    }

    // Toca áudio em loop
    audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play();

    galeria.classList.remove('hidden');
  }

  // ==================== FECHAR ======================
  function fecharTudo() {
    const modal   = document.getElementById('easter-modal');
    const galeria = document.getElementById('easter-gallery');

    if (modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
    if (galeria && !galeria.classList.contains('hidden')) {
      galeria.classList.add('hidden');
    }
    if (audio) {
      audio.pause();
      audio = null;
    }
  }

  // ==================== INIT ======================
  document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('keydown', onKeyDown);

    // também fecha clicando no botão "×" padrão dos modais
    document.querySelectorAll('#easter-modal .close-modal').forEach(btn => {
      btn.addEventListener('click', fecharTudo);
    });
    // e fecha clicando fora do conteúdo, na área transparente
    document.getElementById('easter-gallery').addEventListener('click', fecharTudo);
  });

})();
