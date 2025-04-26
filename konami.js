/* konami.js – Easter-egg com opt-in por palavra-chave */
(() => {
  /* ================== CONFIGURAÇÃO ================== */
  const secretKey = 'vagabunda';                  // senha
  const audioSrc  = 'assets/easter/palpite.mp3'; // trilha
  const fotos = [                                // fotos na ordem
    'assets/easter/foto1.jpg',
    'assets/easter/foto2.jpg',
    'assets/easter/foto3.jpg',
    'assets/easter/foto4.jpg'
  ];

  /* ==================== KONAMI ====================== */
  const pattern = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A
  let buffer = [];

  window.addEventListener('keydown', ev => {
    /* tecla Esc fecha o painel se estiver aberto */
    if (ev.key === 'Escape') ocultarEasterEgg();

    buffer.push(ev.keyCode);
    if (buffer.length > pattern.length) buffer.shift();

    if (pattern.every((v, i) => v === buffer[i])) {
      buffer = [];
      solicitarSenha();
    }
  });

  /* ==================== MODAL ======================= */
  function solicitarSenha () {
    const modal  = document.getElementById('easter-modal');
    const btn    = document.getElementById('easter-submit');
    const input  = document.getElementById('easter-key');
    const erro   = document.getElementById('easter-erro');

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

  /* ==================== EASTER ====================== */
  let painelCriado = false;   // cria só na 1ª vez
  let audio;

  function ativarEasterEgg () {
    const galeria = document.getElementById('easter-gallery');

    if (!painelCriado) {
      galeria.className =
        'fixed inset-0 z-50 flex items-center justify-center bg-black/75';
      galeria.style.cursor = 'pointer';

      /* grade responsiva */
      const grid = document.createElement('div');
      grid.style.display = 'grid';
      grid.style.gap      = '1rem';
      grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px,1fr))';

      fotos.forEach(src => {
        const img = new Image();
        img.src = src;
        img.className = 'rounded-lg border border-[#0f0] max-h-[70vh] object-cover';
        grid.appendChild(img);
      });

      galeria.appendChild(grid);
      painelCriado = true;
    }

    galeria.classList.remove('hidden');

    /* música              */
    audio = new Audio(audioSrc);
    audio.volume = 0.7;
    audio.play();

    /* fechar no clique ou Esc */
    galeria.onclick = ocultarEasterEgg;
  }

  function ocultarEasterEgg () {
    const galeria = document.getElementById('easter-gallery');
    if (!galeria.classList.contains('hidden')) {
      galeria.classList.add('hidden');
      if (audio) audio.pause();
    }
  }
})();
