/* konami.js – Easter-egg com senha e multimídia */
(() => {
  // ================== CONFIGURAÇÃO ==================
  const secretKey = '01092024';                   // senha para liberar o Easter Egg
  const audioSrc  = 'assets/easter/Palpite(MP3_160K).mp3';
  const videoSrc  = 'assets/easter/VID-20250502-WA0032.mp4';
  const fotos     = [                             // suas fotos em ordem
    'assets/easter/foto1.jpg',
    'assets/easter/foto2.jpg',
    'assets/easter/foto3.jpg',
    'assets/easter/foto4.jpg'
  ];

  // ==================== KONAMI ======================
  const pattern = [38,38,40,40,37,39,37,39,66,65]; // ↑↑↓↓←→←→BA
  let buffer = [];

  window.addEventListener('keydown', ev => {
    // Esc fecha tudo
    if (ev.key === 'Escape') ocultarEasterEgg();

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    // só dispara ao completar a sequência
    if (pattern.every((v,i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  });

  // ==================== PEDIR SENHA =======================
  function solicitarSenha() {
    const modal = document.getElementById('easter-modal');
    const btn   = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro  = document.getElementById('easter-erro');

    // mostra o modal de senha
    modal.classList.remove('hidden');
    erro.classList.add('hidden');
    input.value = '';
    input.focus();

    // ao clicar OK
    btn.onclick = () => {
      if (input.value.trim() === secretKey) {
        modal.classList.add('hidden');
        ativarEasterEgg();
      } else {
        erro.classList.remove('hidden');
      }
    };
  }
  window.solicitarSenha = solicitarSenha;  // expõe se precisar chamar por botão

  // ==================== EASTER EGG ======================
  let iniciado = false;
  let audio;

  function ativarEasterEgg() {
    const galeria = document.getElementById('easter-gallery');

    // popula só na primeira vez
    if (!iniciado) {
      // limpa
      galeria.innerHTML = '';

      // 1) insere o vídeo
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.muted = false;
      video.style.maxWidth = '90%';
      video.style.marginBottom = '1.5rem';
      galeria.appendChild(video);

      // 2) cria grid de imagens
      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gap = '1rem';
      grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px,1fr))';
      grid.style.width = '100%';
      grid.style.maxWidth = '800px';

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

    // exibe a galeria/modal
    galeria.classList.remove('hidden');

    // toca o áudio de fundo
    audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play();

    // clique fecha
    galeria.onclick = ocultarEasterEgg;
  }

  // ==================== FECHAR ======================
  function ocultarEasterEgg() {
    const modal   = document.getElementById('easter-modal');
    const galeria = document.getElementById('easter-gallery');

    // esconde senha (se visível)
    if (!modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
    // esconde galeria
    if (!galeria.classList.contains('hidden')) {
      galeria.classList.add('hidden');
    }
    // pausa audio
    if (audio) {
      audio.pause();
      audio = null;
    }
  }

})();
