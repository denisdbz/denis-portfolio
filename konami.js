/* konami.js – Easter-egg com opt-in por palavra-chave */
(() => {
  // ================== CONFIGURAÇÃO ==================
  const secretKey = '01092024';                  // senha atualizada
  const audioSrc  = 'assets/easter/palpite.mp3'; // trilha sonora
  const videoSrc  = 'assets/easter/VID-20250502-WA0032.mp4'; // vídeo do Easter Egg
  const fotos     = [                             // galeria de fotos
    'assets/easter/foto1.jpg',
    'assets/easter/foto2.jpg',
    'assets/easter/foto3.jpg',
    'assets/easter/foto4.jpg'
  ];

  // ==================== KONAMI ======================
  const pattern = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A
  let buffer = [];

  window.addEventListener('keydown', ev => {
    // Esc fecha o painel
    if (ev.key === 'Escape') ocultarEasterEgg();

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    if (pattern.every((v, i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  });

  // ==================== MODAL =======================
  function solicitarSenha() {
    const modal = document.getElementById('easter-modal');
    const btn   = document.getElementById('easter-submit');
    const input = document.getElementById('easter-key');
    const erro  = document.getElementById('easter-erro');

    modal.classList.remove('hidden');
    erro.classList.add('hidden');
    input.value = '';
    input.focus();

    btn.onclick = () => {
      if (input.value.trim() === secretKey) {
        modal.classList.add('hidden');
        ativarEasterEgg();
      } else {
        erro.textContent = 'Senha incorreta 😅';
        erro.classList.remove('hidden');
      }
    };
  }

  // torna disponível globalmente para botões mobile, etc.
  window.solicitarSenha = solicitarSenha;

  // ==================== EASTER ======================
  let painelCriado = false;
  let audio;

  function ativarEasterEgg() {
    const galeria = document.getElementById('easter-gallery');

    // monta só na primeira vez
    if (!painelCriado) {
      galeria.className =
        'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/75 p-4 overflow-auto';
      galeria.style.cursor = 'pointer';

      // 1) Vídeo em destaque
      const video = document.createElement('video');
      video.src = videoSrc;
      video.controls = true;
      video.autoplay = true;
      video.loop = true;
      video.muted = false;
      video.style.maxWidth = '90%';
      video.style.marginBottom = '1.5rem';
      galeria.appendChild(video);

      // 2) Grid de fotos
      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gap = '1rem';
      grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px,1fr))';
      grid.style.width = '100%';
      grid.style.maxWidth = '800px';

      fotos.forEach(src => {
        const img = new Image();
        img.src = src;
        img.className = 'rounded-lg border-2 border-[var(--neon-color)] object-cover';
        img.style.maxHeight = '60vh';
        grid.appendChild(img);
      });

      galeria.appendChild(grid);
      painelCriado = true;
    }

    galeria.classList.remove('hidden');

    // trilha sonora
    audio = new Audio(audioSrc);
    audio.volume = 0.6;
    audio.play();

    // clique ou Esc fecha
    galeria.onclick = ocultarEasterEgg;
  }

  function ocultarEasterEgg() {
    const galeria = document.getElementById('easter-gallery');
    if (!galeria.classList.contains('hidden')) {
      galeria.classList.add('hidden');
      if (audio) audio.pause();
    }
  }
})();